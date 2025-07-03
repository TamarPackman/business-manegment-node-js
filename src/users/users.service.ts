import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/users.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
            @InjectRepository(User)
            private userRepository: Repository<User>,
          ) {}
        
    create=async(createUserDto: CreateUserDto)=> {
        try{
            const user = this.userRepository.create(createUserDto);
            return this.userRepository.save(user);
        }catch(error){
            throw new BadRequestException('Failed to create user', {
                            cause: error,
                        });
          
    }
}

    findOne=async(id: number) => {
         try {
            const user = await this.userRepository.findOneBy({ id });
            if (!user) {
                throw new BadRequestException(`User with id ${id} not found`);
            }
            return user;
        } catch (error) {
            throw new BadRequestException('Failed to find user', {
                cause: error,
            });
        }
    }

    findAll=async() => {
          try {
            return await this.userRepository.find();
        } catch (error) {
            throw new BadRequestException('Failed to find users', {
                cause: error,
            });
        }
    }

    update=async(id: number, updateUserDto: UpdateUserDto) => {
      try {
            const user = await this.userRepository.findOneBy({ id });
            if (!user) {
                throw new BadRequestException(`User with id ${id} not found`);
            }
            Object.assign(user, updateUserDto);
            return await this.userRepository.save(user);
        } catch (error) {
            throw new BadRequestException('Failed to update user', {
                cause: error,
            });
        }
    }

    remove=async(id: number) => {
        try {
            const user = await this.userRepository.findOneBy({ id });

            if (!user) {
                throw new BadRequestException(`User with id ${id} not found`);
            }
            return await this.userRepository.remove(user);
        } catch (error) {
            throw new BadRequestException('Failed to remove user', {
                cause: error,
            });
        }
    }
    }

  