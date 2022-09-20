import { FC, PropsWithChildren, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
    sidemenuOpen: boolean;
    isAdding: boolean;
    isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
    sidemenuOpen: false,
    isAdding: false,
    isDragging: false
}


export const UIProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer( uiReducer, UI_INITIAL_STATE )

    const openSideMenu = () => {
        dispatch({ 
            type: 'UI - Open Sidebar'
        });
    }

    const closeSideMenu = () => {
        dispatch({
            type: 'UI - Close Sidebar'
        });
    }

    const setIsAdding = ( flat:boolean ) => {
        dispatch({
            type: 'UI - Set Adding',
            payload: flat
        });
    }

    const startDragging = () => {
        dispatch({ type: 'UI - Start Dragging' });
    }

    const endDragging = () => {
        dispatch({ type: 'UI - End Dragging' });
    }

    return (
        <UIContext.Provider value={{
            ...state,
        // Methods
            openSideMenu,
            closeSideMenu,
            setIsAdding,
            startDragging,
            endDragging
        }}>
            { children }
        </UIContext.Provider>
    );
};