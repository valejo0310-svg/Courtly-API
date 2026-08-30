import { RegisterUserDTO } from "../dto/register-user.dto";
import { LoginDTO } from "../dto/login.dto";
import { User } from "../models/user.model";
import { findByEmail, createUser } from "../repositories/user.repository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function registerUser (data : RegisterUserDTO) : Promise <User> {
    if (!data.name || data.name.trim() === ''){
        throw new Error ('This field needs to be completed')
    }
    
    if (!data.email || data.email.trim() ===''){
        throw new Error ('This field needs to be completed')
    }

    if (!data.password || data.password.trim().length < 6){
        throw new Error ('This field needs to be completed')
    }
    const normalizedEmail = data.email.trim().toLowerCase();

    const existingUser = await findByEmail(normalizedEmail);
    
    if (existingUser) {
        throw new Error('This email is already registered');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await createUser({
        name: data.name.trim(),
        email: normalizedEmail,
        password: hashedPassword
    });

    return newUser;
}


export async function loginUser (data : LoginDTO) : Promise<{ token: string }>{
    const normalizedEmail = data.email.trim().toLowerCase();

    const findEmail = await findByEmail (normalizedEmail);

    if (!findEmail){
        throw new Error ('Invalid credentials');
    };

    const isPasswordValid: boolean = await bcrypt.compare(data.password, findEmail.password);

    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    };

    const secret = process.env.JWT_SECRET || 'super_secret_fallback_key';

    const token = jwt.sign(
        { 
            userID: findEmail.id, 
            role: findEmail.role 
        },
        secret,
        { 
            expiresIn: '24h'
        }
    );
    return { token };
}
