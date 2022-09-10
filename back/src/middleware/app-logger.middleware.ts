import {Injectable, NestMiddleware, Logger, HttpStatus, ForbiddenException} from "@nestjs/common";
import {Request, Response} from "express";

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
	constructor() {}
	private logger = new Logger('HTTP')

	use(req: Request, res: Response, next: () => void) {
		const {headers, method, originalUrl: url} = req
		//Autoriser uniquement le Front + Localhost + Postman
		if (req.ip !== "::ffff:127.0.0.1" && req.ip !== "::1")
			res.statusCode = HttpStatus.FORBIDDEN
		res.on('close', () => {
			const {statusCode} = res;
			this.logger.log(`${method} ${url} ${statusCode} - ${headers["origin"]}`)
		})
		if (res.statusCode === HttpStatus.FORBIDDEN)
			throw new ForbiddenException()
		next();
	}
}