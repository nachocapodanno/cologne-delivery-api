import {Controller, Get, Post, Body, Patch, Param, Delete, Request, Response} from '@nestjs/common';
import { ParcelService } from './parcel.service';
import { CreateParcelDto } from './dto/create-parcel.dto';
import { UpdateParcelDto } from './dto/update-parcel.dto';
import {Roles} from "../auth/roles.decorator";
import {Role} from "../auth/enums/role.enum";
import {ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiBearerAuth()
@Controller('parcel')
export class ParcelController {

  constructor(private readonly parcelService: ParcelService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new parcel.' })
  @ApiTags('parcel')
  @ApiResponse({
    status: 201,
    description: 'Parcel created.',
  })
  create(@Body() createParcelDto: CreateParcelDto, @Request() req: any, @Response() res: any) {
    createParcelDto.sender = req.user.id
    const response = this.parcelService.create(createParcelDto);
    return res.status(response.code).json(response.data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all parcels from storage.' })
  @ApiTags('parcel')
  @ApiResponse({
    status: 200,
    description: 'Parcels returned.',
  })
  findAll() {
    return this.parcelService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one parcel by parcel id' })
  @ApiTags('parcel')
  @ApiResponse({
    status: 200,
    description: 'Parcel returned.',
  })
  @ApiResponse({
    status: 404,
    description: 'Resource not found.',
  })
  @ApiParam({ name: 'id', required: true, example: 1, description: 'Parcel Id' })
  findOne(@Param('id') id: string, @Response() res: any) {
    const response =  this.parcelService.findOne(+id);
    return res.status(response.code).json(response.data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific parcel.' })
  @ApiTags('parcel')
  @ApiResponse({
    status: 200,
    description: 'Parcel updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Resource not found.',
  })
  @ApiParam({ name: 'id', required: true, example: 1, description: 'Parcel Id' })
  update(@Param('id') id: string, @Body() updateParcelDto: UpdateParcelDto, @Response() res: any, @Request() req: any) {
    const response =  this.parcelService.update(+id, updateParcelDto, req.user);
    return res.status(response.code).json(response.data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific parcel.' })
  @ApiTags('parcel')
  @ApiResponse({
    status: 200,
    description: 'Parcel removed.',
  })
  @ApiResponse({
    status: 404,
    description: 'Resource not found.',
  })
  @ApiParam({ name: 'id', required: true, example: 1, description: 'Parcel Id' })
  remove(@Param('id') id: string, @Response() res: any) {
    const response =  this.parcelService.remove(+id);
    return res.status(response.code).json(response.data);
  }

  @Get('sender/:id')
  @Roles(Role.Sender)
  @ApiOperation({ summary: 'Get all sender parcels from storage.' })
  @ApiTags('parcel')
  @ApiParam({ name: 'id', required: true, example: 1, description: 'Sender Id' })
  @ApiResponse({
    status: 200,
    description: 'Sender parcels returned.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  findAllBySenderId(@Param('id') id: number) {
    return this.parcelService.findAllBySenderId(+id);
  }


  @Get('biker/:id')
  @Roles(Role.Biker)
  @ApiOperation({ summary: 'Get all biker parcels from storage.' })
  @ApiTags('parcel')
  @ApiParam({ name: 'id', required: true, example: 15, description: 'Biker Id' })
  @ApiResponse({
    status: 200,
    description: 'Biker parcels returned.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  findAllByBikerId(@Param('id') id: number) {
    return this.parcelService.findAllByBikerId(+id);
  }
}
