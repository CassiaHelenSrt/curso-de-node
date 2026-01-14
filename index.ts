import { readFile } from "fs/promises";
import { AuthApi } from "./api/auth/index.ts";
import { LmsApi } from "./api/lms/index.ts";
import { Core } from "./core/core.ts";
import { logger } from "./core/middleware/logger.ts";
import { RouteError } from "./core/utils/route-erro.ts";

const core = new Core();
core.router.use([logger]);

new AuthApi(core).init();
new LmsApi(core).init();

core.router.get("/", (req, res) => {
    res.status(200).json("Olá");
});

core.router.get("/", async (req, res) => {
    const index = await readFile("./front/index.html", "utf-8");

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).end(index);
});


core.router.get("/segura", async (req, res) => {
    //esse cookies e o ud do usuario autendicado
    const cookies = req.headers.cookie?.match(/sid=(\d+)/)?.[1]

    if(!cookies){
         throw new RouteError(404, "não autenticado")
    }

    const user = core.db.query(`SELECT "email", "email" From "users" WHERE "id" =?`).get(cookies)

    if(!user){
            throw new RouteError(404, "usuario nao encontrado")
        }

    console.log(cookies)
    res.status(200).json(user);
    // res.status(200).json(cookies);
    // res.status(200).json('segura');
});

core.init();
