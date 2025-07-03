import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { BusinessService } from './business.service';
import { Business } from './entity/business.entity';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { CreateBusinessDto } from './dto/create-buisness';
import { AuthGuard } from 'src/Guards/auth-Guard';


@Controller('business')
export class BusinessController {
     constructor(private readonly businessService: BusinessService) {}
@UseGuards(AuthGuard)
  @Post()
  async createBusiness(@Body() createBusinessDto: CreateBusinessDto): Promise<Business> {
    return await this.businessService.create(createBusinessDto);
  }
  @Get(':id')
  async getBusinessById(@Param('id') id: string): Promise<Business> {
    return await this.businessService.findOne(id);
  }
    @Get()
    async getAllBusinesses(): Promise<Business[]> {
    return await this.businessService.findAll();
  }
@UseGuards(AuthGuard)
  @Put(':id')
  async updateBusiness(
    @Param('id') id: string,
    @Body() updateBusinessDto: UpdateBusinessDto,
  ) {
    return  await this.businessService.update(id, updateBusinessDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteBusiness(@Param('id') id: string): Promise<void> {
    return await this.businessService.remove(id);
  }
}
