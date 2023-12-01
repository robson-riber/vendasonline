// https://jwt.io

import { LoginPayload } from "src/auth/dtos/loginPayload.dto";

export const authorizationToLoginPayload = (authorization: string): LoginPayload | undefined => {

    const authorizationSplited = authorization.split('.');

    if ( authorizationSplited.length < 3 || !authorizationSplited[1] ){
        return undefined;
    }

    // converte a posição 2 - body do jwt - para base4
    return JSON.parse(
        Buffer.from(authorizationSplited[1], 'base64').toString('ascii')
    );
}