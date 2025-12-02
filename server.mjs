import { createServer } from "http";
import { Router } from "./.vscode/router.mjs";
import { customResponse } from "./custom-response.mjs";
import { customRequest } from "./custom-request.mjs";
import { criarCurso } from "./database.mjs/";

const router = new Router();

router.post("/cursos", (req, res) => {
    const { slug, nome, descricao } = req.body;
    const criado = criarCurso({ slug, nome, descricao });

    if (criado) {
        res.status(201).json("curso criado");
    } else {
        res.status(201).json("erro ao criar curso");
    }
});
router.get("/cursos", (req, res) => {});
router.get("/curso", (req, res) => {});
router.post("/aulas", (req, res) => {});
router.get("/aulas", (req, res) => {});
router.get("/aula", (req, res) => {});

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
