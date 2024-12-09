import React from "react";
import {  useState } from "react";

import { Procedure } from "../interfaces/Procedure";

export interface AppContextProviderProps {
  children: React.ReactNode;
}

interface AppContextType {
  nameFilter: string;
  setNameFilter: (nameFilter: string) => void;
  descriptionFilter: string;
  setDescriptionFilter: (descriptionFilter: string) => void;
  nameDialog: string;
  setNameDialog: (nameDialog: string) => void;
  descriptionDialog: string;
  setDescriptionDialog: (descriptionFilter: string) => void;
  
  procedures: Procedure[];
  setProcedures: (procedures: Procedure[]) => void;
  filasTotales: number;
  setFilasTotales: (filasTotales: number) => void;

}
export const AppContext = React.createContext<AppContextType | null>(null);

export const AppContextProvider = ({children}: AppContextProviderProps) => {
  const [nameFilter, setNameFilter] = useState<string>("")
  const [descriptionFilter, setDescriptionFilter] = useState<string>("")
  const [nameDialog, setNameDialog] = useState<string>("")
  const [descriptionDialog, setDescriptionDialog] = useState<string>("")
  
  const [procedures, setProcedures] = useState<Procedure[]>([])
  const [filasTotales, setFilasTotales] = useState<number>(0)

  return (
    <AppContext.Provider value={{nameFilter, setNameFilter, descriptionFilter, setDescriptionFilter, nameDialog, setNameDialog, descriptionDialog, setDescriptionDialog, procedures, setProcedures, filasTotales, setFilasTotales}}>
      {children}
    </AppContext.Provider>);
  
}
// export const AppProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    // const [name, setName] = useState<string>("")
    // const [description, setDescription] = useState<string>("")
    // const [procedures, setProcedures] = useState<Procedure[]>([])
  
//     return (
//       <AppContext.Provider value={{name, setName, description, setDescription, procedures, setProcedures}}>
//         {children}
//       </AppContext.Provider>
//     );
// }

export const useAppContext = () => {
    const context = React.useContext(AppContext);
    if (!context) throw new Error('useAppContext must be used within a AppContextProvider');
    return context;
};

// COMPONENTE != HOOK != HOOK+CONTEXT