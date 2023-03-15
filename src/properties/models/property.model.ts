import { PropertyImage } from './property-image.model';
import { Address } from '../../common/models/address.model';
import {
  Field,
  ObjectType,
  registerEnumType,
  InputType,
} from '@nestjs/graphql';
import { User } from 'src/users/models/user.model';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class Property extends BaseModel {
  @Field()
  address: Address;

  @Field()
  description: string;

  @Field()
  bedrooms: number;

  @Field()
  bathrooms: number;

  @Field()
  price: GLfloat;

  @Field((type) => PropertyStatus)
  status: PropertyStatus;

  @Field()
  category: PropertyCategory;

  @Field()
  images: PropertyImage[];
}

export enum PropertyStatus {
  AVAILABLE = 'AVAILABLE',
  SOLD = 'SOLD',
  UNDER_OFFER = 'UNDER_OFFER',
}

export enum PropertyCategory {
  FOR_SALE = 'FOR_SALE',
  FOR_RENT = 'FOR_RENT',
}

registerEnumType(PropertyCategory, { name: 'PropertyCategory' });
registerEnumType(PropertyStatus, { name: 'PropertyStatus' });
