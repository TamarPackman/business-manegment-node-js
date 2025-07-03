import { Module } from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { MeetingsController } from './meetings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meeting } from './entity/meetings.entity';
import { Service } from 'src/services/entity/services.entity';
import { AuthGuard } from 'src/Guards/auth-Guard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule,  // חשוב להוסיף את זה כדי לטעון משתני סביבה
    TypeOrmModule.forFeature([Meeting, Service]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [MeetingsService, AuthGuard],
  controllers: [MeetingsController],
})
export class MeetingsModule {}
