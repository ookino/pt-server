import { PropertyStatus } from './../models/property.model';
import { Address } from './../../common/models/address.model';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { PropertyCategory } from '../models/property.model';
import { PropertyImage } from '../models/property-image.model';

@InputType()
export class CreatePropertyAddressInput {
  @Field()
  @IsNotEmpty()
  address1: string;

  @Field()
  address2: string;

  @Field()
  @IsNotEmpty()
  city: string;

  @Field()
  @IsNotEmpty()
  postcode: number;

  @Field()
  @IsNotEmpty()
  state: string;

  @Field()
  @IsNotEmpty()
  landmark: string;
}

@InputType()
export class CreatePropertyImageInput {
  @Field()
  @IsNotEmpty()
  @Field()
  url: string;
}

@InputType()
export class CreatePropertyInput {
  @Field()
  @IsNotEmpty()
  address: CreatePropertyAddressInput;

  @Field()
  @IsNotEmpty()
  description: string;

  @Field()
  @IsNotEmpty()
  bedrooms: number;

  @Field()
  @IsNotEmpty()
  bathrooms: number;

  @Field()
  @IsNotEmpty()
  price: GLfloat;

  @Field()
  @IsEnum(PropertyStatus)
  @IsNotEmpty()
  status: PropertyStatus;

  @Field()
  @IsNotEmpty()
  category: PropertyCategory;

  @Field()
  @IsNotEmpty()
  images: CreatePropertyImageInput[];
}
