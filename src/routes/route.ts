import { IncomingMessage, ServerResponse } from "http";
import aboutController from "../controller/about.controller";
import contactController from "../controller/contact.controller";

const routeHandler = (req: IncomingMessage, res: ServerResponse) => {

    const url = req.url;
    const method = req.method;

    if( url === "/" && method === "GET") {
        // console.log("Moja Hoibo");
        res.writeHead(200,
            {"Content-Type": "application/json"});
            res.end(JSON.stringify({"message": "This is Root Route"}));

        }

        else if(url?.startsWith("/about")) {
           aboutController(req, res);
            
        }

        else if(url?.startsWith("/contact")) {
            // console.log("Contact Hoibo");
            contactController(req, res);
        }

        else {
            // console.log("Req de");
            res.writeHead(200,
            {"Content-Type": "application/json"});
            res.end(JSON.stringify({"message": "Req de"}));
        }

}


export default routeHandler;