import express, { Application } from "express";
import UserController from "./controller/user";
import {
  createExpressServer,
  getMetadataArgsStorage,
  useContainer 
} from "routing-controllers";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
const { defaultMetadataStorage } = require("class-transformer/cjs/storage");
import { routingControllersToSpec } from "routing-controllers-openapi";
import * as swaggerUiExpress from 'swagger-ui-express'
import { Container } from 'typedi';
import { SampleMiddleware } from "./middleware/sample";
import "reflect-metadata"
import { DbContext } from "./entity/datasource";
import DeviceController from "./controller/device";

class App {
  public express: Application;
  public port: number;
  private routingControllersOptions = {
    routePrefix: "/api/v1",
    controllers: [UserController, DeviceController], // we specify controllers we want to use
    middlewares: [SampleMiddleware],
  };
    constructor(port: number) {
    //variable
    this.express = express();
    this.port = port;
    this.initDatabase();
    this.initController();
    this.initSwagger();
    this.useContainer();
  }
  private initController(): void {
    this.express = createExpressServer(this.routingControllersOptions);
  }
  private initSwagger(): void {
    // Parse class-validator classes into JSON Schema:
    const schemas = validationMetadatasToSchemas({
      classTransformerMetadataStorage: defaultMetadataStorage,
      refPointerPrefix: "#/components/schemas/",
    });

    // Parse routing-controllers classes into OpenAPI spec:
    const storage = getMetadataArgsStorage();
    const spec = routingControllersToSpec(storage, this.routingControllersOptions, {
      components: {
        schemas,
        securitySchemes: {
          basicAuth: {
            scheme: "basic",
            type: "http",
          },
        },
      },
      info: {
        description: "Generated with `DHTOAN`",
        title: "API Swagger Document",
        version: "1.0.0",
      },
    });

    this.express.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(spec));
    this.express.get('', (_req, res) => {
      res.json(spec)
    })
  }
  private useContainer(){
    useContainer(Container);
  }
  private async initDatabase(){
    try{
      await DbContext.initialize()
      console.log("Connect database successful");
    }
    catch(ex){
      console.log(ex);
    }
  }
  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`Open swagger http://localhost:${this.port}/docs`);
    });
  }
}

export default App;
