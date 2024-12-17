
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { Box, Dialog, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select } from "@mui/material"

import { baseOptions } from "../useGetProcedures"
import * as yup from 'yup'
import { useFormik } from "formik"
import { editBaseOptions } from "../App"
import { Email } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

interface CreateDialogProps {
  openDialog: boolean; 
  setOpenDialog: (arg: boolean) => void;
  // urlDialog: string;
  // clientId: number;
  // insertProcedure: () => void;
}
interface LoginDialogProps {
  openDialog: boolean; 
  setOpenDialog: (arg: boolean) => void;
  // urlDialog: string;
  // clientId: number;
  // insertProcedure: () => void;
}
interface LoginProps {
  open: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
}
interface SigninDialogProps {
  openDialog: boolean; 
  setOpenDialog: (arg: boolean) => void;
  // urlDialog: string;
  // clientId: number;
  // insertProcedure: () => void;
}
interface ProfileUserDialogProps {
  openDialog: boolean; 
  setOpenDialog: (arg: boolean) => void;
  user: string;
  // insertProcedure: () => void;
}
interface ProfileOrientadorDialogProps {
  openDialog: boolean; 
  setOpenDialog: (arg: boolean) => void;
  orientador: string;
  // insertProcedure: () => void;
}
interface ProfileAdminDialogProps {
  openDialog: boolean; 
  setOpenDialog: (arg: boolean) => void;
  admin: string;
  // insertProcedure: () => void;
}

