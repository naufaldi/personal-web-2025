import { createRequestListener } from "@react-router/node";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname =
  path.dirname(
    fileURLToPath(
      import.meta
        .url,
    ),
  );

// In the built output, this file becomes: dist/server/server.js
// That means:
// - __dirname === /app/dist/server
// - BUILD_ROOT should be /app/dist
const BUILD_ROOT =
  path.resolve(
    __dirname,
    "..",
  );
const CLIENT_DIR =
  path.join(
    BUILD_ROOT,
    "client",
  );
const SERVER_DIR =
  path.join(
    BUILD_ROOT,
    "server",
  );

const port =
  parseInt(
    process
      .env
      .PORT ||
      "3000",
    10,
  );
const hostname =
  process
    .env
    .HOSTNAME ||
  "0.0.0.0";

let requestListener: ReturnType<
  typeof createRequestListener
> | null =
  null;

async function getRequestListener() {
  if (
    requestListener
  ) {
    return requestListener;
  }

  try {
    const serverBuildPath =
      path.join(
        SERVER_DIR,
        "server.js",
      );
    const serverBuild =
      await import(
        serverBuildPath
      );

    const build =
      {
        entry:
          {
            module:
              serverBuild,
          },
        routes:
          serverBuild.routes ||
          {},
        assets:
          {
            url: "/assets",
            version:
              "",
          },
      };

    requestListener =
      createRequestListener(
        {
          // Upstream types are a bit generic; this is safe in our controlled build.
          // If you introduce a typed build wrapper later, you can remove this cast.
          build:
            build as any,
          mode:
            process
              .env
              .NODE_ENV ||
            "production",
          getLoadContext() {
            return {};
          },
        },
      );

    return requestListener;
  } catch (error) {
    console.error(
      "Failed to load server build:",
      error,
    );
    throw error;
  }
}

function bunRequestToNodeRequest(
  bunReq: Request,
): {
  req: any;
  res: any;
  chunks: Uint8Array[];
} {
  const chunks: Uint8Array[] =
    [];

  const req =
    {
      method:
        bunReq.method,
      url: bunReq.url,
      headers:
        Object.fromEntries(
          bunReq.headers.entries(),
        ),
      // Node-style async iterable body for the React Router request handler
      [Symbol.asyncIterator]:
        async function* () {
          if (
            !bunReq.body
          )
            return;
          const reader =
            bunReq.body.getReader();
          try {
            // eslint-disable-next-line no-constant-condition
            while (
              true
            ) {
              const {
                done,
                value,
              } =
                await reader.read();
              if (
                done
              )
                break;
              if (
                value
              )
                yield value;
            }
          } finally {
            reader.releaseLock();
          }
        },
    } as any;

  const res =
    {
      statusCode: 200,
      statusMessage:
        "OK",
      headers:
        {} as Record<
          string,
          | string
          | string[]
        >,
      setHeader(
        name: string,
        value:
          | string
          | string[],
      ) {
        this.headers[
          name.toLowerCase()
        ] =
          value;
      },
      getHeader(
        name: string,
      ) {
        return this
          .headers[
          name.toLowerCase()
        ];
      },
      getHeaders() {
        return this
          .headers;
      },
      writeHead(
        statusCode: number,
        statusMessage?: string,
        headers?: Record<
          string,
          | string
          | string[]
        >,
      ) {
        this.statusCode =
          statusCode;
        if (
          typeof statusMessage ===
          "string"
        ) {
          this.statusMessage =
            statusMessage;
        }
        if (
          headers
        ) {
          Object.entries(
            headers,
          ).forEach(
            ([
              key,
              value,
            ]) => {
              this.setHeader(
                key,
                value,
              );
            },
          );
        }
      },
      write(
        chunk:
          | Uint8Array
          | string,
      ) {
        const buffer =
          typeof chunk ===
          "string"
            ? new TextEncoder().encode(
                chunk,
              )
            : chunk;
        chunks.push(
          buffer,
        );
        return true;
      },
      end(
        chunk?:
          | Uint8Array
          | string,
      ) {
        if (
          chunk
        ) {
          this.write(
            chunk,
          );
        }
      },
    } as any;

  return {
    req,
    res,
    chunks,
  };
}

async function handleRequestWithListener(
  bunReq: Request,
): Promise<Response> {
  const listener =
    await getRequestListener();
  const {
    req,
    res,
    chunks,
  } =
    bunRequestToNodeRequest(
      bunReq,
    );

  return new Promise<Response>(
    (
      resolve,
    ) => {
      // React Router's createRequestListener expects Node-style req/res
      listener(
        req,
        res,
      );

      const headers =
        new Headers();
      Object.entries(
        res.getHeaders(),
      ).forEach(
        ([
          key,
          value,
        ]) => {
          if (
            Array.isArray(
              value,
            )
          ) {
            value.forEach(
              (
                v,
              ) =>
                headers.append(
                  key,
                  String(
                    v,
                  ),
                ),
            );
          } else if (
            value !==
            undefined
          ) {
            headers.set(
              key,
              String(
                value,
              ),
            );
          }
        },
      );

      // Stream the collected chunks as a single response body.
      // For most SSR responses this is sufficient; if you adopt true streaming
      // from React Router later, you can adapt this to pipe incrementally.
      const body =
        new ReadableStream<Uint8Array>(
          {
            start(
              controller,
            ) {
              for (const chunk of chunks) {
                controller.enqueue(
                  chunk,
                );
              }
              controller.close();
            },
          },
        );

      resolve(
        new Response(
          body,
          {
            status:
              res.statusCode ||
              200,
            statusText:
              res.statusMessage ||
              "OK",
            headers,
          },
        ),
      );
    },
  );
}

Bun.serve(
  {
    port,
    hostname,
    async fetch(
      req: Request,
    ) {
      const url =
        new URL(
          req.url,
        );
      const pathname =
        url.pathname;

      // Serve static assets from the client build
      if (
        pathname.startsWith(
          "/assets/",
        ) ||
        (pathname.includes(
          ".",
        ) &&
          !pathname.endsWith(
            "/",
          ))
      ) {
        const filePath =
          path.join(
            CLIENT_DIR,
            pathname.replace(
              /^\//,
              "",
            ),
          );
        try {
          const file =
            Bun.file(
              filePath,
            );
          if (
            await file.exists()
          ) {
            return new Response(
              file,
            );
          }
        } catch (error) {
          console.error(
            "Error serving static file:",
            error,
          );
        }
      }

      // Fallback to SSR handler
      try {
        return await handleRequestWithListener(
          req,
        );
      } catch (error) {
        console.error(
          "Server error:",
          error,
        );
        return new Response(
          "Internal Server Error",
          {
            status: 500,
          },
        );
      }
    },
  },
);

console.log(
  `Server running at http://${hostname}:${port}`,
);
