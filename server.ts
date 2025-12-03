import { createServer } from "http";
import { Router } from "./router.js";
import { customResponse } from "./custom-response.js";
import { customRequest } from "./custom-request.js";
import {
    criarCurso,
    criarAula,
    pegarCursos,
    pegarCurso,
    pegarAulas,
    pegarAula,
} from "./database.js";

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

router.post("/aulas", (req, res) => {
    const { slug, nome, cursoSlug } = req.body;
    const criado = criarAula({ slug, nome, cursoSlug });

    if (criado) {
        res.status(201).json("Aula criado");
    } else {
        res.status(201).json("erro ao criar aula");
    }
});

router.get("/cursos", (req, res) => {
    const cursos = pegarCursos();
    if (cursos && cursos.length) {
        res.status(200).json(cursos);
    } else {
        res.status(404).json({ erro: "Cursos não encontrados" });
    }
});

router.get("/curso", (req, res) => {
    const slug = req.query.get("slug");
    const curso = pegarCurso(slug);
    if (curso) {
        res.status(200).json(curso);
    } else {
        res.status(404).json({ erro: "Curso não encontrado" });
    }
});

router.get("/aulas", (req, res) => {
    const curso = req.query.get("curso");

    const aulas = pegarAulas(curso);

    if (aulas && aulas.length) {
        res.status(200).json(aulas);
    } else {
        res.status(404).json({ erro: "aulas não encontrado" });
    }
});

router.get("/aula", (req, res) => {
    const curso = req.query.get("curso");
    const slug = req.query.get("slug");

    const aula = pegarAula(curso, slug);

    if (aula) {
        res.status(200).json(aula);
    } else {
        res.status(404).json({ erro: "aula não encontrado" });
    }
});

const server = createServer(async (request, response) => {
    const req = await customRequest(request);

    const res = customResponse(response);

    const handler = router.find(request.method || "", req.pathname);

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
