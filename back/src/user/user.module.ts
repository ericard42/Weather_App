import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../entities/user.entity";
import {LocationModule} from "../location/location.module";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../auth/constants";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), LocationModule,
    JwtModule.register({
    secret: jwtConstants.secret,
  })],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
