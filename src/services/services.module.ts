import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entity/services.entity';
import { AuthGuard } from 'src/Guards/auth-Guard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule,  // חשוב להוסיף את זה כדי לטעון משתני סביבה
      TypeOrmModule.forFeature([Service]),
      JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '1h' },
        }),
      }),],
  controllers: [ServicesController],
  providers: [ServicesService,AuthGuard]
})
export class ServicesModule {}
