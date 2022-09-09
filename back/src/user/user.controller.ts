import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "../dto/create-user.dto";
import {ConnectUserDto} from "../dto/connect-user.dto";
import {LocationDto} from "../dto/location.dto";

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	async createUser(@Body() user: CreateUserDto) {
		return this.userService.createUser(user)
	}

	@Get('connect')
	async connectUser(@Body() info: ConnectUserDto) {
		return this.userService.connectUser(info)
	}
}