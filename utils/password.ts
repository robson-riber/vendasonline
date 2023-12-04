import { compare, hash } from "bcrypt";
import { LoginDto } from "src/auth/dtos/login.dto";

export const createPasswordHashed = async (password: string) : Promise<string> => {
    
    const saltOrRounds = 10;

    return hash(password, saltOrRounds);
}


export const validatePassword = async (password: string, passwordHashed: string): Promise<boolean> => {

    return compare(password, passwordHashed);
}
