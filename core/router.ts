import type { CustomRequest } from "./http/custom-request.ts";
import type { CustomResponse } from "./http/custom-response.ts";

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
    find(method: string, pathname: string) {
        const routesByMethod = this.routes[method];

        if (!routesByMethod) return null;

        const matchedRoute = routesByMethod[pathname];

        if (matchedRoute) return matchedRoute;

        const reqParts = pathname.split("/").filter(Boolean);

        for (const route of Object.keys(routesByMethod)) {
            if (!route.includes(":")) continue;
            const routeParts = route.split("/").filter(Boolean);

            if (reqParts.length !== routeParts.length) continue;
            if (reqParts[0] !== routeParts[0]) continue;

            const params = {};

            for (let i = 0; i < reqParts.length; i++) {
                const segment = routeParts[i];
                const value = reqParts[i];

                if (segment.startsWith(":")) {
                    params[segment.slice(1)] = value;
                } else if (segment !== value) {
                    ok = false;
                    break;
                }

                console.log(params);
            }

            if (ok) {
                return routesByMethod[route];
            }

            // console.log(routeParts);
            // console.log(reqParts);
        }

        return null;
    }
}
