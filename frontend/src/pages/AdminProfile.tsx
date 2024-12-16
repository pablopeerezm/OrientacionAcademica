import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useState } from "react";
import { CreateDialog, ProfileUserDialog, ProfileOrientadorDialog, CreateOrientadorDialog } from "../components/Dialog";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function AdminProfile() {

    const [admin, setAdmin] = useState<string>("admin@admin")

    const [dialogLogOutIsVisible, setDialogLogOutIsVisible] = useState<boolean>(false);
    const [dialogCreateIsVisible, setDialogCreateIsVisible] = useState<boolean>(false);


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

                    {admin}
                </Typography>
            </Button>
            <ProfileOrientadorDialog openDialog={dialogLogOutIsVisible} setOpenDialog={setDialogLogOutIsVisible} orientador={admin} />
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
                Orientadores de {admin} 
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