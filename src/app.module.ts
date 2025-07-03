import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BusinessModule } from './business/business.module';
import { ServicesModule } from './services/services.module';
import { MeetingsModule } from './meetings/meetings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from '@nestjs/passport';
@Module({
  imports: [ TypeOrmModule.forRoot({
      type: 'mysql',
      host:process.env.DB_HOST || 'localhost', // תשני בהתאם לפרטי מסד הנתונים שלך
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
      username:process.env.DB_USERNAME || 'tami', // תשני בהתאם לפרטי מסד הנתונים שלך
      password:process.env.DB_PASSWORD || '327609913',
      database:process.env.DB_DATABASE || 'business_management_DB', // שם מסד הנתונים שלך
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // כל ה-entities בפרויקט
      synchronize: false, 
    }),TypeOrmModule.forFeature([AuthGuard]),
    UsersModule, AuthModule, BusinessModule, ServicesModule, MeetingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
