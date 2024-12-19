import { Box, Button } from "@mui/material";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { LoginDialog, SigninDialog } from "../components/Dialog";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import api from "../api/axios";

export function Home() {
    
    const navigate = useNavigate();
    const [dialogLoginIsVisible, setDialogLoginIsVisible] = useState<boolean>(false)
    const [dialogSigninIsVisible, setDialogSigninIsVisible] = useState<boolean>(false)
    
    const handleLogin = async (email:string, password: string) => {
        api
            .post("/auth/login", {email, password})
            .then((response) => {
                const data = response.data;
                if (response.status === 200) {
                sessionStorage.setItem("jwt", data.token)
                sessionStorage.setItem("role", data.role)
                sessionStorage.setItem("email", email)
                if (sessionStorage.role === 'admin') {
                    navigate('/admin-profile');  
                  } else if (sessionStorage.role === 'alumno') {
                    navigate('/user-profile');  
                  } else if (sessionStorage.role === 'orientador') {
                    navigate('/orientador-profile');
                  }
                }
            }).catch((error) => {
                if (error.response) {
                    console.error("Error en la respuesta:", error.response);
                    alert(`Error en la respuesta: ${error.response.data.error}`);
                  } else if (error.request) {
                    console.error("Error en la solicitud:", error.request);
                    alert('No se recibió respuesta del servidor');
                  } else {
                    console.error("Error desconocido:", error.message);
                    alert(`Error desconocido: ${error.message}`);
                  }
            })  
    }
    function handleSignin() {
        setDialogSigninIsVisible(true)
    }
    return (
        <Box sx={{display:'flex',
            flexDirection: 'column',
            justifyContent:'space-between',
            height: '80vh',
            width: '100%',
        }}>
            <Header/>
            <Box sx={{textAlign:'center'}}>
                Bienvenido a la página principal
                <br/>
                Por favor, regístrese o inicie sesión
            </Box>
            <Box sx={{ display:'flex',
                    gap:2,
                    width:'100%'
                    }}>
                <Button  
                    variant="contained" 
                    color="warning" 
                    onClick={() => setDialogLoginIsVisible(true)}
                    sx={{display:'flex', width:'50%'}}>
                    Iniciar sesion
                </Button>
                <LoginDialog open={dialogLoginIsVisible} onClose={() => setDialogLoginIsVisible(false)} onLogin={handleLogin} />

                <Button variant="contained" 
                    color="warning" 
                    onClick={handleSignin}
                    sx={{display:'flex', width:'50%'}}>
                    Registrarse
                </Button>
                <SigninDialog openDialog={dialogSigninIsVisible} setOpenDialog={setDialogSigninIsVisible} />
            </Box>   
            <Footer/>
        </Box>
    )
}