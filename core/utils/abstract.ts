import { Core } from "../core.ts";

export abstract class CoreProvider {
    core: Core;
    router: Core["router"];
    db: Core["db"];

    constructor(core: Core) {
        this.core = core;
        this.router = core.router;
        this.db = core.db;
    }
}

export abstract class Api extends CoreProvider {
    /** utilize para criar as tabelas */
    tables() {}

    /** registre as rotas da API aqui */
    routes() {}

    init() {
        this.tables;
        this.routes;
    }
}
