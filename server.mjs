import { createServer } from "http";
import { Router } from "./.vscode/router.mjs";
import { customResponse } from "./custom-response.mjs";
import { customRequest } from "./custom-request.mjs";

import { mkdir } from "node:fs/promises";
import { writeFile } from "node:fs/promises";
import { readdir, readFile } from "node:fs/promises";

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
    try {
        // lista todos os arquivos dentro de ./produtos
        const listaArquivos = await readdir("./produtos", { recursive: true });

        // filtra somente .json
        const arquivosJson = listaArquivos.filter((item) =>
            item.endsWith(".json")
        );

        // lê cada arquivo
        const promises = arquivosJson.map((arquivo) =>
            readFile(`./produtos/${arquivo}`, "utf-8")
        );

        const conteudos = await Promise.all(promises);

        // converte o texto em objetos
        const produtos = conteudos.map((c) => JSON.parse(c));

        res.status(200).json(produtos);
    } catch (err) {
        console.log("ERRO NA ROTA /produtos:", err);
        res.status(500).json({ erro: "Erro interno no servidor." });
    }
});

// router.get("/produto", async (req, res) => {
//     const categoria = req.query.get("categoria");
//     const slug = req.query.get("slug");

//     try {
//         const conteudo = await readFile(
//             `./produtos/${categoria}/${slug}.json`,
//             "utf-8"
//         );
//         const produto = JSON.parse(conteudo);
//         console.log("conteudo", produto);
//     } catch {
//         res.status(404).json("Produto");
//     }
// });

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