export function ProfileUserDialog({openDialog, setOpenDialog, user}:ProfileUserDialogProps) {
  const navigate = useNavigate()
  function handleLogOut() {
    // FALTA CODIGO CERRAR SESION
    navigate('/')
    sessionStorage.clear();
    setOpenDialog(false)
  }
  const handleClose = () => {
    setOpenDialog(false)
  }
  return(
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle align="center"> Perfil</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Hola, {user}
            <br/>
          </DialogContentText>
          <Button variant="contained" 
                  color="warning" 
                  type="submit" 
                  onClick={handleLogOut}
                  style={{display:'flex', width:'100%'}}>
            Cerrar sesion
          </Button>
        </DialogContent>
      </Dialog>
  );
}
export function ProfileOrientadorDialog({openDialog, setOpenDialog, orientador}:ProfileOrientadorDialogProps) {
  const navigate = useNavigate()
  function handleLogOut() {
    // FALTA CODIGO CERRAR SESION
    navigate('/')
    sessionStorage.clear();
    setOpenDialog(false)

  }
  const handleClose = () => {
    setOpenDialog(false)
  }

  return(
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle align="center"> Perfil</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Hola, {orientador}
            <br/>
            <br/>
          </DialogContentText>
          <Button variant="contained" 
                  color="warning" 
                  type="submit" 
                  onClick={handleLogOut}
                  style={{display:'flex', width:'100%'}}>
            Cerrar sesion
          </Button>
        </DialogContent>
      </Dialog>
  );
}
export function ProfileAdminDialog({openDialog, setOpenDialog, admin}:ProfileAdminDialogProps) {
  const navigate = useNavigate()
  function handleLogOut() {
    // FALTA CODIGO CERRAR SESION
    navigate('/')
    sessionStorage.clear();
    setOpenDialog(false)

  }
  const handleClose = () => {
    setOpenDialog(false)
  }

  return(
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle align="center"> Perfil</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Hola, {admin}
            <br/>
            <br/>
          </DialogContentText>
          <Button variant="contained" 
                  color="warning" 
                  type="submit" 
                  onClick={handleLogOut}
                  style={{display:'flex', width:'100%'}}>
            Cerrar sesion
          </Button>
        </DialogContent>
      </Dialog>
  );
}
// export function LoginDialog({openDialog, setOpenDialog}:LoginDialogProps) {
export function LoginDialog({open, onClose, onLogin}:LoginProps) {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  // const handleClose = () => {
  //   setOpenDialog(false)
  // }
  const handleLogin = () => {
    onLogin(email, password);
  }
  const validationSchema = yup.object({
    email: yup.string().email('Ingrese un email válido').required('El nombre de usuario(email) es obligatorio'),
    password: yup.string().required('La contraseña es obligatoria')
              .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  })
  const formik = useFormik({
    initialValues: {email: '', password: ''},
    validationSchema:validationSchema,
    onSubmit: async (values, {resetForm}) => {
      try {
        // alert(values.email + values.password)
        await onLogin(values.email, values.password);
        resetForm();
        onClose();
      } catch (error) {
        alert('Error en el login')
        console.error("Error en el login", error)
      }
      // alert(JSON.stringify(values, null, 2));
      // resetForm();
      // setOpenDialog(false);
      // alert(JSON.stringify(values, null, 2));

        // const procedure: ProcedurePostDto = {clientId: clientId, name: formik.values.name, description: formik.values.description}

        // const options = {
        //   ...baseOptions,
        //   body: JSON.stringify(procedure)
        // }
        // fetch(urlDialog, options)
        // resetForm()
        // setOpenDialog(false)
    },
  });
    return(
      <Dialog open={open} onClose={onClose}>
        <DialogTitle> Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, ingresa tu email y contraseña para continuar
          </DialogContentText>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="dense"
              id="password"
              name="password"
              label="Contraseña"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Box sx={{display:'flex', justifyContent:'space-between', mt:2}}>
              <Button variant="contained" 
                      color="warning" 
                      type="submit"
              >
                Iniciar sesión
              </Button>
              <Button variant="contained" 
                      color="warning" 
                      onClick={onClose}
              >
                Cancelar
              </Button>
            </Box>
          </form> 
        </DialogContent>
      </Dialog>
    );
}
export function SigninDialog({openDialog, setOpenDialog}:LoginDialogProps) {
  
  const handleClose = () => {
    setOpenDialog(false)
  }
  const validationSchema = yup.object({
    email: yup.string().email('Ingrese un email válido').required('El nombre de usuario(email) es obligatorio'),
    password: yup.string().required('La contraseña es obligatoria')
              .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  })
  const formik = useFormik({
    initialValues: {email: '', password: ''},
    validationSchema:validationSchema,
    onSubmit: async (values, {resetForm}) => {
      try {
        const {email, password} = values;
        // const response = await api.post('/auth/register', {
        const response = await api.post('/auth/register', {
          email,
          password,
          role: 'alumno'
        });
        alert('Registro de alumno completado con éxito')
        resetForm();
        setOpenDialog(false)
      } catch(error) {
        alert('Error en el registro')
      }
      // alert(JSON.stringify(values, null, 2));
      // resetForm();
      // setOpenDialog(false);
      // alert(JSON.stringify(values, null, 2));

        // const procedure: ProcedurePostDto = {clientId: clientId, name: formik.values.name, description: formik.values.description}

        // const options = {
        //   ...baseOptions,
        //   body: JSON.stringify(procedure)
        // }
        // fetch(urlDialog, options)
        // resetForm()
        // setOpenDialog(false)
    },
  });
    return(
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle> Registro</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, ingresa tu email y crea una contraseña
          </DialogContentText>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="dense"
              id="password"
              name="password"
              label="Contraseña"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Box sx={{display:'flex', justifyContent:'space-between', mt:2}}>
              <Button variant="contained" 
                      color="warning" 
                      type="submit"
              >
                Confirmar datos
              </Button>
              <Button variant="contained" 
                      color="warning" 
                      onClick={handleClose}
              >
                Cancelar
              </Button>
            </Box>
          </form> 
        </DialogContent>
      </Dialog>
    );
}
export function CreateDialog({openDialog, setOpenDialog}:CreateDialogProps) {
  const [orientadores, setOrientadores] = useState<string[]>([]);
  const horasDisponibles = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'];
  
  useEffect(() => {
    const fetchOrientadores = async () => {
      try {
        const response = await api.get('admin/orientadores2');
        const emails = response.data.map((orientador: {email: string}) => orientador.email)
        setOrientadores(emails)
      } catch(error) {
        alert("Error al obtener orientadores para dar la cita")
      } 
    };
    fetchOrientadores();
  }, []);

  const handleClose = () => {
    setOpenDialog(false)
  }
  const validationSchema = yup.object({
    orientador: yup.string().required('Seleccionar orientador es obligatorio'),
    dia: yup.string().required('Seleccionar un día es obligatorio'),
    hora: yup.string().required('Seleccionar una hora es obligatorio'),
  })
  const formik = useFormik({
    initialValues: {orientador: '', dia: '', hora: ''},
    validationSchema:validationSchema,
    onSubmit: async (values, {resetForm}) => {
      try {
        const cita = {alumno_email: sessionStorage.email, orientador_email: values.orientador, 
                      fecha: values.dia, hora: values.hora}
        alert(`${sessionStorage.email} ${values.orientador} ${values.dia} ${values.hora}`)
                      await api.post('/citas/', cita, {
          headers: {
            'Authorization': `Bearer ${sessionStorage.jwt}`
          }
        });
        alert('Cita creada correctamente')
        resetForm()
        setOpenDialog(false)

      } catch (error) {
        alert('Error al crear la cita')
        
      }
          
    },
  });
  return(
    <Dialog open={openDialog} onClose={handleClose}>
      <DialogTitle> Procedimiento</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Rellene los siguientes campos para concertar una cita
        </DialogContentText>
        <form onSubmit={formik.handleSubmit}>
          <FormControl fullWidth margin="dense" error={formik.touched.orientador && Boolean(formik.errors.orientador)}>
            <InputLabel>Orientador</InputLabel>
              <Select
                id="orientador"
                name="orientador"
                value={formik.values.orientador}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Orientador"
              >
                {orientadores.map((email, index) => (
                  <MenuItem key={index} value={email}>
                    {email}
                  </MenuItem>
                ))}
              </Select>
                {formik.touched.orientador && formik.errors.orientador && (
                  <Box color="error.main" mt={1}>{formik.errors.orientador}</Box>
                )}
              </FormControl>
              <TextField
                margin="dense"
                id="dia"
                name="dia"
                label="Día"
                type="date"
                value={formik.values.dia}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                error={formik.touched.dia && Boolean(formik.errors.dia)}
                helperText={formik.touched.dia && formik.errors.dia}
              />
              <FormControl fullWidth margin="dense" error={formik.touched.hora && Boolean(formik.errors.hora)}>
                <InputLabel>Hora</InputLabel>
                <Select
                  id="hora"
                  name="hora"
                  value={formik.values.hora}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Hora"
                >
                  {horasDisponibles.map((hora, index) => (
                    <MenuItem key={index} value={hora}>
                      {hora}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.hora && formik.errors.hora && (
                  <Box color="error.main" mt={1}>{formik.errors.hora}</Box>
                )}
              </FormControl>
                <Button variant="contained" color="warning" type="submit">Guardar</Button>
                <Button variant="contained" color="warning" onClick={handleClose}>Cancelar</Button>
              </form> 
            </DialogContent>
          </Dialog>
      );
}
export function CreateOrientadorDialog({openDialog, setOpenDialog}:CreateDialogProps) {
  const handleClose = () => {
    setOpenDialog(false)
  }
  const validationSchema = yup.object({
    email: yup.string().email('Ingrese un email válido').required('El email del orientador es obligatorio'),
    password: yup.string().required('La contraseña es obligatoria')
              .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  })
  const formik = useFormik({
    initialValues: {email: '', password: ''},
    validationSchema:validationSchema,
    onSubmit: async (values, {resetForm}) => {
      try {
        const {email, password} = values;
        // const response = await api.post('/auth/register', {
        const response = await api.post('/auth/register', {
          email,
          password,
          role: 'orientador'
        });
        alert('Registro de orientador completado con éxito')
        resetForm();
        setOpenDialog(false)
      } catch(error) {
        alert('Error en el registro del orientador')
      }
    },
  });
  return(
    <Dialog open={openDialog} onClose={handleClose}>
      <DialogTitle> Procedimiento</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Rellene los siguientes campos para crear un orientador
        </DialogContentText>
        <form onSubmit={formik.handleSubmit}>
              <TextField
                margin="dense"
                id="email"
                name="email"
                label="Email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                margin="dense"
                id="password"
                name="password"
                label="Contraseña"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button variant="contained" color="warning" sx={{marginRight:'3px'}} type="submit">Guardar</Button>
              <Button variant="contained" color="warning" onClick={handleClose}>Cancelar</Button>
            </form> 
          </DialogContent>
        </Dialog>
      );
}

