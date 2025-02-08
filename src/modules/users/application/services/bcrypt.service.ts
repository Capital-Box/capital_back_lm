import bcrypt from 'bcrypt';
import { IHasheable } from '../interfaces/iHash.interface';

export class BcryptHashService implements IHasheable {
    private readonly saltRounds: number;
    constructor(saltRounds: number = 10) {
        this.saltRounds = saltRounds;
    }

    async hash(text: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.saltRounds);
        return await bcrypt.hash(text, salt);
      }
  async compare(compareText: string, hashedText: string): Promise<boolean> {
    return await bcrypt.compare(compareText, hashedText);
  }
}