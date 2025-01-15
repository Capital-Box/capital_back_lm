export const checkUserRole = (userData: any, allowedRoles: string[]): void => {
  // Buscar el atributo de roles
  const userRoles = userData.UserAttributes.find(
    (attr: any) => attr.Name === "custom:role"
  )?.Value;

  if (!userRoles) {
    throw new Error("Unauthorized: User role not found.");
  }

  const userRolesArray = userRoles.split(",");

  const hasPermission = userRolesArray.some((role: string) =>
    allowedRoles.includes(role)
  );

  if (!hasPermission) {
    throw new Error("Unauthorized: Insufficient permissions.");
  }
};
