import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { ServerRouter } from "react-router";
import type { EntryContext } from "react-router";
import { createReadableStreamFromReadable } from "@react-router/node";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
) {
  return new Promise<Response>(
    (
      resolve,
      reject,
    ) => {
      const {
        pipe,
        abort,
      } =
        renderToPipeableStream(
          <ServerRouter
            context={
              routerContext
            }
            url={
              request.url
            }
          />,
          {
            bootstrapModules:
              [
                "/src/entry.client.tsx",
              ],
            onShellReady() {
              responseHeaders.set(
                "Content-Type",
                "text/html",
              );
              const body =
                new PassThrough();
              pipe(
                body,
              );
              resolve(
                new Response(
                  createReadableStreamFromReadable(
                    body,
                  ),
                  {
                    status:
                      responseStatusCode,
                    headers:
                      responseHeaders,
                  },
                ),
              );
            },
            onShellError(
              err: unknown,
            ) {
              reject(
                err,
              );
            },
          },
        );

      setTimeout(
        abort,
        15000,
      );
    },
  );
}

export { routes } from "./routes";
