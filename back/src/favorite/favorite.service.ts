import {ConflictException, Injectable} from '@nestjs/common';
import {LocationEntity} from "../entities/location.entity";
import {UserService} from "../user/user.service";
import {InjectRepository} from "@nestjs/typeorm";
import {FavoriteEntity} from "../entities/favorite.entity";
import {Repository} from "typeorm";
import {LocationService} from "../location/location.service";

@Injectable()
export class FavoriteService {
	constructor(private userService: UserService,
				private locationService: LocationService,
				@InjectRepository(FavoriteEntity) private favoriteRepository: Repository<FavoriteEntity>) {}

	async addFavoriteLocation(city: string, country: string, username: string) {
		const user = await this.userService.getUserByUsername(username)
		let location: LocationEntity = await this.locationService.verifyLocation(city, country)
		if (!location)
			location = await this.locationService.getLocation(city, country)
		console.log(location)
		if (await this.favoriteRepository.findOneBy({userId: user.id, locationID: location.id}))
			throw new ConflictException('Location is already in favorites')
		const newFav = {
			userId: user.id,
			locationID: location.id
		}
		return await this.favoriteRepository.save(newFav)
	}

	async deleteFavoriteLocation(city: string, country: string, username: string) {
		const user = await this.userService.getUserByUsername(username)
		let location: LocationEntity = await this.locationService.verifyLocation(city, country)
		if (!location)
			location = await this.locationService.getLocation(city, country)
		console.log(location)
		const fav = await this.favoriteRepository.findOneBy({userId: user.id, locationID: location.id})
		if (!fav)
			throw new ConflictException('Location is not in favorites')
		return await this.favoriteRepository.delete(fav)
	}

	async getFavoriteList(username: string) {
		const user = await this.userService.getUserByUsername(username)
		const fav = await this.favoriteRepository.find({where: {userId: user.id}})
		if (fav.length <= 0)
			return {isFavorite: false}
		let listOfFavorites: LocationEntity[] = []
		await Promise.all(fav.map(async (fav) => {
			listOfFavorites.push(await this.locationService.getLocationByID(fav.locationID))
		}))
		return {
			isFavorite: true,
			Favorites: listOfFavorites
		}

	}
}
