import {BadRequestException, Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcrypt'
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
	constructor(private userService: UserService,
				private jwtService: JwtService) {}

	async validateUser(username: string, pass: string) {
		const user = await this.userService.getUserByUsername(username)
		if (!user)
			throw new BadRequestException('User does not exist')
		if (user && await bcrypt.compare(pass, user.password)) {
			const {password, ...result } = user
			return result
		}
		return null
	}

	async login(user: any) {
		const payload = {username: user.username, sub: user.id}
		return {
			access_token: this.jwtService.sign(payload)
		}
	}
}
