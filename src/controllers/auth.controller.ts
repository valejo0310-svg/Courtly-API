import { Request ,Response } from "express";
import { RegisterUserDTO } from "../dto/register-user.dto";
import { loginUser, registerUser } from "../services/auth.service";
import { LoginDTO } from "../dto/login.dto";


export async function userRegistrationController (req: Request, res: Response) {

    const data : RegisterUserDTO = req.body

    const newUser = await registerUser (data)

    const userResponse = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        active: newUser.active
    };

    res.status(201).json (userResponse)

}

export async function loginUserController (req: Request, res: Response){
    const data : LoginDTO = req.body;

    const { token } = await loginUser(data);

    res.status(200).json({ token })
}

