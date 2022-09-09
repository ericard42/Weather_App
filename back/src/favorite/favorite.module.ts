import { Module } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import {UserModule} from "../user/user.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {FavoriteEntity} from "../entities/favorite.entity";
import {LocationModule} from "../location/location.module";

@Module({
  imports: [UserModule, LocationModule , TypeOrmModule.forFeature([FavoriteEntity])],
  controllers: [FavoriteController],
  providers: [FavoriteService]
})
export class FavoriteModule {}
