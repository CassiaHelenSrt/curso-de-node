export class Router {
    routes = {
        GET: {},
        POST: {},
    };
    get(route: string, handler: any) {
        this.routes["GET"][route] = handler;
    }
    post(route: string, handler: any) {
        this.routes["POST"][route] = handler;
    }
    find(method: string, route: string) {
        return this.routes[method]?.[route] || null;
    }
}
