import { createServer } from "http";
import { routes } from "./.vscode/router.mjs";

const frase1 = Promise.resolve("Olá");
const frase2 = Promise.resolve("Mundo");

const frasesPromise = [frase1, frase2];
const frases = [];

for await (const frase of frasesPromise) {
    frases.push(frase);
}

const parte1 = Buffer.from("Olá");
const parte2 = Buffer.from("Mundo");

const final = Buffer.concat([parte1, parte2]);

console.log(final.toString("utf-8"));

const server = createServer(async (request, response) => {
    const url = new URL(request.url, "http://localhost");

    console.log("oi", url);

    // response.setHeader(
    //     "Access-Control-Allow-Headers",
    //     "Content-Type, Authorization"
    // );
    const handler = routes[request.method][url.pathname];
    if (handler) {
        handler(request, response);
    } else {
        response.statusCode = 404;
        response.end("Não encontrado");
    }
});

server.listen(3000, () => {
    console.log("Server : http://localhost:3000");
});
