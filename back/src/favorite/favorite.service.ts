import {BadRequestException, ConflictException, Injectable} from '@nestjs/common';
import {LocationEntity} from "../entities/location.entity";
import {UserService} from "../user/user.service";
import {InjectRepository} from "@nestjs/typeorm";
import {FavoriteEntity} from "../entities/favorite.entity";
import {Repository} from "typeorm";
import {LocationService} from "../location/location.service";
import {WeatherInterface} from "../interfaces/weather.interface";

@Injectable()
export class FavoriteService {
	constructor(private userService: UserService,
				private locationService: LocationService,
				@InjectRepository(FavoriteEntity) private favoriteRepository: Repository<FavoriteEntity>) {}

	async addFavoriteLocation(city: string, country: string, id: number) {
		if (!city || !country)
			throw new BadRequestException()
		city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()
		country = country.charAt(0).toUpperCase() + country.slice(1).toLowerCase()
		const user = await this.userService.getUser(id)
		let location: LocationEntity | void = await this.locationService.verifyLocation(city, country)
		if (!location)
			location = await this.locationService.getLocation(city, country)
		if (await this.favoriteRepository.findOneBy({userId: user.data.id, locationID: location.id}))
			throw new ConflictException('Location is already in favorites')
		const newFav = {
			userId: user.data.id,
			locationID: location.id
		}
		return await this.favoriteRepository.save(newFav)
	}

	async deleteFavoriteLocation(city: string, country: string, id: number) {
		if (!city || !country)
			throw new BadRequestException()
		city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()
		country = country.charAt(0).toUpperCase() + country.slice(1).toLowerCase()
		const user = await this.userService.getUser(id)
		let location: LocationEntity | void = await this.locationService.verifyLocation(city, country)
		if (!location)
			location = await this.locationService.getLocation(city, country)
		const fav = await this.favoriteRepository.findOneBy({userId: user.data.id, locationID: location.id})
		if (!fav)
			throw new ConflictException('Location is not in favorites')
		return await this.favoriteRepository.delete(fav)
	}

	async getFavoriteList(id: number) {
		if (!id)
			throw new BadRequestException()
		const user = await this.userService.getUser(id)
		const fav = await this.favoriteRepository.find({where: {userId: user.data.id}})
		if (fav.length <= 0)
			return {isFavorite: false}
		let listOfFavorites: WeatherInterface[] = []
		await Promise.all(fav.map(async (fav) => {
			listOfFavorites.push(await this.locationService.getWeather(fav.locationID))
		}))
		return {
			isFavorite: true,
			Favorites: listOfFavorites
		}

	}
}
