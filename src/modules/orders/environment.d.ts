declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ORDER_TABLE_NAME: string;
      RECEIVER_TABLE_NAME: string;
      PACKAGE_TABLE_NAME: string;
      ORDER_HISTORY_TABLE_NAME: string;
    }
  }
}

export {};
