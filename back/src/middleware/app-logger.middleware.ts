import {Injectable, NestMiddleware, Logger, HttpStatus, ForbiddenException} from "@nestjs/common";
import {Request, Response} from "express";

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
	constructor() {}
	private logger = new Logger('HTTP')

	use(req: Request, res: Response, next: () => void) {
		const host = "http://" + process.env.HOST + ":8081"
		const {headers, method, originalUrl: url} = req
		res.on('close', () => {
			const {statusCode} = res;
			this.logger.log(`${method} ${url} ${statusCode} - ${headers["origin"]}`)
		})
		next();
	}
}