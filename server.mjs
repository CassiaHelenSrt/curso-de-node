import { createServer, request } from "http";

const frase1 = Promise.resolve("Olá");
const frase2 = Promise.resolve("Mundo");

const frasesPromise = [frase1, frase2];
const frases = [];

for await (const frase of frasesPromise) {
    frases.push(frase);
}

// console.log(frases.join(""));

const parte1 = Buffer.from("Olá");
const parte2 = Buffer.from("Mundo");

const final = Buffer.concat([parte1, parte2]);

console.log(final.toString("utf-8"));

const server = createServer(async (request, response) => {
    // response.statusCode = 404;
    // response.end("Hello world");
    response.setHeader("content-Type", "text/html");

    const url = new URL(request.url, "http://localhost");

    // console.log(request.headers["content-type"]);
    // console.log(request.rawHeaders);

    const cor = url.searchParams.get("cor");
    const tamanho = url.searchParams.get("tamanho");
    const chucks = [];
    for await (const chuck of request) {
        chucks.push(chuck);
    }

    const body = Buffer.concat(chucks).toString("utf-8");

    console.log(JSON.parse(body).password);

    if (request.method === "GET" && request.url === "/") {
        response.statusCode = 200;
        response.end("Home.");
    } else if (request.method === "POST" && url.pathname === "/produtos") {
        response.statusCode = 201;
        response.end(`Produtos : ${cor}, ${tamanho}`);
    } else {
        response.statusCode = 404;
        response.end("Nao encontrado.");
    }

    console.log(request.method);
});

server.listen(3000, () => {
    console.log("Server : http://localhost:3000");
});
