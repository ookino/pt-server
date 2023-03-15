import { BaseModel } from 'src/common/models/base.model';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Property } from './property.model';

@ObjectType()
export class PropertyImage extends BaseModel {
  @Field()
  url: string;

  @Field()
  property: Property;
}
