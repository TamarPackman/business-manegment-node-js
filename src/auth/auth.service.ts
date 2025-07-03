import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { AuthSigninDto } from './dto/auth-signin.dto';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/users/entity/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { AuthSignupDto } from './dto/auth-signup.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  signin = async (signinDto: AuthSigninDto) => {
   
        const user = await this.userRepository.findOne({ where: { email: signinDto.email } });
        if (!user || !(await  bcrypt.compare(signinDto.password, user.password))) {
            throw new UnauthorizedException('Invalid email or password');
        }
        const payload = { username: user.username,email:user.email, sub: user.id };
const token = this.jwtService.sign(payload);
return { access_token: token };
    
   
    }
    signup = async (signupDto: AuthSignupDto) => {
        
        const existingUser = await this.userRepository.findOne({ where: { email: signupDto.email } });
        if (existingUser) {
            throw new UnauthorizedException('Email already exists');
        }
        const hashedPassword = await bcrypt.hash(signupDto.password, 10);
        const newUser = this.userRepository.create({
            username: signupDto.name,
            email: signupDto.email,
            password: hashedPassword,
        });
        await this.userRepository.save(newUser);
        return { message: 'User created successfully' };
    }
    
}
