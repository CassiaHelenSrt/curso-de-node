import { Core } from "./core/core";
import {
    criarCurso,
    criarAula,
    pegarCursos,
    pegarCurso,
    pegarAulas,
    pegarAula,
} from "./core/database";

const core = new Core();

core.router.get("/curso", (req, res) => {
    res.status(200).end("hello");
});

// core.router.get("/curso", (req, res) => {
//     const slug = req.query.get("slug");
//     const curso = criarCurso(slug);

//     if (curso) {
//         res.status(200).json(curso);
//     } else {
//         res.status(404).json("cirso não encontrado");
//     }
// });

core.init();
