import { createServer } from "http";
import { Router } from "./.vscode/router.mjs";
import { customResponse } from "./custom-response.mjs";
import { customRequest } from "./custom-request.mjs";

const router = new Router();

router.get("/", (req, response) => {
    response.status(200).end("home");
});

router.get("/produto/notebook", (req, response) => {
    response.status(200).end("Produtos- Notebook");
});

router.post("/produto", (req, response) => {
    const cor = request.query.get("cor");
    response.status(201).json({ nome: "Notebook", cor });
});

// function postProduto(request, response) {
//     const cor = request.query.get("cor");
//     response.status(201).json({ nome: "Notebook", cor });
// }

console.log(router.routes);

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
    const req = await customRequest(request);
    const res = customResponse(response);

    const handler = router.find(request.method, req.pathname);

    console.log(handler);
    if (handler) {
        handler(request, response);
    } else {
        res.statusCode(404).end("Não encontrado");
    }
});

server.listen(3000, () => {
    console.log("Server : http://localhost:3000");
});
