import { PropertyOrder } from './dto/property-order.input';
import { PrismaService } from 'nestjs-prisma';
import {
  Resolver,
  Query,
  Parent,
  Args,
  ResolveField,
  Subscription,
  Mutation,
} from '@nestjs/graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PubSub } from 'graphql-subscriptions';
import { UseGuards } from '@nestjs/common';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/models/user.model';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { PropertyIdArgs } from './args/property-id.args';
import { UserIdArgs } from './args/user-id.args';
import { Property } from './models/property.model';
import { PropertyConnection } from './models/property-connection.model';
import { CreatePropertyInput } from './dto/create-property.input';

const pubSub = new PubSub();

@Resolver(() => Property)
export class PropertiesResolver {
  constructor(private prisma: PrismaService) {}

  @Subscription(() => Property)
  propertyCreated() {
    return pubSub.asyncIterator('propertyCreated');
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Property)
  async createProperty(@Args('data') data: CreatePropertyInput) {
    const newProperty = this.prisma.property.create({
      data: {
        ...data,
        address: {
          create: data.address,
        },
        images: {
          create: data.images,
        },
      },
    });
    pubSub.publish('propertyCreated', { propertyCreated: newProperty });
    return newProperty;
  }

  @Query(() => PropertyConnection)
  async properties(
    @Args() { after, before, first, last }: PaginationArgs,
    @Args({ name: 'query', type: () => String, nullable: true })
    query: string,
    @Args({
      name: 'orderBy',
      type: () => PropertyOrder,
      nullable: true,
    })
    orderBy: PropertyOrder
  ) {
    const a = await findManyCursorConnection(
      (args) =>
        this.prisma.property.findMany({
          orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : null,
          ...args,
        }),
      () => this.prisma.property.count(),
      { first, last, before, after }
    );
    return a;
  }

  // @Query(() => [Property])
  // userpropertys(@Args() id: UserIdArgs) {
  //   return this.prisma.user
  //     .findUnique({ where: { id: id.userId } })
  //     .posts({ where: { published: true } });

  //   // or
  //   // return this.prisma.propertys.findMany({
  //   //   where: {
  //   //     published: true,
  //   //     author: { id: id.userId }
  //   //   }
  //   // });
  // }

  @Query(() => Property)
  async property(@Args() id: PropertyIdArgs) {
    return this.prisma.property.findUnique({ where: { id: id.propertyId } });
  }

  // @ResolveField('author', () => User)
  // async author(@Parent() property: Property) {
  //   return this.prisma.property
  //     .findUnique({ where: { id: property.id } })
  //     .author();
  // }
}
