import {
  CognitoIdentityProviderClient,
  GetUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";

export const validateAuthToken = async (authHeader: string) => {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Authorization header is missing or invalid");
  }

  const token = authHeader.split(" ")[1];

  // Opción 1: Validar usando claims directamente
  const [header, payload, signature] = token.split(".");
  if (!header || !payload || !signature) {
    throw new Error("Invalid token format");
  }

  const decodedPayload = JSON.parse(
    Buffer.from(payload, "base64").toString("utf-8")
  );

  // Verifica si el token está expirado
  const currentTime = Math.floor(Date.now() / 1000);
  if (decodedPayload.exp < currentTime) {
    throw new Error("Token has expired");
  }

  // Opción 2: (Recomendado) Usar el SDK para obtener datos del usuario
  const client = new CognitoIdentityProviderClient({});
  const command = new GetUserCommand({ AccessToken: token });
  try {
    const response = await client.send(command);
    return response; // Devuelve los detalles del usuario si es válido
  } catch (error) {
    throw new Error("Token is invalid");
  }
};
