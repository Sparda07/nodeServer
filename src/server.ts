import { createServer } from "http";

const server = createServer((req, res) => {
    console.log(req);
});

server.listen(5001, () => {
    console.log("Server is running on port 5001");
});