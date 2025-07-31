declare global {
  interface DbDoc {
    _id: string;
    _rev?: string;
    [key: string]: unknown;
  }

  interface DbResult {
    id: string;
    rev?: string;
    ok?: boolean;
    error?: boolean;
    name?: string;
    message?: string;
  }

  interface Window {
    utools: {
      dbStorage: {
        setItem(key: string, value: any): void;
        getItem(key: string): any;
        removeItem(key: string): void;
      };
      dbCryptoStorage: {
        setItem(key: string, value: any): void;
        getItem(key: string): any;
        removeItem(key: string): void;
      };
      db: {
        put(doc: DbDoc): DbResult;
        get(id: string): DbDoc | null;
        remove(doc: DbDoc): DbResult;
        remove(id: string): DbResult;
        allDocs(idStartsWith?: string): DbDoc[];
        bulkDocs(docs: DbDoc[]): DbResult[];
        replicateStateFromCloud(): null | 0 | 1;
        promises: {
          put(doc: DbDoc): Promise<DbResult>;
          get(id: string): Promise<DbDoc | null>;
          remove(doc: DbDoc): Promise<DbResult>;
          remove(id: string): Promise<DbResult>;
          allDocs(idStartsWith?: string): Promise<DbDoc[]>;
          bulkDocs(docs: DbDoc[]): Promise<DbResult[]>;
          replicateStateFromCloud(): Promise<null | 0 | 1>;
        };
      };
      getPath(name: string): string;
      getNativeId(): string;
      onPluginEnter(callback: (action: any) => void): void;
      onPluginOut(callback: () => void): void;
      hideMainWindow(): void;
      showNotification(message: string): void;
      setFeature(feature: any): void;
      removeFeature(code: string): void;
      shellOpenExternal(url: string): void;
    };
    preload: {
      readSettings(): Promise<string | null>;
      writeSettings(content: string): Promise<boolean>;
      backupSettings(profileId: string): Promise<boolean>;
      getSettingsPath(): string;
    };
  }
}

export {};