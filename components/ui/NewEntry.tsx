import { useState, ChangeEvent, useContext } from 'react';
import { Button, Box, TextField } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { AddCircleOutlineOutlined } from '@mui/icons-material';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {
  
    const { isAdding, setIsAdding } = useContext( UIContext );
    const [ inputValue, setInputValue ] = useState('');
    const [ touched, setTouched] = useState( false );
    
    const { addNewEntry } = useContext( EntriesContext );
    
    const onTextFieldChanged = ( event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setInputValue( event.target.value );
    }

    const onSave = () => {
        if ( inputValue.length === 0 ) return;
        console.log({ inputValue });

        addNewEntry( inputValue );
        setIsAdding( false );
        setTouched( false );
        setInputValue('');
    }
        
    return (
    <Box sx={{
        marginBottom: 2,
        paddingX: 2
    }}>
        {
            isAdding ? (
                <>
                  <TextField 
        fullWidth
        sx={{
            marginTop: 2,
            marginBottom: 1
        }}
        placeholder='Nueva entrada'
        autoFocus
        multiline
        label='Nueva entrada'
        helperText={ inputValue.length <= 0 && touched && 'Ingrese un valor' }
        error={ inputValue.length <= 0 && touched }
        value={ inputValue }
        onChange={ onTextFieldChanged }
        onBlur={ () => setTouched( true ) }
        />

        <Box display='flex' justifyContent='space-between'>
        <Button
            variant='text'
            onClick={ () => setIsAdding( false ) }
        >
            Cancelar
        </Button>

        <Button
            variant='outlined'
            color='secondary'
            endIcon={ <SaveOutlinedIcon /> }
            onClick={ onSave }
        >
            Guardar
        </Button>

        
        </Box>  
                </>
            )
            : (
        <Button
            startIcon={ <AddCircleOutlineOutlined /> }
            fullWidth
            variant='outlined'
            onClick={ () => setIsAdding( true ) }
        >
            Agregar Tarea
        </Button>
            )
        }

        
        
        
    </Box>
  )
}
