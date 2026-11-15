import { IncomingMessage, ServerResponse } from "http";
import { aboutService } from "../service/about.service";

const aboutController = (req: IncomingMessage, res: ServerResponse) => {


    const url = req.url;
    const method = req.method;

    if( url === "/about" && method === "GET") {

        // const products = [
        //     {id: 1, name: "Product 1", price: 10},
        //     {id: 2, name: "Product 2", price: 20},
        //     {id: 3, name: "Product 3", price: 30}
        // ]

         const products = aboutService();

        res.writeHead(200,
            {"Content-Type": "application/json"});
            res.end(JSON.stringify({"message": "Products fetched successfully", data: products}));

    }


}


export default aboutController;