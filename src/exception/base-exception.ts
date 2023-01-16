export class BaseException extends Error {
  status: number;

  constructor(message?: string) {
    super(message);
  }
  
}
