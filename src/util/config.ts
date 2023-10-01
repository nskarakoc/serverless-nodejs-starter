import config from 'config';

export class Config {
  static getEnv(name: string): string {
    const value: string | undefined = process.env[name];

    if (value !== undefined) {
      return value;
    }

    if (config.has(name)) {
      return config.get(name);
    }

    throw new Error(`Expected environment or config variable is missing: ${name}`);
  }
}
