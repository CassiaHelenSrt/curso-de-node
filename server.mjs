import { createServer, request } from "http";

const server = createServer((request, response) => {
    // response.statusCode = 404;
    // response.end("Hello world");
    response.setHeader("content-Type", "text/html");
    console.log(request.url);

    if (request.method === "GET" && request.url === "/") {
        response.statusCode = 200;
        response.end("Home.");
    } else if (request.method === "POST" && request.method === "/produtos") {
        response.statusCode = 201;
        response.end("Produto criado.");
    } else {
        response.statusCode = 404;
        response.end("Nao encontrado.");
    }

    console.log(request.method);
});

server.listen(3000, () => {
    console.log("Server : http://localhost:3000");
});
