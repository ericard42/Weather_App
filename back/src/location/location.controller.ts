import {Body, Controller, Get, Post} from '@nestjs/common';
import {LocationService} from "./location.service";
import {LocationDto} from "../dto/location.dto";

@Controller('location')
export class LocationController {
	constructor(private readonly locationService: LocationService) {}

	@Post()
	async searchLocation(@Body() location: LocationDto) {
		const loc = await this.locationService.verifyLocation(location.city, location.country)
		console.log(loc)
		if (loc)
			return await this.locationService.getWeather(loc.id)
	}
}
