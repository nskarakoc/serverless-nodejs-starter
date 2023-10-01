import { DataSource } from 'typeorm';
import { AppDataSource } from '../data-source';

export class TypeormUtil {
  static async getDataSource(): Promise<DataSource> {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    return AppDataSource;
  }

  static isForeignKeyError(error: Error): boolean {
    if (!error.message) {
      return false;
    }

    return error.message.toLowerCase().includes('a foreign key constraint fails');
  }
}
