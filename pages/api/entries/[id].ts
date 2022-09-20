import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Entry } from '../../../models';
import { IEntry } from '../../../models/Entry';

type Data = 
| { message: string }
| IEntry;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    const { id } = req.query;
    
    if ( !mongoose.isValidObjectId( id ) ) {
        return res.status( 400 ).json({ message: 'El id no es valido' });
    }

    switch ( req.method ) {
        case 'GET':
            return getEntry( req, res );
        case 'PUT':
            return updateEntry( req, res );
        
        default:
            return res.status( 400 ).json({ message: 'Metodo no existe' });
    }

}

const updateEntry = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    const { id } = req.query;

    await db.connect();

    const entryToUpdate = await Entry.findById( id );

    if ( !entryToUpdate ) {
        await db.disconnect();
        return res.status( 400 ).json({ message: `No hay entrada con ese ID: ${ id }`});
    }
    
    const {
        description = entryToUpdate.description,
        status = entryToUpdate.status
    } = req.body;
    
    // Second Form
    // entryToUpdate.description = description;
    // entryToUpdate.status = status;
    // await entryToUpdate.save();

    try {
        

    const updatedEntry = await Entry.findByIdAndUpdate( id, {
        description,
        status
    }, { runValidators: true, new: true });
    
    await db.disconnect();
    res.status(200).json( updatedEntry! );
    
} catch (error: any) {
    console.log({error});
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message.message });
}

    
}

const getEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { id } = req.query;

    await db.connect();

    try {
        const entryById = await Entry.findById( id );

        if ( !entryById ) {
            await db.disconnect();
            return res.status(400).json({ message: `No hay entrada con ese ID: ${ entryById }`});
        }
        
        await db.disconnect();
        res.status(200).json( entryById! );
    } catch (error) {
        console.log({ error });
        res.status( 400 ).json({ message: `No se pudo encontrar por el ID: ${ id }`});
    }

}