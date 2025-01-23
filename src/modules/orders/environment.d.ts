declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ORDER_TABLE_NAME: string;
      RECEIVER_TABLE_NAME: string;
    }
  }
}

export {};
