import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entity/services.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServicesService {
      constructor(
        @InjectRepository(Service)
        private serviceRepository: Repository<Service>, // Assuming you have a Service entity, replace 'any' with the actual type
      ) {}
    

    create = async (createServiceDto: CreateServiceDto) => {
        // Logic to create a service
        try {
            const service = this.serviceRepository.create(createServiceDto);
            return await this.serviceRepository.save(service);
        } catch (error) {
            throw new BadRequestException('Failed to create service', {
                cause: error,
            });
        }
    }

    findOne=async(id: number) => {
        try {
            const service = await this.serviceRepository.findOneBy({ id });
            if (!service) {
                throw new BadRequestException(`Service with id ${id} not found`);
            }
            return service;
        } catch (error) {
            throw new BadRequestException('Failed to find service', {
                cause: error,
            });
        }
    }

    findAll=async() => {
        try {
            return await this.serviceRepository.find();
        } catch (error) {
            throw new BadRequestException('Failed to find services', {
                cause: error,
            });
        }
    }

    update=async(id: number, updateServiceDto: UpdateServiceDto) => {
        try {
            const service = await this.serviceRepository.findOneBy({ id });
            if (!service) {
                throw new BadRequestException(`Service with id ${id} not found`);
            }
            Object.assign(service, updateServiceDto);
            return await this.serviceRepository.save(service);
        } catch (error) {
            throw new BadRequestException('Failed to update service', {
                cause: error,
            });
        }
    }

    remove=async(id: number) =>{
        try {
            const service = await this.serviceRepository.findOne({
                where: { id },
                relations: ['meetings'], 
            });
            if (!service) {
                throw new BadRequestException(`Service with id ${id} not found`);
            }
            return this.serviceRepository.remove(service);
        } catch (error) {
            throw new BadRequestException('Failed to remove service', {
                cause: error,
            });
        }
    }
}
