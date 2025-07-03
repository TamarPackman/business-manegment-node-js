import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { AuthGuard } from 'src/Guards/auth-Guard';


@Controller('services')
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) {
        
    }
    @UseGuards(AuthGuard)
    @Post()
    create(@Body() createServiceDto: CreateServiceDto) {
        return this.servicesService.create(createServiceDto);
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.servicesService.findOne(+id);
    }
    @Get()
    findAll() {
        return this.servicesService.findAll();
    }
    @UseGuards(AuthGuard)
    @Put(':id')
    update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
        return this.servicesService.update(+id, updateServiceDto);
    }
    @UseGuards(AuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.servicesService.remove(+id);
    }
}
