import { Paper, List } from '@mui/material';
import { EntryCard } from './';
import { DragEvent, DragEventHandler, FC, useContext, useMemo } from 'react';
import { Entry, EntryStatus } from '../../interfaces';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

import styles from './EntryList.module.css';

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  
  const { entries, updateEntry } = useContext( EntriesContext );
  const { isDragging, endDragging } = useContext( UIContext );

  const entriesByStatus = useMemo(() => entries.filter( entry => entry.status === status ), [ entries ])

  const allowDrop = ( event: DragEvent<HTMLDivElement> ) => {
    event.preventDefault();
  }

  const onDropEntry = ( event: DragEvent ) => {
    const id = event.dataTransfer.getData('text');
    console.log({ id });
    const entry = entries.find( e => e._id === id );
    if ( !entry ) {
      return;
    }

    entry.status = status;
    updateEntry( entry );
    endDragging();
  }

  return (
    <div
      onDrop={ onDropEntry }
      onDragOver={ allowDrop }
      className={ isDragging ? styles.dragging : '' }
    >
        <Paper sx={{
            height: 'calc( 100vh - 250px )',
            overflow: 'scroll',
            backgroundColor: 'transparent',
            padding: '1px 8px'
        }}>
            {/* Todo: cambiara dependiendo si estoy haciendo drag o no */}
            <List sx={{ opacity: isDragging ? 0.2 : 1, transition: '0.3s'  }}>
                {
                  entriesByStatus.map( ( entry: Entry ) => (
                    <EntryCard 
                    key={ entry._id }
                    entry={ entry }
                    />
                  ))
                }
            </List>
        </Paper>
    </div>
  )
}
