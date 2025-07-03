import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { CreateMeetingDto } from './dto/create-meetings.dto';
import { UpdateMeetingDto } from './dto/update-meetings.dto';
import { AuthGuard } from 'src/Guards/auth-Guard';

@Controller('meetings')
export class MeetingsController {
constructor(private readonly meetingService: MeetingsService) {}

  @Post()
  create(@Body() createMeetingDto: CreateMeetingDto) {
    return this.meetingService.create(createMeetingDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meetingService.findOne(+id);
  }
  @Get()
  findAll() {
    return this.meetingService.findAll();
  }

@UseGuards(AuthGuard)
@Put(':id')
  update(@Param('id') id: string, @Body() updateMeetingDto: UpdateMeetingDto) {
    return this.meetingService.update(+id, updateMeetingDto);
  }

@UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.meetingService.remove(+id);
  }



}
