require("dotenv").config();
import App from "./app";
import SocketServer from "./sockerServer";
import { createServer } from "http";

const port = process.env.PORT || 3000;
const app = new App(
   Number(port));
const httpServer = createServer(app.express);
const socketServer = new SocketServer(httpServer);
httpServer.listen(port, () => {
   console.log(`Open swagger http://localhost:${port}/docs`);
})