export class CreateUserDto {
	readonly username: string;
	readonly email: string;
	readonly password: string;
	readonly city: string;
	readonly country: string;
}