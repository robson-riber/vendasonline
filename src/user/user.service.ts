import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { retry } from 'rxjs';
import { Repository } from 'typeorm';
import { createPasswordHashed, validatePassword } from 'utils/password';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { UserEntity } from './entities/user.entity';
import { UserType } from './enum/user-type.enum';

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

        const passwordhash = await createPasswordHashed(createUserDto.password);

        return this.userRepository.save({
            ...createUserDto,
            type_user: UserType.User,
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


    async updatePasswordUser(updatePasswordDto: UpdatePasswordDto, userId: number): Promise<UserEntity>{

        const user = await this.findUserById(userId);

        const passwordHashed = await createPasswordHashed(updatePasswordDto.newPassword);

        const isMatch = await validatePassword(updatePasswordDto.lastPassword, user.password) || '';

        if(!isMatch){
            throw new BadRequestException("Senha antiga inválida.")
        }

        return this.userRepository.save({
            ...user,
            password: passwordHashed
        })


    }
 
}
