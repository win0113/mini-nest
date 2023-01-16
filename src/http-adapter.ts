import * as http from "http";
import * as express from "express";

interface AbstractHttpAdapter {
  listen(port: number): void;
}

export const httpAdapter = express();

export type HttpAdapter = typeof httpAdapter;
