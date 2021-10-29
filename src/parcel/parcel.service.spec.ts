import {Test, TestingModule} from '@nestjs/testing';
import {ParcelService} from './parcel.service';
import {CreateParcelDto} from "./dto/create-parcel.dto";
import {HttpStatus} from "@nestjs/common";

describe('ParcelService', () => {
  let service: ParcelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParcelService],
    }).compile();

    service = module.get<ParcelService>(ParcelService);
  });

  it('create a new parcel', () => {
    // setup
    const dto = new CreateParcelDto;
    dto.deliveryAddress = "delivery address 123";
    dto.pickupAddress = "source address 123";
    dto.weight = 11;
    dto.description = "new parcel";

    // exercise
    service.create(dto)

    // test
    expect(service.getStorage()).toHaveLength(1);
  });

  it('create a new parcel without required params', () => {
    // setup
    const dto = new CreateParcelDto;
    dto.weight = 11;
    dto.description = "new parcel";

    // exercise
    const response = service.create(dto)

    // test
    expect(response).toStrictEqual({
      code: HttpStatus.BAD_REQUEST,
      data: {
        message: 'Some params are required',
        description: 'Please send the required params: weight, description, pickupAddress and deliveryAddress.',
      }
    })
  });

  it('findAll', () => {
    // setup
    const dto = new CreateParcelDto;
    dto.deliveryAddress = "delivery address 123";
    dto.pickupAddress = "source address 123";
    dto.weight = 11;
    dto.description = "new parcel";
    service.create(dto)

    // exercise
    const response = service.findAll()

    // test
    expect(response.length).toBeGreaterThan(0)
  });

  it('findOne', () => {
    // setup
    const dto = new CreateParcelDto;
    dto.deliveryAddress = "delivery address 123";
    dto.pickupAddress = "source address 123";
    dto.weight = 11;
    dto.description = "new parcel";
    service.create(dto)

    // exercise
    const response = service.findOne(1)

    // test
    expect(response.data).toHaveProperty('id')
  });

  it('findOne with wrong id', () => {
    // setup
    const dto = new CreateParcelDto;
    dto.deliveryAddress = "delivery address 123";
    dto.pickupAddress = "source address 123";
    dto.weight = 11;
    dto.description = "new parcel";
    service.create(dto)

    // exercise
    const response = service.findOne(11)

    // test
    expect(response).toStrictEqual({
      "code": 404,
      "data": {"description": "Please check your params and url.", "message": "Resource not found"}
    })
  });

  it('update a parcel', () => {
    // setup
    const dto = new CreateParcelDto;
    dto.deliveryAddress = "delivery address 123";
    dto.pickupAddress = "source address 123";
    dto.weight = 11;
    dto.description = "new parcel";
    service.create(dto)

    // exercise
    const response = service.update(1, {status: 3})

    // test
    expect(response.data.status).toBe(3);
  });

  it('update a parcel with wrong id', () => {
    // setup
    const dto = new CreateParcelDto;
    dto.deliveryAddress = "delivery address 123";
    dto.pickupAddress = "source address 123";
    dto.weight = 11;
    dto.description = "new parcel";
    service.create(dto)

    // exercise
    const response = service.update(123, {status: 3})

    // test
    expect(response).toStrictEqual({
      code: HttpStatus.NOT_FOUND,
      data: {
        message: 'Resource not found',
        description: 'Please check your params and url.',
      }
    });
  });

  it('remove a parcel', () => {
    // setup
    const dto = new CreateParcelDto;
    dto.deliveryAddress = "delivery address 123";
    dto.pickupAddress = "source address 123";
    dto.weight = 11;
    dto.description = "new parcel";
    service.create(dto)

    // exercise
    const response = service.remove(1  )

    // test
    expect(service.getStorage().length).toBe(0);
  });

  it('remove a parcel with wrong id', () => {
    // setup
    const dto = new CreateParcelDto;
    dto.deliveryAddress = "delivery address 123";
    dto.pickupAddress = "source address 123";
    dto.weight = 11;
    dto.description = "new parcel";
    service.create(dto)

    // exercise
    const response = service.remove(144 )

    // test
    expect(service.getStorage().length).toBe(1);
  });

  it('findAllBySenderId', () => {
    // setup
    const dto = new CreateParcelDto;
    dto.deliveryAddress = "delivery address 123";
    dto.pickupAddress = "source address 123";
    dto.weight = 11;
    dto.description = "new parcel";
    dto.sender = 3;
    service.create(dto)

    // exercise
    const response = service.findAllBySenderId(3)

    // test
    expect(response.length).toBe(1)
  });

  it('findAllBySenderId with non existent id', () => {
    // setup
    const dto = new CreateParcelDto;
    dto.deliveryAddress = "delivery address 123";
    dto.pickupAddress = "source address 123";
    dto.weight = 11;
    dto.description = "new parcel";
    dto.sender = 3;
    service.create(dto)

    // exercise
    const response = service.findAllBySenderId(113)

    // test
    expect(response.length).toBe(0)
  });

  it('findAllByBikerId', () => {
    // setup
    const dto = new CreateParcelDto;
    dto.deliveryAddress = "delivery address 123";
    dto.pickupAddress = "source address 123";
    dto.weight = 11;
    dto.description = "new parcel";
    dto.biker = 13;
    service.create(dto)

    // exercise
    const response = service.findAllByBikerId(13)

    // test
    expect(response.length).toBe(1)
  });

  it('findAllByBikerId with non existent id', () => {
    // setup
    const dto = new CreateParcelDto;
    dto.deliveryAddress = "delivery address 123";
    dto.pickupAddress = "source address 123";
    dto.weight = 11;
    dto.description = "new parcel";
    dto.biker = 13;
    service.create(dto)

    // exercise
    const response = service.findAllByBikerId(999)

    // test
    expect(response.length).toBe(0)
  });
});
