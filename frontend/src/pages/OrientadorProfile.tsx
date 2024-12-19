import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { ProfileUserDialog, EditCitaDialog, CreateCitaOrientador } from "../components/Dialog";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import api from "../api/axios";

export function OrientadorProfile() {

    const [dialogLogOutIsVisible, setDialogLogOutIsVisible] = useState<boolean>(false);
    const [dialogCreateIsVisible, setDialogCreateIsVisible] = useState<boolean>(false);
    const [citas, setCitas] = useState<any[]>([]);
    const [dialogEditIsVisible, setDialogEditIsVisible] = useState<boolean>(false);
    const [selectedCita, setSelectedCita] = useState<any>(null);

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
        const citaToEdit = citas[id - 1];
        setSelectedCita(citaToEdit)
        setDialogEditIsVisible(true)
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
    const handleSaveEdit = async (updatedCita: { fecha: string; hora: string }) => {
        try {
            const citaId = selectedCita._id;
            await api.put(`/citas/${citaId}`, updatedCita, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.jwt}`,
                },
            });
            const updatedCitas = citas.map((cita) =>
                cita._id === citaId ? { ...cita, ...updatedCita } : cita
            );
            setCitas(updatedCitas);
            alert('Cita actualizada correctamente.');
        } catch (error) {
            console.error('Error al actualizar la cita:', error);
            alert('Error al actualizar la cita.');
        }
    };
    
    return (
        <Box className="profilePage" >
            <Header/>
            <Button className="Orientador" 
                    variant="contained" 
                    onClick={() => setDialogLogOutIsVisible(true)}
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
                Citas del orientador {sessionStorage.email}
            </Typography>
            <DataGrid
                columns={columns}
                rows={rows}
                autoHeight
                pagination
            />
            <CreateCitaOrientador openDialog={dialogCreateIsVisible} setOpenDialog={setDialogCreateIsVisible} /* urlDialog={urlPost} clientId={clientId}*/  />
            <EditCitaDialog open={dialogEditIsVisible} handleClose={() => setDialogEditIsVisible(false)} cita={selectedCita} onSave={handleSaveEdit} />
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