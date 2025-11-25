import { createServer } from "http";

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

    // CORS — corrigido
    response.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );

    let body = "";

    // Só lê o body se NÃO for GET
    if (request.method !== "GET") {
        const chunks = [];
        for await (const chunk of request) {
            chunks.push(chunk);
        }
        body = Buffer.concat(chunks).toString("utf-8");

        // Evita quebrar o servidor
        try {
            body = JSON.parse(body);
        } catch {
            body = null;
        }
    }

    if (request.method === "GET" && url.pathname === "/") {
        response.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8",
        });

        return response.end(`
            <html>
            <head><title>Mundo</title></head>
            <body><h1>Olá Mundo</h1></body>
            </html>
        `);
    }

    if (request.method === "POST" && url.pathname === "/produtos") {
        response.writeHead(201, { "Content-Type": "application/json" });
        return response.end(JSON.stringify({ ok: true, recebido: body }));
    }

    response.writeHead(404);
    response.end("Nao encontrado.");
});

server.listen(3000, () => {
    console.log("Server : http://localhost:3000");
});
