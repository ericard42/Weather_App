import {Body, Controller, Get, Post, Request, UnauthorizedException, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "../dto/create-user.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {JwtService} from "@nestjs/jwt";

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService,
				private readonly jwtService: JwtService) {}

	@Post()
	async createUser(@Body() newUser: CreateUserDto) {
		const user = await this.userService.createUser(newUser)
		const payload = {username: user.username, user: user.id}
		return {
			username: user.username,
			access_token: this.jwtService.sign(payload)
		}
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	async getUser(@Request() req) {
		if (req.user.username !== req.body.username)
			throw new UnauthorizedException('Username doesn\'t match with token')
		return await this.userService.getUser(req.user.id)
	}
}

