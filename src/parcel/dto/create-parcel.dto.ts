import {ApiProperty} from "@nestjs/swagger";

export class CreateParcelDto {
    @ApiProperty({description: 'Parcel Id'})
    id: number;
    @ApiProperty({description: 'Parcel description', required: true})
    description: string;
    @ApiProperty({description: 'Parcel weight', required: true})
    weight: number;
    @ApiProperty({description: 'Parcel pickup address', required: true})
    pickupAddress: string;
    @ApiProperty({description: 'Parcel delivery address', required: true})
    deliveryAddress: string;
    @ApiProperty({description: 'Parcel pickup time'})
    pickupTime: Date;
    @ApiProperty({description: 'Parcel delivery time'})
    deliveryTime: Date;
    @ApiProperty({description: 'Sender Id'})
    sender: number;
    @ApiProperty({description: 'Biker Id'})
    biker: number;
    @ApiProperty({description: 'Parcel status'})
    status: number;
}
