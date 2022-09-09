import {Body, Controller, Get} from '@nestjs/common';
import {LocationService} from "./location.service";
import {LocationDto} from "../dto/location.dto";

@Controller('location')
export class LocationController {
	constructor(private readonly locationService: LocationService) {}

	@Get()
	async searchLocation(@Body() location: LocationDto) {
		return await this.locationService.verifyLocation(location.city, location.country)
	}

}
