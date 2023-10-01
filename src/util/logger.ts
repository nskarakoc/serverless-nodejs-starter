/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
export class Logger {
  static debug(...args: any[]): void {
    console.debug(...args);
  }

  static error(...args: any[]): void {
    console.error(...args);
  }

  static info(...args: any[]): void {
    console.log(...args);
  }

  static log(...args: any[]): void {
    console.log(...args);
  }

  static warn(...args: any[]): void {
    console.warn(...args);
  }
}
