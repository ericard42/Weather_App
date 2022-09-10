import {Body, Controller, Delete, Get, Param, Post, Request, UnauthorizedException, UseGuards} from '@nestjs/common';
import {LocationDto} from "../dto/location.dto";
import {FavoriteService} from "./favorite.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('favorite')
export class FavoriteController {
	constructor(private readonly favoriteService: FavoriteService) {}

	@UseGuards(JwtAuthGuard)
	@Post(':username')
	async addFavorite(@Param('username') username: string,
					  @Body() location: LocationDto, @Request() req) {
		if (req.user.username !== username)
			throw new UnauthorizedException('Username doesn\'t match with token')
		return this.favoriteService.addFavoriteLocation(location.city, location.country, req.id)
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':username')
	async deleteFavorite(@Param('username') username: string,
						 @Body() location: LocationDto, @Request() req) {
		if (req.user.username !== username)
			throw new UnauthorizedException('Username doesn\'t match with token')
		return this.favoriteService.deleteFavoriteLocation(location.city, location.country, req.id)
	}

	@UseGuards(JwtAuthGuard)
	@Get(':username')
	async getFavorites(@Param('username') username: string,
					   @Request() req) {
		if (req.user.username !== username)
			throw new UnauthorizedException('Username doesn\'t match with token')
		return this.favoriteService.getFavoriteList(req.id)
	}
}
