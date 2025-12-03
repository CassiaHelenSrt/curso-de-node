import { request, type IncomingMessage } from "node:http";

export interface CustomRequest extends IncomingMessage {
    query: URLSearchParams;
    pathname: string;
    body: Record<string, any>;
}

export async function customRequest(req: IncomingMessage) {
    const customReq = req as CustomRequest;

    const url = new URL(req.url || "", "http://localhost");
    customReq.query = url.searchParams;
    customReq.pathname = url.pathname;

    const chunks: Buffer[] = [];

    for await (const chunk of req) {
        chunks.push(chunk);
    }

    const body = Buffer.concat(chunks).toString("utf-8");

    if (req.headers["content-type"] === "application/json") {
        customReq.body = JSON.parse(body);
    } else {
        customReq.body = {};
    }

    return customReq;
}
