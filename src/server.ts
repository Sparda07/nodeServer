import { createServer, IncomingMessage, ServerResponse } from "http";
import { json } from "stream/consumers";

const server = createServer((req : IncomingMessage, res : ServerResponse
    
) => {
    // console.log("Request received:", req);
    // console.log("Response:", res);
    // console.log(req.url);
    // console.log(req.method);
    const url = req.url;
    const method = req.method;

    if( url === "/" && method === "GET") {
        // console.log("Moja Hoibo");
        res.writeHead(200,
            {"Content-Type": "application/json"});
            res.end(JSON.stringify({"message": "This is Root Route"}));

        }

        else if(url === "/about" && method === "GET") {
            // console.log("About Hoibo");
            res.writeHead(200,
            {"Content-Type": "application/json"});
            res.end(JSON.stringify({"message": "This is About Route"}));
        }

        else {
            // console.log("Req de");
            res.writeHead(200,
            {"Content-Type": "application/json"});
            res.end(JSON.stringify({"message": "Req de"}));
        }

});

server.listen(5001, () => {
    console.log("Server is running on port 5001");
});