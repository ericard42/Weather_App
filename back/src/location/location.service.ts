import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {LocationEntity} from "../entities/location.entity";
import {Repository} from "typeorm";
import axios from "axios";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class LocationService {
	constructor(@InjectRepository(LocationEntity) private locationRepository: Repository<LocationEntity>,
				private configService: ConfigService) {}

	async verifyLocation(city: string, country: string) {
		let location = await this.locationRepository.findOneBy({city: city, country: country})
		if (location)
			return location
		const that = this
		return await axios.get('http://api.positionstack.com/v1/forward?access_key=' + this.configService.get<string>('API_KEY') +
		'&query=' + city + '%20' + country + '&limit=1')
			.then(function (res) {
				if (res.data.data.length <= 0)
					throw new BadRequestException('Location doesn\'t exist')
				const findCity = res.data.data[0].name
				const findCountry = res.data.data[0].country
				if (findCity !== city || findCountry !== country)
					throw new BadRequestException('Location doesn\'t exist')
				that.addLocation()
			})
			.catch((err) => {
				throw new BadRequestException(err)
			})
	}

	async addLocation() {

	}
}
