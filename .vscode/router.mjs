export class Router {
    routes = {
        GET: {},
        POST: {},
    };

    get(route, handler) {
        this.routes["GET"][route] = handler;
    }
    post(route, handler) {
        this.routes["POST"][route] = handler;
    }

    find(method, route) {
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
