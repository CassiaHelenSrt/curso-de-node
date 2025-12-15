import { Core } from "./core/core.ts";
import { logger } from "./core/middleware/logger.ts";
import { RouteError } from "./core/utils/route-erro.ts";

const core = new Core();
core.router.use([logger]);

core.db.exec(`
    CREATE TABLE IF NOT EXISTS "products" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "name" TEXT,
        "slug" TEXT NOT NULL UNIQUE,
        "price" INTEGER
    );

    INSERT OR IGNORE INTO "products"
    ("name", "slug", "price") VALUES
    ('Cabeca', 'cabeca', 300);
`);

// core.router.get("/products/:slug", (req, res) => {
//     const { slug } = req.params;

//     const product = core.db
//         .prepare(`SELECT * FROM "product" WHERE "slug" = ?`)
//         .get(slug);

//     console.log("produto buscado:", slug);

//     if (!product) {
//         throw new RouteError(404, "Produto não encontrado");
//     }

//     res.status(200).json(product);
// });

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
