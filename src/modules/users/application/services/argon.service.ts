import argon from 'argon2';
import { IHasheable } from '../interfaces/iHash.interface';

export class ArgonHashService implements IHasheable {
  async hash(text: string): Promise<string> {
    return await argon.hash(text);
  }

  async compare(compareText: string, hashedText: string): Promise<boolean> {
    return await argon.verify(hashedText, compareText);
  }
}
