import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './interfaces/user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ){}
    
    async createUser(CreateUserDto: CreateUserDto): Promise<UserEntity> {

        const saltOrRounds = 10;
        const passwordhash = await hash(CreateUserDto.password, saltOrRounds);

        return this.userRepository.save({
            ...CreateUserDto,
            password: passwordhash
        })
    }

    async getAllUser(): Promise<UserEntity[]>{
    
        return this.userRepository.find();

    }
 
}
