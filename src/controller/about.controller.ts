import { IncomingMessage, ServerResponse } from "http";
import { aboutService } from "../service/about.service";
import type { Iproduct } from "../types/product";
import { bodyparser } from "../utils/parseBody";
import { createProduct } from "../service/about.service";

const aboutController = async (req: IncomingMessage, res: ServerResponse) => {


    const url = req.url;
    const method = req.method;

    //get all products

    // console.log(url);

    const Urlparams = url?.split("/");
    // console.log(Urlparams);

    const id = Urlparams && Urlparams[1] === "about" ? Number(Urlparams[2]) : null;
    console.log(id);


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

    } else if (method === "GET" && id !== null) {
        const products = aboutService();
        const product = products.find((p: Iproduct) => p.id === id);

        res.writeHead(200,
            {"Content-Type": "application/json"});
            res.end(JSON.stringify({"message": "Products fetched successfully", data: product}));

    } else if (method === "POST" && url === "/about") {

        const body = await bodyparser(req);
        // console.log(body);

        const newProduct = {
            id : Date.now(),
            ...body
        }

        // console.log(newProduct);
        const products = aboutService();
        products.push(newProduct);

        createProduct(products);

        res.writeHead(201,
            {"Content-Type": "application/json"});
            res.end(JSON.stringify({"message": "Products Created successfully", 
                data: newProduct
            }));
    }


};


export default aboutController;