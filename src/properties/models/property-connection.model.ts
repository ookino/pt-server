import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from 'src/common/pagination/pagination';
import { Property } from './property.model';

@ObjectType()
export class PropertyConnection extends PaginatedResponse(Property) {}
