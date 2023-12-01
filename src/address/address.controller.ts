import { Body, Controller, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/createAddress.dto';
import { AddressEntity } from './entities/address.entity';

// permissão para tudo do controller
@Roles(UserType.User)
@Controller('address')

export class AddressController {

    constructor(private readonly addressService: AddressService){}

    //@Roles(UserType.User)
    @Post('/:userId')
    @UsePipes(ValidationPipe)
    async createAddress(
        @Body() createAddressDto: CreateAddressDto,
        @Param('userId') userId: number): Promise<AddressEntity>{
        return this.addressService.createAddress(createAddressDto, userId);

    }

}
