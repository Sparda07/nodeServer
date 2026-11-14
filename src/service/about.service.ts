import path from "path";
import fs from "fs";

const filepath = path.join(process.cwd(), "./src/database/db.json");


export const aboutService = () => {
    // console.log(process.cwd());

    console.log(filepath);
}