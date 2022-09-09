import {
	BadRequestException,
	ConflictException,
	ForbiddenException,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "../dto/create-user.dto";
import * as bcrypt from 'bcrypt'
import {ConnectUserDto} from "../dto/connect-user.dto";
import {LocationService} from "../location/location.service";

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

		let location = await this.locationService.verifyLocation(user.city, user.country)
		if (!location)
			await this.locationService.addLocation()

		const salt = await bcrypt.genSalt()
		const newUser = {
			email: user.email,
			username: user.username,
			password: await bcrypt.hash(user.password, salt),
			location: 1,
			favoriteLocations: new Array<number>()
		}
		return await this.userRepository.save(newUser)
	}

	async checkUsername(username: string) {
		if (await this.userRepository.findOneBy({username: username}))
			throw new ConflictException('Username already exist')
	}

	async checkEmail(email: string) {
		if (await this.userRepository.findOneBy({email: email}))
			throw new ConflictException('Email already used')
	}

	async connectUser(info: ConnectUserDto) {
		if (!info.hasOwnProperty('email') || !info.hasOwnProperty('password'))
			throw new BadRequestException()
		const user = await this.userRepository.findOneBy({email: info.email})
		if (!user)
			throw new NotFoundException('Email doesn\'t exist')
		if (!await bcrypt.compare(info.password, user.password))
			throw new ForbiddenException('Wrong password')
		return {username: user.username}
	}
}
