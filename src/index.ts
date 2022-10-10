require("dotenv").config();
import UserController from "./controller/user";
import App from "./app";

const app = new App(
   Number(process.env.PORT || 3000));
app.listen();
