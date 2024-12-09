import React, { useState} from 'react';
// import { useQuery } from 'react-query';
import './App.css';
// import { QueryClientProvider, QueryClient } from 'react-query';
import { Form } from './components/Form';
import {  ProfileUserDialog } from './components/Dialog';
import {ButtonProps} from './interfaces/Props';
import { useAppContext } from './components/AppContext';
import {  useGetProcedures } from './useGetProcedures';
import Container from "@mui/material/Container";
import Button from '@mui/material/Button';
import {DataGrid, GridRowsProp, GridColDef} from "@mui/x-data-grid";
import Box from '@mui/material/Box';
// import { Margin, Palette } from '@mui/icons-material';
import { useTheme } from '@mui/material';
import { Procedure } from './interfaces/Procedure';
import { baseOptions } from './useGetProcedures';
import { Profile } from './pages/UserProfile';
import {Header} from './components/Header';
import { Home } from './pages/Home';
import {Footer} from './components/Footer';
import { OrientadorProfile } from './pages/OrientadorProfile';
import { AdminProfile } from './pages/AdminProfile';

interface ProcedureEditDto{
  versionLock?: number;
  active?: boolean;
  createdAt?: string;
  modifiedAt?: string;
  modifiedBy?: number;
  id?: number;
  clientId: number;
  name: string;
  description?: string;
}
export const editBaseOptions = {
  method: 'PUT',
  headers: {
    'accept' : 'application/json',
    'Content-Type' : 'application/json'
  },
}
export const deleteOptions = {
  method: 'DELETE',
  headers: {
    'accept' : '*/*',
    // 'Content-Type' : 'application/json'
  },
}

export default function App() {

  const [formIsVisible, setFormIsVisible] = useState<boolean>(false);
  const [dialogCreateIsVisible, setDialogCreateIsVisible] = useState<boolean>(false);
  const [dialogEditIsVisible, setDialogEditIsVisible] = useState<boolean>(false);
  const [clientId, setClientId] = useState<number>(1)
  const [page, setPage] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(50)
  const [url, setUrl] = useState<string>(`http://192.168.0.30:8080/snc-mf-api/v1/clients/${clientId}/procedures/search?page=${page}&size=${pageSize}`) 
  const [urlPost, setUrlPost] = useState<string>(`http://192.168.0.30:8080/snc-mf-api/v1/clients/${clientId}/procedures`) 
  const [urlEdit, setUrlEdit] = useState<string>('')
  const [procedureId, setProcedureId] = useState<number>(0)
  const [postProc, setPostProc] = useState<boolean>(false)
  
  
  const {procedures, setProcedures, filasTotales} = useAppContext();

  const columns: GridColDef[] = [
    {field:'id', headerName:'Key'}, 
    {field:'name', headerName: 'Nombre'}, 
    {field:'description', headerName:'Descripcion'},
    {field:'actions', headerName:'Acciones', width:180, renderCell: (params) => {
      const rowId = params.row.id;
      return (
        <Box gap={1}>
          <Button variant="contained" color="warning" onClick={() => handleEditButton(rowId)}>
            Edit
          </Button>
          <Button variant="contained" color="error" onClick={() => handleDeleteButton(rowId)}>
            Delete
          </Button>
        </Box>
      )
    }}
  ];
  
  const rows: GridRowsProp = React.useMemo(() => {
    return procedures.map((procedure: Procedure) => (
    {
      id:procedure.key,
      name: procedure.name,
      description: procedure.description
    })
  )}, [procedures])
    
  function handleFormClick() {
    setFormIsVisible(!formIsVisible);
  }
  function handleDialogClick() {
    setDialogCreateIsVisible(!dialogCreateIsVisible);
  }

  function handleEditButton(id: number) {
    setUrlEdit(`http://192.168.0.30:8080/snc-mf-api/v1/clients/${clientId}/procedures/${id}`)
    // const urlEdit:string = (`http://192.168.0.30:8080/snc-mf-api/v1/clients/${clientId}/procedures/${id}`) 
    setDialogEditIsVisible(true)
    setProcedureId(id)
    console.log("LLegue")
    console.log(dialogEditIsVisible)
    // return (
    //   dialogEditIsVisible && (<EditProcedureDialog openDialog={dialogEditIsVisible} setOpenDialog={setDialogEditIsVisible} urlDialog={urlEdit} clientId={clientId} procId={id}/>)
    // );
    /**
    const urlEdit:string = (`http://192.168.0.30:8080/snc-mf-api/v1/clients/${clientId}/procedures/${id}`) 
    const procedure: ProcedureEditDto = {id: id, clientId: clientId, name: "hh" }
    const optionsEdit = {
      ...editBaseOptions,
      body: JSON.stringify(procedure)
    }
    await fetch(urlEdit, optionsEdit)
    */
  }

  async function handleDeleteButton(id: string) {
    const urlDelete:string = (`http://192.168.0.30:8080/snc-mf-api/v1/clients/${clientId}/procedures/${id}`) 
    
    await fetch(urlDelete, deleteOptions)

  }
  // function insertProcedure() {
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   useCreateProcedure(urlPost, clientId)
  // }
  // function createProcedure(id: number, name: string, description:string) {
  //   const newProcedure: Procedure = {key: id, name: name, description: description}
  //   return newProcedure;
  // }
  // function addProcedure(newProcedure: Procedure) {
  //   setProcedures([...procedures, newProcedure])
  // }

  // function handleDialog() {
  //   useCreateProcedure(urlPost, clientId)
  // }

  const ButtonPropsFilters: ButtonProps = {
    text: "Mostrar/Ocultar formulario",
    handler: handleFormClick
  }
  const ButtonPropsInsert: ButtonProps = {
    text: "Insertar procedimiento",
    handler: handleDialogClick
  }
  const theme = useTheme();

  // const ProcComponent = ({url, pageSize, page}: {url: string, pageSize: number, page: number }) => {
  //   useGetProcedures(url, pageSize, page);
  //   return(
  //     <Box>
  //       {/* Buscando procedimientos... */}
  //     </Box>
  //   );
  // }

  return (
    // <Container>
      <Box className="App" sx={{width:'100%'}}>    
        <Box>
          <Home/>
          {/* <Profile/> */}
          {/* <OrientadorProfile/> */}
          {/* <AdminProfile/> */}
        </Box>      
        {/* <Box>
          <Profile/>
        </Box> */}
        {/* <br/> */}
        {/* <Footer/> */}
      </Box>
    // </Container>
  );
}

