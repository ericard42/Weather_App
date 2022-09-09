import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class FavoriteEntity {
	@PrimaryGeneratedColumn()
	FavoriteId: number

	@Column()
	userId: number

	@Column()
	locationID: number
}