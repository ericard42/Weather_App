import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {LocationEntity} from "../entities/location.entity";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [TypeOrmModule.forFeature([LocationEntity]), ConfigModule],
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService]
})
export class LocationModule {}
