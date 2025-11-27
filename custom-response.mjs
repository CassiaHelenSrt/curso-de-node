export function customResponse(res) {
    res.status = (statusCode) => {
        res.statusCode = statusCode;
        return res;
    };

    res.json = (value) => {
        try {
            res.setHeader("Content-type", "application/json");
            res.end(JSON.stringify(value));
        } catch {
            ResizeObserver.status(500).end("error");
        }
    };
    return res;
}
