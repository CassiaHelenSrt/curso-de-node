import { type Middleware } from "../router.ts";

export const bodyJson: Middleware = async (req, res) => {
    if (
        req.headers["content-type"] !== "application/json" &&
        req.headers["content-type"] !== "application/json; charset=utf8"
    ) {
        return;
    }
    console.log("bodyJson");
    const chunks: Buffer[] = [];
    for await (const chunk of req) {
        chunks.push(chunk);
    }
    const body = Buffer.concat(chunks).toString("utf-8");

    if (body === "") {
        req.body = {};
        return;
    }

    if (req.headers["content-type"] === "application/json") {
        req.body = JSON.parse(body);
    } else {
        req.body = {};
    }
};
