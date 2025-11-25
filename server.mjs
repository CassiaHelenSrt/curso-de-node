import { createServer, request } from "http";

const server = createServer((request, response) => {
    // response.statusCode = 404;
    // response.end("Hello world");
    response.setHeader("content-Type", "text/html");

    const url = new URL(request.url, "http://localhost");

    console.log(request.headers["content-type"]);
    console.log(request.rawHeaders);

    const cor = url.searchParams.get("cor");
    const tamanho = url.searchParams.get("tamanho");

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
