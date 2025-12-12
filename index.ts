import { Core } from "./core/core.ts";
import { pegarCurso } from "./core/database.ts";

import { logger } from "./core/middleware/logger.ts";
import { RouteError } from "./core/utils/route-erro.ts";

const core = new Core();
core.router.use([logger]);

core.router.get("/curso/:slug", (req, res) => {
    const { slug } = req.params;
    const curso = pegarCurso(slug);

    console.log("curso retornado:", curso);

    if (!curso) {
        throw new RouteError(404, "curso não encontrado");
    }

    res.status(200).json(curso);
});

// core.router.get(
//     "/curso/:curso/pegar",
//     (req, res) => {
//         const slug = req.query.get("slug");
//         const curso = pegarCurso(slug);
//         if (curso) {
//             res.status(200).json(curso);
//         } else {
//             res.status(404).json("curso não encontrado");
//         }
//     },
//     [logger]
// );

// core.router.get("/curso/:curso/deletar", (req, res) => {
//     const slug = req.query.get("slug");
//     const curso = pegarCurso(slug);
//     if (curso) {
//         res.status(200).json(curso);
//     } else {
//         res.status(404).json("curso não encontrado");
//     }
// });
core.router.get("/", (req, res) => {
    res.status(200).json("Olá");
});
core.router.get("/aula/:aula", (req, res) => {
    res.status(200).json("Olá");
});

core.init();
