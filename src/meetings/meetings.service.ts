import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMeetingDto } from './dto/create-meetings.dto';
import { Meeting } from './entity/meetings.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from 'src/services/entity/services.entity';

@Injectable()
export class MeetingsService {

   constructor(
    @InjectRepository(Meeting)
    private meetingsRepository: Repository<Meeting>,
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>, // Assuming you have a Service entity, replace 'any' with the actual type
  ) {}
    

create=async(createMeetingDto: CreateMeetingDto) => { 
  const existingMeeting = await this.meetingsRepository.findBy({ date: createMeetingDto.date });
existingMeeting.forEach((meeting) => {
    if (meeting.startTime <= createMeetingDto.startTime && meeting.endTime >= createMeetingDto.endTime) {
      throw new BadRequestException(
      `Cannot schedule meeting: the requested time (${createMeetingDto.startTime} - ${createMeetingDto.endTime}) overlaps with an existing meeting on ${createMeetingDto.date}.`
      );
    }
  });
  if (existingMeeting) {
    throw new BadRequestException(`Meeting already exists on ${createMeetingDto.date}`);
  }
    const service = await this.serviceRepository.findOneBy({ id: createMeetingDto.serviceId });
    if (!service) {
      throw new BadRequestException(`Service with id ${createMeetingDto.serviceId} not found`);
    }

    try{

     const meeting =  this.meetingsRepository.create(createMeetingDto);
meeting.service = { id: createMeetingDto.serviceId } as Service;

     return  await this.meetingsRepository.save(meeting);
     }
      catch (error) {
           throw new BadRequestException('Failed to create meeting', {
        cause: error,
      });
      }
}
update = async (id: number, updateMeetingDto: any) => {
    if (id != updateMeetingDto.id) {
      throw new BadRequestException('ID in the URL does not match ID in the body');
    }
    try {
      const meeting = await this.meetingsRepository.findOneBy({ id });
      if (!meeting) {
        throw new BadRequestException(`Meeting with id ${id} not found`);
      }

      Object.assign(meeting, updateMeetingDto);
      meeting.service = { id: updateMeetingDto.serviceId } as Service;
      return  await this.meetingsRepository.save(meeting);
    } catch (error) {
      throw new BadRequestException('Failed to update meeting', {
        cause: error,
      });
    }
  }
findOne = async (id: number) => {
    const meeting = await this.meetingsRepository.findOne({
      where: { id },
      relations: ['service'],
    });
    if (!meeting) {
      throw new BadRequestException(`Meeting with id ${id} not found`);
    }
    return meeting;
}
findAll = async () => {
    return await this.meetingsRepository.find({ relations: ['service'] });
}
remove = async (id: number) => {
   const meeting = await this.meetingsRepository.findOne({
  where: { id },
  relations: ['service'], 
});
    if (!meeting) {
      throw new BadRequestException(`Meeting with id ${id} not found`);
    }
    await this.meetingsRepository.remove(meeting);
}

}
