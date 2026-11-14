import { IncomingMessage, ServerResponse } from "http";

const contactController = (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200,
            {"Content-Type": "application/json"});
            res.end(JSON.stringify({"message": "This is Contact Route"}));
}

export default contactController;