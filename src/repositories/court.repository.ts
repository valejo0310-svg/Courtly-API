import { Court } from "../models/court.model";
import { CreateCourtDTO } from "../dto/create-court.dto";
import { UpdateCourtDTO } from "../dto/update-court.dto";

const courts : Court[] =[]

export async function create (data : CreateCourtDTO): Promise<Court> {
    const id = courts.length + 1;

    const newCourt : Court ={
        id : id,
        name : data.name,
        pricePerHour : data.pricePerHour,
        active : true
    }
    courts.push(newCourt)
    return newCourt
}

export async function findAll ():Promise <Court []>{
    return courts
}

export async function findById (id: number):Promise<Court | undefined>{
    const findID = courts.find( court => court.id === id);
    return findID
}

export async function update (id:number, data :UpdateCourtDTO) : Promise <Court | undefined>{

    const searchCourt = await findById(id);
    if (!searchCourt){
        return undefined
    }
    if (data.name !== undefined){
        searchCourt.name = data.name 
    }
    if(data.pricePerHour !== undefined){
        searchCourt.pricePerHour = data.pricePerHour 
    } 
    if (data.active !== undefined) {
        searchCourt.active = data.active 
    }

    return searchCourt
}

export async function remove (id:number) : Promise <boolean>{
    const removeCourt = courts.findIndex (court => court.id === id);
    if (removeCourt === -1){
        return true
    }
    courts.splice (removeCourt , 1)

    return true
};