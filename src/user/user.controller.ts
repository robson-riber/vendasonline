import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { returnUserDto } from './dtos/returnUser.dto';
import { UserEntity } from './entities/user.entity';
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

    @Get()
    async getAllUser(): Promise<returnUserDto[]>
    {
        return ( await this.userService.getAllUser()).map(
            (userEntity) => new returnUserDto(userEntity)
        );
    }
    
}
