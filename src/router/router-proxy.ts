import { HttpStatus, RequestMethod, RouterProxyCallback } from "../define";
import { exceptionHandle } from "../exception/exceptions-handler";
import { isFunction, isNil, isObject } from "../utils";

export function createProxy(targetCallback: RouterProxyCallback) {
  return (req, res, next) => {
    try {
      Promise.resolve(executionHandle(targetCallback(req, res, next))).catch(
        (error: Error) => {
          exceptionHandle(error, res);
        }
      );
    } catch (error) {
      exceptionHandle(error, res);
    }
  };
}

function executionHandle(callback) {
  return async (req, res, next) => {
    await apply(req, res, 200);
  };
}

async function apply(resultOrDeffered, response, httpStatusCode: number) {
  const result = await transformToResult(resultOrDeffered);
  const res = response.status(httpStatusCode);
  if (isNil(result)) {
    return res.send();
  }
  return isObject(result) ? res.json(result) : res.send(String(result));
}

async function transformToResult(resultOrDeffered) {
  if (resultOrDeffered instanceof Promise) {
    return await resultOrDeffered;
  }
  return resultOrDeffered;
}

function getStatusByMethod(requestMethod: RequestMethod): number {
  switch (requestMethod) {
    case RequestMethod.POST:
      return HttpStatus.CREATED;
    default:
      return HttpStatus.OK;
  }
}
