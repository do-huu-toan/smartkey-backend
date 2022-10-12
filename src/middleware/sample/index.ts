import { Middleware, ExpressMiddlewareInterface  } from "routing-controllers";
import { Service } from "typedi";

@Middleware({ type: 'before' })
@Service()
export class SampleMiddleware implements ExpressMiddlewareInterface{
    use(request: any, response: any, next: (err?: any) => any) {
        // console.log("Sample Middleware");
        next();
    }

}