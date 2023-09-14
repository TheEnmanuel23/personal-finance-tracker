import { RestApi } from "./apps/rest-api";

try {
  new RestApi().start().catch(handleError);
} catch (err) {
  handleError(err);
}

process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err);

  // process.exit(1);
});

function handleError(e: any) {
  console.log(e);
  // process.exit(1);
}
