import { BaseModel } from './base.model';
import { Field, ObjectType, InputType } from '@nestjs/graphql';

@InputType('AddressInput')
@ObjectType()
export class Address extends BaseModel {
  @Field()
  address1: string;

  @Field()
  address2: string;

  @Field()
  city: string;

  @Field()
  postcode: number;

  @Field()
  state: string;

  @Field()
  landmark: string;
}
