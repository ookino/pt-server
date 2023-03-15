import { InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from 'src/common/order/order';

export enum PropertyOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  address = 'address',
  description = 'description',
  bedrooms = 'bedrooms',
  bathrooms = 'bathrooms',
  price = 'price',
  status = '  status',
  category = 'category',
  images = 'images',
}

registerEnumType(PropertyOrderField, {
  name: 'PropertyOrderField',
  description: 'Properties by which post connections can be ordered.',
});

@InputType()
export class PropertyOrder extends Order {
  field: PropertyOrderField;
}
