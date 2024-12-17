import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { CreateDialog, ProfileUserDialog, ProfileOrientadorDialog } from "../components/Dialog";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import api from "../api/axios";

export function OrientadorProfile() {

    const [orientador, setOrientador] = useState<string>("example@example.com")

    const [dialogLogOutIsVisible, setDialogLogOutIsVisible] = useState<boolean>(false);
    const [dialogCreateIsVisible, setDialogCreateIsVisible] = useState<boolean>(false);
    const [citas, setCitas] = useState<any[]>([]);


    const columns: GridColDef[] = [
        {field:'alumno', headerName:'Alumno', flex:2},
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
    useEffect(() => {
        const fetchCitas = async () => {
            try {
                const response = await api.get(`/citas/${sessionStorage.email}`, {
                    headers: {
                        'Authorization' : `Bearer ${sessionStorage.jwt}`
                    }
                });
                setCitas(response.data);
                console.log(response.data)
            } catch (error) {
                console.log("Error al obtener citas", error)
            }
        };
        fetchCitas();
    }, [])
    const rows: GridRowsProp = citas.map((cita, index) => ({
        id: index + 1,
        alumno: cita.alumno_email,
        dia: cita.fecha,
        hora: cita.hora
    }))
    function handleEditButton(id: number){

    }
    const handleDeleteButton= async (id: number) => {
        try {
            const citaId = citas[id - 1]._id;
            alert(citaId)
            await api.delete(`/citas/${citaId}`);
            alert("Cita eliminada correctamente.");
        } catch (error) {
            console.error("Error al eliminar la cita:", error);
            alert("Error al eliminar la cita.");
        }
    }
    
    return (
        <Box className="profilePage" >
            <Header/>
            <Button className="Orientador" 
                    variant="contained" 
                    // color="warning" 
                    onClick={() => setDialogLogOutIsVisible(true)}
                    // onClick={handleProfile}
                    sx={{display:'flex', 
                        justifyContent:'flex-end', 
                        // width:'fit',
                        // align:'right',
                        // margin: 'left-auto',

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

                    {sessionStorage.email}
                </Typography>
            </Button>
            <ProfileOrientadorDialog openDialog={dialogLogOutIsVisible} setOpenDialog={setDialogLogOutIsVisible} orientador={sessionStorage.email} />
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
                Citas del orientador {sessionStorage.email}
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