import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class UserEntity {

	@PrimaryGeneratedColumn('uuid')
	id: number

	@Column()
	email: string

	@Column()
	username: string

	@Column()
	password: string

	@Column()
	location: number

	@Column("int", {array: true})
	favoriteLocations: number[]
}