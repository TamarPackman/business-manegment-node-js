import { Module } from '@nestjs/common';
import { BusinessController } from './business.controller';
import { BusinessService } from './business.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from './entity/business.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/Guards/auth-Guard';
import { ConfigModule, ConfigService } from '@nestjs/config';



@Module({
  imports: [ConfigModule,  // חשוב להוסיף את זה כדי לטעון משתני סביבה
      TypeOrmModule.forFeature([Business]),
      JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '1h' },
        }),
      }),],
  
  controllers: [BusinessController],
  providers: [BusinessService,AuthGuard]
})
export class BusinessModule {

}
