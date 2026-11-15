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
    }else if (method === "PUT" && id !== null) {
        const body = await bodyparser(req);
        const products = aboutService();

        const index = products.findIndex((p: Iproduct) => p.id === id);
        // console.log(index);
        if (index <0) {
            res.writeHead(404,
                {"Content-Type": "application/json"});
                res.end(JSON.stringify({"message": "Product not found"}));
                return;
        }

        products[index] = {
            ...products[index],
            ...body
        };
        createProduct(products);
        res.writeHead(200,
            {"Content-Type": "application/json"});
            res.end(JSON.stringify({"message": "Products updated successfully", 
                data: products[index]
            }));
    } else if (method === "DELETE" && id !== null) {
        const products = aboutService();
        const index = products.findIndex((p: Iproduct) => p.id === id);
        if (index < 0) {
            res.writeHead(404,
                {"Content-Type": "application/json"});
                res.end(JSON.stringify({"message": "Product not found"}));
                return;
        }
        products.splice(index, 1);
        createProduct(products);
        res.writeHead(200,
            {"Content-Type": "application/json"});
            res.end(JSON.stringify({"message": "Products deleted successfully"}));
    }


};


export default aboutController;