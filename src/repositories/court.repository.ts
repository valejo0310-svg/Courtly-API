import { Court } from "../models/court.model";
import { CreateCourtDTO } from "../dto/create-court.dto";
import { UpdateCourtDTO } from "../dto/update-court.dto";


export async function create (data : CreateCourtDTO): Promise<Court> {
    const newCourt = await Court.create(
        {name : data.name,
         pricePerHour : data.pricePerHour
        }
    )
    return newCourt
}


export async function findAll ():Promise <Court []>{
   return await Court.findAll ()
}

export async function findById (id: number):Promise<Court | null>{
    return await Court.findByPk(id)
}

export async function deleteCourt (id:number):Promise <number>{
   return await Court.destroy({where : {id}})
}

export async function restoreCourt (id:number):Promise <void>{
   return await Court.restore({where : {id}})
}
