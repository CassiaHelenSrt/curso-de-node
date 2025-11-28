import { createServer } from "http";
import { Router } from "./.vscode/router.mjs";
import { customResponse } from "./custom-response.mjs";
import { customRequest } from "./custom-request.mjs";

import { mkdir } from "node:fs/promises";
import { writeFile } from "node:fs/promises";

const router = new Router();

router.post("/produtos", async (req, res) => {
    const { categoria, slug } = req.body;

    try {
        await mkdir(`./produtos/${categoria}`);
    } catch {
        console.log(`${categoria} já criada`);
    }

    try {
        await writeFile(
            `./produtos/${categoria}/${slug}.json`,
            JSON.stringify(req.body)
        );

        res.status(201).json(`${slug}`, criado);
    } catch {
        res.status(500).end("Erro.");
    }
});

router.get("/produtos", async (req, res) => {
    res.end("produtos");
});
router.get("/produto", async (req, res) => {
    res.end("produto");
});

const server = createServer(async (request, response) => {
    const req = await customRequest(request);

    const res = customResponse(response);

    const handler = router.find(request.method, req.pathname);

    if (handler) {
        handler(req, res); // ✔ CORRETO
    } else {
        res.statusCode = 404;
        res.end("Não encontrado");
    }
});

server.listen(3000, () => {
    console.log("Server : http://localhost:3000");
});
