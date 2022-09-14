import {Body, Controller, Get, Param, Post, Request, UnauthorizedException, UseGuards} from '@nestjs/common';
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
		const payload = {username: user.username, sub: user.id}
		return {
			username: user.username,
			access_token: this.jwtService.sign(payload)
		}
	}


	@UseGuards(JwtAuthGuard)
	@Get(':username')
	async getUser(@Param('username') username: string, @Request() req) {
		if (req.user.username !== username)
			throw new UnauthorizedException('Username doesn\'t match with token')
		return await this.userService.getUser(req.user.userId)
	}
}

