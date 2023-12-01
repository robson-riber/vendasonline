import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { retry } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ){}
    
    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {

        const user = await this.findUserByEmail(createUserDto.email).catch(() => undefined);

        if (user) {
            throw new BadGatewayException('Email já registrado!');
        }

        const saltOrRounds = 10;
        const passwordhash = await hash(createUserDto.password, saltOrRounds);

        return this.userRepository.save({
            ...createUserDto,
            type_user: 1,
            password: passwordhash
        })
    }


    async getAllUser(): Promise<UserEntity[]>{
    
        return this.userRepository.find();
    }


    async getUserByIdUsingRelations(userId: number): Promise<UserEntity>{

        return this.userRepository.findOne({
            where:{
                id: userId
            },
            relations: {
                addresses: {
                    city: {
                        state: true,
                    }
                }     
            },
        });
    }

    async findUserById(userId: number): Promise<UserEntity>{

        const user = await this.userRepository.findOne({
            where: {
                id: userId
            }
        });

        if (!user){
            throw new NotFoundException('UserId não encontrado!');
        }

        return user;
    }


    async findUserByEmail(email: string): Promise<UserEntity>{

        const user = await this.userRepository.findOne({
            where: {
                email,
            }
        });

        if (!user){
            throw new NotFoundException('E-mail não encontrado!');
        }

        return user;

    }
 
}
