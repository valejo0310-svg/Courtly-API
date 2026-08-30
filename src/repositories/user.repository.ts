import { User } from "../models/user.model";
import { RegisterUserDTO } from "../dto/register-user.dto";

export async function findByEmail (email : string) : Promise <User | null>{
    const user = await User.findOne(
       { where : {email}}     
    )
    return user
}

export async function createUser (data : RegisterUserDTO): Promise<User> {
    const newUser = await User.create(
        {name : data.name,
         password : data.password,
         email : data.email
        }
    )
    return newUser
}
