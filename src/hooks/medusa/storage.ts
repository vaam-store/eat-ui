import * as localforage from 'localforage';

export class ForageStorage {
    private readonly storage = localforage.createInstance({
        version: 1,
        name: 'medusa',
    });

    public async getItem(key: string): Promise<string | null> {
        return await this.storage.getItem(key);
    }

    public async removeItem(key: string): Promise<void> {
        await this.storage.removeItem(key);
    }

    public async setItem(key: string, value: string): Promise<void> {
        await this.storage.setItem(key, value);
    }
}
