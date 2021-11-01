import {HttpStatus, Injectable} from '@nestjs/common';
import {CreateParcelDto} from './dto/create-parcel.dto';
import {UpdateParcelDto} from './dto/update-parcel.dto';
import {ParcelStatus} from "./enums/status.enum";
import users from "../../assets/data/users";

@Injectable()
export class ParcelService {

  private storage = [];

  create(createParcelDto: CreateParcelDto) {
    const {weight, description, pickupAddress, deliveryAddress} = createParcelDto;

    if ([weight, description, pickupAddress, deliveryAddress].some(el => el == undefined)) {
      return {
        code: HttpStatus.BAD_REQUEST,
        data: {
          message: 'Some params are required',
          description: 'Please send the required params: weight, description, pickupAddress and deliveryAddress.',
        }
      }
    } else {
      createParcelDto.id = this.storage.length + 1;
      createParcelDto.status = ParcelStatus.Available;
      this.storage.push(createParcelDto);
      return {
        code: HttpStatus.CREATED,
        data: {
          ...createParcelDto
        }
      }
    }
  }

  findAll() {
    return this.storage;
  }

  findOne(id: number) {
    const element = this.storage.find(parcel => parcel.id === id);
    if (element) {
      return {
        code: HttpStatus.OK,
        data: element
      }
    }
    return {
      code: HttpStatus.NOT_FOUND,
      data: {
        message: 'Resource not found',
        description: 'Please check your params and url.',
      }
    }
  }

  update(id: number, updateParcelDto: UpdateParcelDto, loggedUser: any) {
    const parcel = this.storage.find(parcel => parcel.id === id)
    if (!parcel) {
      return {
        code: HttpStatus.NOT_FOUND,
        data: {
          message: 'Resource not found',
          description: 'Please check your params and url.',
        }
      }
    }
    if (loggedUser.roles.includes('biker')) {
      if (parcel.biker) {
        if (parcel.biker !== loggedUser.id) {
          return {
            code: HttpStatus.FORBIDDEN,
            data: {
              message: 'Resource not allowed',
              description: 'Please check your permissions.',
            }
          }
        }
      } else {
        updateParcelDto.biker = loggedUser.id;
      }
    }
    if (updateParcelDto?.status === ParcelStatus.Picked) {
      updateParcelDto.pickupTime = new Date()
    }
    if (updateParcelDto?.status === ParcelStatus.Delivered) {
      updateParcelDto.deliveryTime = new Date()
    }
    const updatedParcel = Object.assign(parcel, updateParcelDto);
    this.storage[parcel.id - 1] = updatedParcel;
    return {
      code: HttpStatus.OK,
      data: {
        ...updatedParcel
      }
    }
  }

  remove(id: number) {
    const element = this.storage.find(parcel => parcel.id === id);
    if (element) {
      this.storage.splice(id - 1, 1);
      return {
        code: HttpStatus.OK,
        data: {
          message: `Resource with ${id} was removed.`,
        }
      }
    }
    return {
      code: HttpStatus.NOT_FOUND,
      data: {
        message: 'Resource not found',
        description: 'Please check your params and url.',
      }
    }
  }

  getStorage() {
    return this.storage
  }

  findAllBySenderId(id: number) {
    const parcels = this.storage.filter(parcel => parcel.sender === id);
    return this.getParcelsWithUserEntities(parcels);
  }

  findAllByBikerId(id: number) {
    const parcels = this.storage.filter(parcel => parcel.biker === id);
    return this.getParcelsWithUserEntities(parcels);
  }

  private getParcelsWithUserEntities (parcels: any) {
    return parcels.map(item => {
      return {...item, sender: this.findUserByUserId(item.sender), biker: this.findUserByUserId(item.biker)}
    })
  }

  private findUserByUserId(id: number) {
    return users.find(user => user.id === id);
  }
}
