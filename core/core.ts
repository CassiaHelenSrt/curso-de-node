import {
    createServer,
    type IncomingMessage,
    type Server,
    type ServerResponse,
} from "http";

import { customRequest } from "./http/custom-request";
import { customResponse } from "./http/custom-response";
import { Router } from "./router";

export class Core {
    router: Router;
    server: Server;

    constructor() {
        this.router = new Router();
        this.server = createServer(this.handler);
    }

    handler = async (request: IncomingMessage, response: ServerResponse) => {
        const req = await customRequest(request);
        const res = customResponse(response);

        // use SEMPRE o this.router
        const handler = this.router.find(request.method || "", req.pathname);

        if (handler) {
            handler(req, res);
        } else {
            res.statusCode = 404;
            res.end("Não encontrado");
        }
    };

    init() {
        this.server.listen(3000, () => {
            console.log("Server : http://localhost:3000");
        });
    }
}
