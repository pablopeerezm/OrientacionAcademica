import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useState } from "react";
import { CreateDialog, ProfileUserDialog, ProfileOrientadorDialog, CreateOrientadorDialog } from "../components/Dialog";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Orientador } from "../api/types";

export function AdminProfile() {

    const [admin, setAdmin] = useState<string>("admin@admin")

    const [dialogLogOutIsVisible, setDialogLogOutIsVisible] = useState<boolean>(false);
    const [dialogCreateIsVisible, setDialogCreateIsVisible] = useState<boolean>(false);
    // const [orientadores, setOrientadores] = useState<Orientador[]>([]);


    const columns: GridColDef[] = [
        {field:'orientador', headerName:'Orientador', flex:2},
        {field:'actions', headerName:'Acciones', width:180, renderCell: (params) => {
            const rowId = params.row.id;
            return (
              <Box sx={{width:'100%', display:'flex', gap:1}}>
                <Button variant="contained" color="error" onClick={() => handleDeleteButton(rowId)} >
                  Borrar 
                </Button>
              </Box>
            )
          }}
    ];
    const rows: GridRowsProp = [
        {id: 1, orientador: 'pepito@gmail.com'},
        {id: 2, orientador: 'juanito@gmail.com'}
        
    ];
    function handleEditButton(id: number){

    }
    function handleDeleteButton(id: number){
        
    }
    function handleProfile() {

    }
//     import React, { useEffect, useState } from 'react';
// import api from '../api/axios';
// import { Orientador } from '../api/types';

// const Orientadores: React.FC = () => {
   const [orientadores, setOrientadores] = useState<Orientador[]>([]);

//   useEffect(() => {
//     const fetchOrientadores = async () => {
//       try {
//         const response = await api.get<Orientador[]>('/admin/orientadores'); // Tipado de la respuesta
//         setOrientadores(response.data); // Actualiza el estado con los datos recibidos
//       } catch (error) {
//         console.error('Error al obtener orientadores:', error);
//       }
//     };

//     fetchOrientadores();
//   }, []);

//   return (
//     <div>
//       <h2>Lista de Orientadores</h2>
//       <ul>
//         {orientadores.map((orientador) => (
//           <li key={orientador._id}>{orientador.email}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Orientadores;

    //   const rows: GridRowsProp = React.useMemo(() => {
    //     return procedures.map((procedure: Procedure) => (
    //     {
    //       id:procedure.key,
    //       name: procedure.name,
    //       description: procedure.description
    //     })
    //   )}, [procedures])    
    return (
        <Box className="profilePage" >
            <Header/>
            <Button className="Admin" 
                    variant="contained" 
                    onClick={() => setDialogLogOutIsVisible(true)}
                    // onClick={handleProfile}
                    sx={{display:'flex', 
                        justifyContent:'flex-end', 
                        backgroundColor:'transparent',
                        boxShadow:'none',
                        width:'100%'
                        
                        }}>
                <Typography
                    variant="h6"
                    align="right"
                    sx={{backgroundColor:(theme) => theme.palette.warning.main,
                        borderRadius: '10px',
                        padding: '5px 5px',
                        color:'white'
                    }}
                
                    // sx={{
                    //     backgroundColor: 'darkblue',
                    //     color:'white',
                    //     borderRadius: '20px',
                    //     padding: '50px'
                    // }} 
                >

                    {localStorage.email}
                </Typography>
            </Button>
            <ProfileOrientadorDialog openDialog={dialogLogOutIsVisible} setOpenDialog={setDialogLogOutIsVisible} orientador={localStorage.email} />
            <br/>
            
            <Typography
                variant="h5"
                align="center"
                sx={{
                    backgroundColor: 'darkblue',
                    color:'white',
                    borderRadius: '20px',
                    padding: '50px'
                  }} 
            >
                Orientadores de {localStorage.email} 
            </Typography>
            <DataGrid
                columns={columns}
                rows={rows}
                autoHeight
                pagination
                // pageSizeOptions ={[5, 10]} 
                // page={5}
                // sx={{
                //     display: 'flex',
                //     justifyContent: 'center',
                //     alignItems: 'center',
                // }}

            />
            <CreateOrientadorDialog openDialog={dialogCreateIsVisible} setOpenDialog={setDialogCreateIsVisible} /* urlDialog={urlPost} clientId={clientId}*/  />
            <Button variant="contained" 
                    color="warning" 
                    onClick={() => setDialogCreateIsVisible(true)}
                    sx={{width:'100%'}}>
                Crear orientador
            </Button>
            <Footer/>

        </Box>
    )
}