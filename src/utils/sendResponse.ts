import type { ServerResponse } from "http";

export const sendResponse = (res: ServerResponse, success: boolean, status: number, message: string, data?: any) => {

    const response = {
        success,
        message,
        data: data || null
    }

    res.writeHead(status,
            {"Content-Type": "application/json"});
            res.end(JSON.stringify(response));
}