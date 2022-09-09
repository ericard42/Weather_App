import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import { LocationModule } from './location/location.module';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal:true
        }),
      TypeOrmModule.forRoot({
        type: 'sqlite',
        database: 'weatherDB',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      UserModule,
      LocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
