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

export async function updateCourt (id:number, data :UpdateCourtDTO) : Promise <Court | null>{

    const searchCourt = await findById(id);
    if (!searchCourt){
        return null
    }
    await searchCourt.update(data)
    await searchCourt.save()
    return searchCourt
}


export async function remove (id:number) : Promise <boolean>{
    const removeCourt = await findById(id)

    if (!removeCourt){
        return false
    }
    
    await removeCourt.destroy()
    return true;
};