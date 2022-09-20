import { createContext } from 'react';

interface ContextProps {
     sidemenuOpen: boolean;
     isAdding: boolean;
     isDragging: boolean;
     // Methods
     openSideMenu: () => void;
     closeSideMenu: () => void;
     setIsAdding: ( flat: boolean ) => void;
     startDragging: () => void;
     endDragging: () => void;
}

export const UIContext = createContext({} as ContextProps );