import { IncomingMessage, ServerResponse } from "http";

const aboutController = (req: IncomingMessage, res: ServerResponse) => {

    res.writeHead(200,
            {"Content-Type": "application/json"});
            res.end(JSON.stringify({"message": "This is About Route"}));

}


export default aboutController;