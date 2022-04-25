import { IsNotEmpty, IsString, IsEmail } from "class-validator";

// Authentication interfaces with validators

export class AuthParams{
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class AuthRegisterParams{
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
    
}

export class TokenParams{
    @IsString()
    @IsNotEmpty()
    token: string;
}