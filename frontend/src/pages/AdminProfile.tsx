import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { CreateOrientadorDialog, ProfileUserDialog } from "../components/Dialog";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Orientador } from "../api/types";
import api from "../api/axios";

export function AdminProfile() {

    const [orientadores, setOrientadores] = useState<Orientador[]>([]);
    const [dialogLogOutIsVisible, setDialogLogOutIsVisible] = useState<boolean>(false);
    const [dialogCreateIsVisible, setDialogCreateIsVisible] = useState<boolean>(false);

    useEffect(() => {
        const fetchOrientadores = async() => {
            try{
            const response = await api.get('/admin/orientadores')
            setOrientadores(response.data)
            } catch(error) {
                alert("Error al obtener orientadores")
            }
        }
        fetchOrientadores();
    }, [setOrientadores])

    const columns: GridColDef[] = [
        {field:'orientador', headerName:'Orientador', flex:2},
        {field:'actions', headerName:'Acciones', width:180, renderCell: (params) => {
            const email = params.row.orientador;
            return (
              <Box sx={{width:'100%', display:'flex', gap:1}}>
                <Button variant="contained" color="error" onClick={() => handleDeleteButton(email)} >
                  Borrar 
                </Button>
              </Box>
            )
          }}
    ];

    const rows: GridRowsProp = orientadores.map((orientador, index) => ({
        id: index + 1,
        orientador: orientador.email
    }));
    
    const handleDeleteButton = async (email: string) => {
        try {
            await api.delete(`/admin/orientadores/${email}`)
            setOrientadores(orientadores.filter(orientador => orientador.email !== email));

            alert("Orientador eliminado con exito")
        } catch (error) {
            console.error("Error al eliminar orientador", error)
            alert("No se ha podido eliminar el orientador")
        }
    }
  
    return (
        <Box className="profilePage" >
            <Header/>
            <Button className="Admin" 
                    variant="contained" 
                    onClick={() => setDialogLogOutIsVisible(true)}
                    sx={{display:'flex', 
                        justifyContent:'flex-end', 
                        backgroundColor:'transparent',
                        boxShadow:'none',
                        width:'100%' }}
            >
                <Typography
                    variant="h6"
                    align="right"
                    sx={{backgroundColor:(theme) => theme.palette.warning.main,
                        borderRadius: '10px',
                        padding: '5px 5px',
                        color:'white'
                    }}
                >
                    {sessionStorage.email}
                </Typography>
            </Button>
            <ProfileUserDialog openDialog={dialogLogOutIsVisible} setOpenDialog={setDialogLogOutIsVisible} user={sessionStorage.email} />
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
                Orientadores de {sessionStorage.email} 
            </Typography>
            <DataGrid
                columns={columns}
                rows={rows}
                autoHeight
                pagination
            />
            <CreateOrientadorDialog openDialog={dialogCreateIsVisible} setOpenDialog={setDialogCreateIsVisible} />
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