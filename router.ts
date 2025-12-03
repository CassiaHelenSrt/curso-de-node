import type { CustomRequest } from "./custom-request.ts";
import type { CustomResponse } from "./custom-response.ts";

type Handler = (
    req: CustomRequest,
    res: CustomResponse
) => Promise<void> | void;

export class Router {
    routes = {
        GET: {},
        POST: {},
    };

    get(route: string, handler: Handler) {
        this.routes["GET"][route] = handler;
    }
    post(route: string, handler: Handler) {
        this.routes["POST"][route] = handler;
    }

    find(method: string, route: string) {
        return this.routes[method]?.[route] || null;
    }
}

// export const routes = {
//     GET: {
//         "/": (req, res) => {
//             res.end("Home");
//         },
//         "/produto/notebook": (req, res) => {
//             res.end("Produtos- Notebook");
//         },
//     },

//     POST: {
//         "/produto": (req, res) => {
//             res.end("Notebook post");
//         },
//     },
// };
