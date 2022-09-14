import {BadRequestException, HttpException, Injectable} from '@nestjs/common';
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
		let location: LocationEntity = await this.locationRepository.findOneBy({city: city.toLowerCase(), country: country.toLowerCase()})
		if (location)
			return location
		const that = this
		return await axios.get('http://api.positionstack.com/v1/forward?access_key=' + this.configService.get<string>('API_KEY') +
		'&query=' + city + '%20' + country + '&limit=1')
			.then(async function (res) {
				if (res.data.data.length <= 0)
					throw new BadRequestException('Location doesn\'t exist')
				const findCity = res.data.data[0].locality
				const findCountry = res.data.data[0].country
				const latitude = res.data.data[0].latitude
				const longitude = res.data.data[0].longitude
				console.log(findCity)
				if ((!findCity || findCity.toLowerCase() !== city.toLowerCase())
					|| (!findCountry || findCountry.toLowerCase() !== country.toLowerCase()))
					throw new BadRequestException('Location doesn\'t exist')
				return await that.addLocation(city, country, latitude, longitude)
			})
			.catch((err) => {
				if (err.response.statusText && err.reponse.status)
					throw new HttpException(err.response.statusText, err.response.status)
				throw new HttpException(err.response.message, err.response.statusCode)
			})
	}

	async addLocation(city: string, country: string, latitude: number, longitude: number) {
		const newLocation = {
			city: city.charAt(0).toUpperCase() + city.slice(1).toLowerCase(),
			country: country.charAt(0).toUpperCase() + country.slice(1).toLowerCase(),
			latitude: latitude,
			longitude: longitude
		}
		return await this.locationRepository.save(newLocation)
	}

	async getLocation(city: string, country: string) {
		return await this.locationRepository.findOneBy({city: city.toLowerCase(), country: country.toLowerCase()})
	}

	async getLocationByID(id: number) {
		return await this.locationRepository.findOneBy({id: id})
	}

	async getWeather(locationId: number) {
		const location = await this.getLocationByID(locationId)
		const date  = (Date.now() / 1000).toFixed(0).toString()

		return await axios.get('https://api.open-meteo.com/v1/forecast?latitude=' + location.latitude +
			'&longitude=' + location.longitude+ '&hourly=temperature_2m,precipitation&timeformat=unixtime')
			.then(async function (res) {
				let index = 0
				res.data.hourly.time.forEach(val => {
					if (val < +date)
						index++
				})
				const temperature = res.data.hourly.temperature_2m[index]
				const precipitation = res.data.hourly.precipitation[index]
				return {
					city: location.city,
					country: location.country,
					weather: res.data.hourly.temperature_2m[index],
					rain: res.data.hourly.precipitation[index],
				}
			})
			.catch((err) => {
				throw new HttpException(err.response.message, err.response.statusCode)
			})
	}
}
