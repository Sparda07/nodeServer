import { IncomingMessage, ServerResponse } from "http";
import { aboutService } from "../service/about.service";
import type { Iproduct } from "../types/product";
import { bodyparser } from "../utils/parseBody";
import { createProduct } from "../service/about.service";
import { sendResponse } from "../utils/sendResponse";

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


        const products = aboutService();

        try {
                    sendResponse(res, true, 200, "Products fetched successfully", products);
        }
        catch (error) {
            sendResponse(res, false, 500, "Internal Server Error");
        }
        


    } else if (method === "GET" && id !== null) {
        const products = aboutService();
        const product = products.find((p: Iproduct) => p.id === id);

        if (!product) {
            sendResponse(res, false, 404, "Product not found");
            return;
        }

        try {
            sendResponse(res, true, 200, "Product fetched successfully", product);
        }
        catch (error) {
            sendResponse(res, false, 500, "Internal Server Error");
        }

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

        try {
            sendResponse(res, true, 201, "Product created successfully", newProduct);
        }
        catch (error) {
            sendResponse(res, false, 500, "Internal Server Error");
        }



    }else if (method === "PUT" && id !== null) {
        const body = await bodyparser(req);
        const products = aboutService();

        const index = products.findIndex((p: Iproduct) => p.id === id);
        // console.log(index);
        if (index <0) {
            try {
                sendResponse(res, false, 404, "Product not found");
            }
            catch (error) {
                sendResponse(res, false, 500, "Internal Server Error");
            }
            return;
        }

        products[index] = {
            ...products[index],
            ...body
        };
        createProduct(products);
        try {
            sendResponse(res, true, 200, "Product updated successfully", products[index]);
        }
        catch (error) {
            sendResponse(res, false, 500, "Internal Server Error");
        }


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
        sendResponse(res, true, 200, "Products deleted successfully");
    }


};


export default aboutController;