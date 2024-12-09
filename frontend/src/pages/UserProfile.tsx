import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useState } from "react";
import { CreateDialog, ProfileUserDialog } from "../components/Dialog";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function Profile() {

    const [user, setUser] = useState<string>("example@example.com")

    const [dialogLogOutIsVisible, setDialogLogOutIsVisible] = useState<boolean>(false);
    const [dialogCreateIsVisible, setDialogCreateIsVisible] = useState<boolean>(false);


    const columns: GridColDef[] = [
        {field:'orientador', headerName:'Orientador', flex:2},
        {field:'dia', headerName:'Dia', flex:2},
        {field:'hora', headerName:'Hora', flex:2},
        {field:'actions', headerName:'Acciones', width:180, renderCell: (params) => {
            const rowId = params.row.id;
            return (
              <Box sx={{display:'flex', gap:1}}>
                <Button variant="contained" color="warning" onClick={() => handleEditButton(rowId)} sx={{width:'40%'}}>
                  Editar
                </Button >
                <Button variant="contained" color="error" onClick={() => handleDeleteButton(rowId)} sx={{width:'40%'}}>
                  Borrar
                </Button>
              </Box>
            )
          }}
    ];
    const rows: GridRowsProp = [
        { id: 1, orientador: 'Juan Pérez', dia: 'Lunes', hora: '09:00' },
        { id: 2, orientador: 'Ana López', dia: 'Martes', hora: '10:30' },
        { id: 3, orientador: 'Carlos García', dia: 'Miércoles', hora: '14:00' },
    ];
    function handleEditButton(id: number){

    }
    function handleDeleteButton(id: number){
        
    }

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
            <Button className="Usuario" 
                    variant="contained" 
                    // color="warning" 
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
                >
                    {user}
                </Typography>
            </Button>
            <ProfileUserDialog openDialog={dialogLogOutIsVisible} setOpenDialog={setDialogLogOutIsVisible} user={user} />
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
                Citas del usuario {user}
            </Typography>
            <DataGrid
                columns={columns}
                rows={rows}
                autoHeight
                pagination
            />
            <CreateDialog openDialog={dialogCreateIsVisible} setOpenDialog={setDialogCreateIsVisible} /* urlDialog={urlPost} clientId={clientId}*/  />
            <Button variant="contained" 
                    color="warning" 
                    onClick={() => setDialogCreateIsVisible(true)}
                    sx={{width:'100%'}}>
                Crear cita
            </Button>
            <Footer/>
        </Box>
    )
}