
import { IncomingMessage } from "http";

export const bodyparser = (req: IncomingMessage) => {
    return new Promise((resolve, reject) => {
        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            try {
                if (!body.trim()) {
                    resolve({});
                    return;
                }

                const parsedBody = JSON.parse(body);
                resolve(parsedBody);

            } catch (error) {
                reject(error);
            }
        });

        req.on("error", error => {
            reject(error);
        });
    });
};
