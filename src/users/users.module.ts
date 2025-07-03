import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/Guards/auth-Guard';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { ConfigService } from '@nestjs/config';

@Module({
 imports: [ConfigModule,  // חשוב להוסיף את זה כדי לטעון משתני סביבה
     TypeOrmModule.forFeature([User]),
     JwtModule.registerAsync({
       imports: [ConfigModule],
       inject: [ConfigService],
       useFactory: (configService: ConfigService) => ({
         secret: configService.get<string>('JWT_SECRET'),
         signOptions: { expiresIn: '1h' },
       }),
     }),],
  controllers: [UsersController],
  providers: [UsersService,AuthGuard]
})
export class UsersModule {}
