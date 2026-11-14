import { createServer, IncomingMessage, ServerResponse } from "http";
import { json } from "stream/consumers";
import routeHandler from "./routes/route";

const server = createServer((req : IncomingMessage, res : ServerResponse
    
) => {  
    routeHandler(req, res);

});

server.listen(5001, () => {
    console.log("Server is running on port 5001");
});