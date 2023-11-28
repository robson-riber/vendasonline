import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {

    private users: User[] = [];
    
    async createUser(CreateUserDto: CreateUserDto): Promise<User> {

        const saltOrRounds = 10;
        const passwordhash = await hash(CreateUserDto.password, saltOrRounds);

        const user: User = {
            ...CreateUserDto,
            id: this.users.length +1,
            password: passwordhash
        }

        this.users.push(user);

        return user;
    }

    
    async getAllUser(): Promise<User[]>{
    
        return this.users;

    }
 
}
