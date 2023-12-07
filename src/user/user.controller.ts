import { Body, Controller, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserId } from 'src/decorators/user-id.decorator';
import { CreateUserDto } from './dtos/createUser.dto';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { UserEntity } from './entities/user.entity';
import { UserType } from './enum/user-type.enum';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}

    @UsePipes(ValidationPipe)
    @Post()
    async createUser(
        @Body() createUser: CreateUserDto): Promise<UserEntity> {
        return this.userService.createUser(createUser);
    }

    @Roles(UserType.Admin)
    @Get('/all')
    async getAllUser(): Promise<ReturnUserDto[]>
    {
        return ( await this.userService.getAllUser()).map(
            (userEntity) => new ReturnUserDto(userEntity)
        );
    }

    @Roles(UserType.Admin)
    @Get('/:userId')
    async getUserById(@Param('userId') userId: number) : Promise<ReturnUserDto> {

        return new ReturnUserDto( 
            await this.userService.getUserByIdUsingRelations(userId),
        );
    }

    @Roles(UserType.Admin, UserType.User)
    @Patch()
    @UsePipes(ValidationPipe)
    async updatePasswordUser(
        @Body() updatePasswordDto: UpdatePasswordDto,
        @UserId() userId: number 
        ): Promise<UserEntity>{

            return this.userService.updatePasswordUser(updatePasswordDto, userId);       
    }     
    

    @Roles(UserType.Admin, UserType.User)
    @Get()
    async getInUser(
        @UserId() userId: number
    ): Promise<ReturnUserDto>{

        return new ReturnUserDto( await this.userService.getUserByIdUsingRelations(userId));
    }
    
}

