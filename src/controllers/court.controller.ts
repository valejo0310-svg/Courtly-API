import { CreateCourtDTO } from "../dto/create-court.dto";
import { Request ,Response } from "express";
import { createCourt, getAllCourts, getCourtById, updatedCourt, removeCourt} from "../services/court.service";
import { UpdateCourtDTO } from "../dto/update-court.dto";

export async function createCourtController (req: Request, res: Response){
    const data : CreateCourtDTO = req.body;

    const court = await createCourt(data)

    res.status(201).json(court)
}

export async function getAllCourtsController (_req: Request, res: Response){
    const response = await getAllCourts ()

    res.status(200).json(response)
}

export async function getCourtByIdController (req: Request, res: Response){
    const id = Number (req.params.id)

    const idResponse = await getCourtById (id)

    res.status(200).json(idResponse)
}

export async function updateCourtController (req: Request, res: Response) {
    const id = Number( req.params.id)
    const data: UpdateCourtDTO = req.body

    const court = await updatedCourt(id,data)

    res.status (200).json(court)

}



export async function deleteCourtController (req: Request, res: Response){
    const id = Number (req.params.id)

    await removeCourt(id)

    return res.status(204).send()
}
