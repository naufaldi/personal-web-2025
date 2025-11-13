import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname =
  path.dirname(
    fileURLToPath(
      import.meta
        .url,
    ),
  );
// When built to dist/server/server.js, __dirname is dist/server
// So we need to go up one level to get to project root (which is dist)
const PROJECT_ROOT =
  path.resolve(
    __dirname,
    "..",
  );
const CLIENT_DIR =
  path.join(
    PROJECT_ROOT,
    "client",
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

let requestListener:
  | ((
      req: Request,
    ) => Promise<Response>)
  | null =
  null;

async function getRequestListener() {
  if (
    requestListener
  ) {
    return requestListener;
  }

  try {
    const appPath =
      path.join(
        PROJECT_ROOT,
        "server/app/entry.app.js",
      );
    const appModule =
      await import(
        appPath
      );
    requestListener =
      appModule.default;
    return requestListener;
  } catch (error) {
    console.error(
      "Failed to load app listener:",
      error,
    );
    throw error;
  }
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
        const listener =
          await getRequestListener();
        if (
          !listener
        ) {
          throw new Error(
            "Request listener not initialized",
          );
        }
        return await listener(
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
