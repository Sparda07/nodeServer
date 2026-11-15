import path from "path";
import fs from "fs";

const filepath = path.join(process.cwd(), "./src/database/db.json");


export const aboutService = () => {
    // console.log(process.cwd());

    // console.log(filepath);

    const result = fs.readFileSync(filepath, "utf-8");

    // console.log(result);

    return JSON.parse(result);
    
}