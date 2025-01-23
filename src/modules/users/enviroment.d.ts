declare global {
  namespace NodeJS {
    interface ProcessEnv {
      COGNITO_USER_POOL_ID: string;
      COGNITO_CLIENT_ID: string;
    }
  }
}

export {};
