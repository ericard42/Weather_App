import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException, UseGuards
} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "../dto/create-user.dto";
import * as bcrypt from 'bcrypt'
import {LocationService} from "../location/location.service";
import {LocationEntity} from "../entities/location.entity";
import * as EmailValidator from 'email-validator'
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Injectable()
export class UserService {
	constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
				private locationService: LocationService) {}

	async createUser(user: CreateUserDto) {
		if (!user.hasOwnProperty('username') || !user.hasOwnProperty('email')
			|| !user.hasOwnProperty('password') || !user.hasOwnProperty('city')
			|| !user.hasOwnProperty('country'))
			throw new BadRequestException('Some fields are missing for create a User')

		await this.checkEmail(user.email)
		await this.checkUsername(user.username)

		let location: LocationEntity = await this.locationService.verifyLocation(user.city, user.country)
		if (!location)
			location = await this.locationService.getLocation(user.city, user.country)
		console.log(location)
		const salt = await bcrypt.genSalt()
		const newUser = {
			email: user.email,
			username: user.username,
			password: await bcrypt.hash(user.password, salt),
			location: location.id,
			favoriteLocations: []
		}
		return await this.userRepository.save(newUser)
	}

	@UseGuards(JwtAuthGuard)
	async getUser(id: number) {
		const user = await this.userRepository.findOneBy({id: id})
		if (!user)
			throw new NotFoundException('User not found')
		const {password, ... result} = user
		return result
	}

	async getUserByUsername(username: string) {
		const user = await this.userRepository.findOneBy({username: username})
		if (!user)
			throw new NotFoundException('User not found')
		return user
	}

	async checkUsername(username: string) {
		if (await this.userRepository.findOneBy({username: username}))
			throw new ConflictException('Username already exist')
	}

	async checkEmail(email: string) {
		if (!EmailValidator.validate(email))
			throw new BadRequestException('Email is not valid')
		if (await this.userRepository.findOneBy({email: email}))
			throw new ConflictException('Email already used')
	}
}
