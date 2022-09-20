import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';
// import { v4 as uuidv4 } from 'uuid';
import { entriesApi } from '../../apis';
import { useSnackbar } from 'notistack';

export interface EntriesState {
    entries: Entry[];
}

const UI_INITIAL_STATE: EntriesState = {
    entries: [],
}


export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer( entriesReducer, UI_INITIAL_STATE )
    const { enqueueSnackbar } = useSnackbar();

    const addNewEntry = async ( description: string ) => {
        // const newEntry: Entry = {
        //     _id: uuidv4(),
        //     description,
        //     createdAt: Date.now(),
        //     status: 'pending'
        // }
        
        try {
            const { data } = await entriesApi.post<Entry>('/entries',{
                description
            });
            dispatch({ type: '[Entry] - Add-Entry', payload: data });
        } catch (error) {
            console.log( error );
        }
    }

    const updateEntry = async ( entry: Entry, showSnackbar = false ) => {
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${ entry._id }`, { description: entry.description, status: entry.status } );

            dispatch({
                type: '[Entry] - Entry-Updated',
                payload: data
            });

            if ( showSnackbar ) {
                enqueueSnackbar('Entrada actualizada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                });
            }

        } catch (error) {
            console.log({ error });
        }
    }

    const refreshEntries = async () => {
        const { data } = await entriesApi.get<Entry[]>('/entries');
        dispatch({
            type: '[Entry] - Refresh-Data',
            payload: data
        });
    }
    
    useEffect(() => {
        refreshEntries();
    }, []);

    return (
        <EntriesContext.Provider value={{
            ...state,
            // Methods
            addNewEntry,
            updateEntry
        }}>
            { children }
        </EntriesContext.Provider>
    );
};