import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class LocationEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	city: string

	@Column()
	country: string

	@Column()
	latitude: number

	@Column()
	longitude: number
}