import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../entities/user.entity";
import {LocationModule} from "../location/location.module";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), LocationModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
