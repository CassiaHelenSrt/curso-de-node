import { readFile } from "fs/promises";
import { AuthApi } from "./api/auth/index.ts";
import { LmsApi } from "./api/lms/index.ts";
import { Core } from "./core/core.ts";
import { logger } from "./core/middleware/logger.ts";
import { RouteError } from "./core/utils/route-erro.ts";
import { sha256 } from "./api/auth/utils.ts";

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
    const sid = req.headers.cookie?.replace('sid=', '')

    // const id = cookie?.match(/sid=(\d+)/)?.[1];
    console.log(sid)

    if (!sid) {
        throw new RouteError(401, "não autenticado");
    }

    const sid_hash = sha256(sid)

    const session = core.db
        .query(`SELECT "user_id", FROM "sessions" WHERE "sid_hash" = ?`)
        .get(sid_hash);

    if (!session) {
        throw new RouteError(404, "usuário não encontrado");
    }

    return res.status(200).json(session);
});

core.init();
