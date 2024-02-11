import { Elysia } from "elysia";
import { autoload } from "elysia-autoload";

// const app = new Elysia().use(autoload());
const app = new Elysia().use(autoload());
// const app = new Elysia().use(async function oogaBooga() {
//   await Bun.sleep(1000);
//   return {
//     compile: () => ({ config: "hi" }),
//   };
// });

// app.listen(process.env.PORT as string, () =>
//   console.log(`🦊 Server started at ${app.server?.url.origin}`)
// );

export type ElysiaApp = typeof app;
