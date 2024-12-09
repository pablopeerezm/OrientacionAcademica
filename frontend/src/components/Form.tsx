import { useState } from "react"
import { Formik } from "formik"

import { useAppContext } from "./AppContext"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

// import { Margin, Palette } from '@mui/icons-material';
import { useTheme } from '@mui/material';

export function Form() {
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState("")

    const {setNameFilter, setDescriptionFilter} = useAppContext(); 

    const theme = useTheme();


    function handleSaveClick() {
      setNameFilter(name)
      setDescriptionFilter(description)
    }
    function handleCleanClick() {
        setNameFilter("")
        setDescriptionFilter("")
        setName("")
        setDescription("")
    }
  
    return(
      <Formik 
        initialValues={{nombre: '', description: ''}}
        onSubmit={(valores) => {
          console.log("Enviado")
          console.log(valores)
        }}
      >
        {( {values, handleSubmit, handleChange, handleBlur} ) => (
          <form className='Formulario' onSubmit={handleSubmit} 
          style={{backgroundColor: theme.palette.primary.main, borderRadius:'20px'}}>
            {/* {console.log(props)} */}
            <br/>
            {/* old */}
            <TextField variant="standard" label="Introduzca nombre" value={name} 
            color="warning" onChange={(event : React.ChangeEvent<HTMLInputElement>) => {setName(event.target.value)}} />
            {/* new  */}
            {/* <TextField 
              type="text" 
              id="nombre" 
              name={"Nombre"} 
              placeholder="Introduzca nombre" 
              value={values.nombre}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="standard" color="warning" />
            <br/>
            {/* old       */}
            
            <TextField variant="standard" label="Introduzca descripcion" value={description} 
            color="warning" onChange={(event : React.ChangeEvent<HTMLInputElement>) => {setDescription(event.target.value)}} />
            {/* new  */}
            {/* <TextField 
              type="text" 
              id="descripcion" 
              name={"Descripcion"} 
              placeholder="Introduzca descripcion" 
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="standard" color="warning" /> */}
            <br/>
            <br/>
            {/* new  */}
            {/* <Button type="submit" variant="contained" color="success" style={{marginRight:'10px'}}>Guardar</Button> */}
            {/* old */}
            <Button variant="contained" color="success" onClick={handleSaveClick} style={{marginRight:'10px'}}>Guardar</Button>
            <Button variant="contained" color="success" onClick={handleCleanClick}>Limpiar</Button>
          </form>
        )}
        
      </Formik>
      
    );
  }