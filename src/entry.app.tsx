import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { createReadableStreamFromReadable } from "@react-router/node";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router";
import { routes } from "./routes";

export default async function handler(
  req: Request,
): Promise<Response> {
  const url =
    new URL(
      req.url,
    );
  const {
    query,
    dataRoutes,
  } =
    createStaticHandler(
      routes,
    );

  const context =
    await query(
      new Request(
        url,
        {
          method:
            req.method,
        },
      ),
    );

  if (
    context instanceof
    Response
  ) {
    return context;
  }

  const router =
    createStaticRouter(
      dataRoutes,
      context,
    );

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
          <StaticRouterProvider
            router={
              router
            }
            context={
              context
            }
          />,
          {
            onShellReady() {
              const headers =
                new Headers();
              headers.set(
                "Content-Type",
                "text/html; charset=utf-8",
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
                    status: 200,
                    headers,
                  },
                ),
              );
            },
            onShellError(
              err: unknown,
            ) {
              console.error(
                "Shell error:",
                err,
              );
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
