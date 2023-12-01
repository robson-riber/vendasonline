import { Body, Controller, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserId } from 'src/decorators/user-id.decorator';
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
    //@Post('/:userId')
    @Post()
    @UsePipes(ValidationPipe)
    async createAddress(
        @Body() createAddressDto: CreateAddressDto,
        @UserId() userId: number): Promise<AddressEntity>{
        
        //console.log('userid: ', userId);
            
        return this.addressService.createAddress(createAddressDto, userId);

    }

}
