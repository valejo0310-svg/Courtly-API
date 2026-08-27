import { Court } from "../models/court.model";
import { CreateCourtDTO } from "../dto/create-court.dto";
import { UpdateCourtDTO } from "../dto/update-court.dto";
import {create, findAll, findById, update, remove} from "../repositories/court.repository"


export async function createCourt (data : CreateCourtDTO) : Promise <Court>{

    if (!data.name || data.name.trim() === ''){
        throw new Error ('This field needs to be filled out')
    }
    if (data.pricePerHour <= 0){
        throw new Error ('The price needs to be higher than 0')
    }
    const savedCourt = await create(data)

    return savedCourt

}

export async function getAllCourts () : Promise <Court[]>{
    const response = await findAll()

    return response
}

export async function getCourtById (id:number): Promise<Court> {
     
    const idResponse = await findById (id)
    if (!idResponse){
        throw new Error ('this court does not exists')
    }
        return idResponse
}

export async function updateCourt (id: number, data: UpdateCourtDTO): Promise <Court> {
    if (data.name !== undefined && data.name.trim() === ''){
        throw new Error ('You need to fill this field')
    }
    if (data.pricePerHour !== undefined && data.pricePerHour <= 0){
        throw new Error ('The price needs to be higher than 0')
    }

    const updatedCourt = await update(id, data)
    if (!updatedCourt){
        throw new Error ('this court does not exists')
    }

    return updatedCourt
}

export async function removeCourt (id: number):Promise <void>{
    const deleted = await remove (id);
    if (!deleted){
        throw new Error ('This court does not exist')
    }
}

