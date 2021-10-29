import {Controller, Get, Post, Body, Patch, Param, Delete, Request, Response} from '@nestjs/common';
import { ParcelService } from './parcel.service';
import { CreateParcelDto } from './dto/create-parcel.dto';
import { UpdateParcelDto } from './dto/update-parcel.dto';
import {Roles} from "../auth/roles.decorator";
import {Role} from "../auth/enums/role.enum";

@Controller('parcel')
export class ParcelController {

  constructor(private readonly parcelService: ParcelService) {}

  @Post()
  create(@Body() createParcelDto: CreateParcelDto, @Request() req: any, @Response() res: any) {
    createParcelDto.sender = req.user.id
    const response = this.parcelService.create(createParcelDto);
    return res.status(response.code).json(response.data);
  }

  @Get()
  @Roles(Role.Sender)
  findAll() {
    return this.parcelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Response() res: any) {
    const response =  this.parcelService.findOne(+id);
    return res.status(response.code).json(response.data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParcelDto: UpdateParcelDto, @Response() res: any) {
    const response =  this.parcelService.update(+id, updateParcelDto);
    return res.status(response.code).json(response.data);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Response() res: any) {
    const response =  this.parcelService.remove(+id);
    return res.status(response.code).json(response.data);
  }
}
