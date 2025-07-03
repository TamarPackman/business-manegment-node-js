import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-buisness';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from './entity/business.entity';
import { Repository } from 'typeorm';
import { UpdateBusinessDto } from './dto/update-business.dto';

@Injectable()
export class BusinessService {
      constructor(
    @InjectRepository(Business)
    private businessRepository: Repository<Business>,
  ) {}


 create =async (createBusinessDto: CreateBusinessDto) => {
   try{
   const business = this.businessRepository.create(createBusinessDto);
   return await this.businessRepository.save(business);
   }
    catch (error) {
         throw new BadRequestException('Failed to create business', {
      cause: error,
    });
    }
 }
 findOne = async (id: string) => {
    const business = await this.businessRepository.findOne({ where: { id: +id } });
    if (!business) {
        throw new NotFoundException(`Business with id ${id} not found`);
    }
    return business;
}
    findAll = async () => { 
    try {
        return await this.businessRepository.find();
    } catch (error) {
        throw new BadRequestException('Failed to find businesses', {
            cause: error,
        });
    }
}

    update = async (id: string, updateBusinessDto: UpdateBusinessDto) => {
        try{
    const business = await this.businessRepository.findOneBy({ id: +id });
    if (!business) {
          throw new NotFoundException(`Business with id ${id} not found`);
    }
    Object.assign(business, updateBusinessDto);
    return this.businessRepository.save(business);
}
        catch (error) {
            throw new BadRequestException('Failed to update business', {
                cause: error,
            });
        }
    }
    remove = async (id: string): Promise<void> => {
        const business = await this.businessRepository.findOneBy({ id: +id });
        if (!business) {
            throw new NotFoundException(`Business with id ${id} not found`);
        }
        await this.businessRepository.remove(business);
    }
}
