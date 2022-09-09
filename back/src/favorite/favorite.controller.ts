import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {LocationDto} from "../dto/location.dto";
import {FavoriteService} from "./favorite.service";

@Controller('favorite')
export class FavoriteController {
	constructor(private readonly favoriteService: FavoriteService) {}

	@Post(':username')
	async addFavorite(@Param('username') username: string,
					  @Body() location: LocationDto) {
		return this.favoriteService.addFavoriteLocation(location.city, location.country, username)
	}

	@Delete(':username')
	async deleteFavorite(@Param('username') username: string,
						 @Body() location: LocationDto) {
		return this.favoriteService.deleteFavoriteLocation(location.city, location.country, username)
	}

	@Get(':username')
	async getFavorites(@Param('username') username: string) {
		return this.favoriteService.getFavoriteList(username)
	}
}
