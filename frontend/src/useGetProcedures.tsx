
import { Procedure } from "./interfaces/Procedure";
import { useAppContext } from "./components/AppContext";
import { useMutation, useQuery } from "react-query";
import { Box } from "@mui/material";
import React, { useEffect } from "react";

export const baseOptions = {
  method: 'POST',
  headers: {
    'accept' : 'application/json',
    'Content-Type' : 'application/json'
  },
}

// export interface ProcedurePostDto{
//   versionLock?: number;
//   active?: boolean;
//   createdAt?: string;
//   modifiedAt?: string;
//   modifiedBy?: number;
//   id?: number;
//   clientId: number;
//   name: string;
//   description: string;
// }

// export function useCreateProcedure(url: string, clientId: number) {
//   const {nameDialog, descriptionDialog} = useAppContext();
//   const procedure: ProcedurePostDto = {clientId: clientId, name: nameDialog, description: descriptionDialog}
//   const options = React.useMemo(() => {
//     return {
//       ...baseOptions,
//       body: JSON.stringify(procedure)
//     }
//   }, [nameDialog, descriptionDialog])

//   const getProcedures = async () => {
//     const response: Response = await fetch(url, options);
//     const data = await response.json();
//     return data;
//   }

//   return true;
// }

export function useGetProcedures(url: string, pageSize: number, page:number) {
  const {nameFilter, descriptionFilter, setProcedures, setFilasTotales} = useAppContext();
  const options = React.useMemo(() => {
    return {
      ...baseOptions,
      body: JSON.stringify({name: nameFilter,
      description: descriptionFilter})
    }
  }, [nameFilter, descriptionFilter])
  
  const getProcedures = async () => {
    const response: Response = await fetch(url, options);
    const data = await response.json();
    return data;
  }

  const {data, status} = useQuery(['procedures', pageSize, page, options], 
    getProcedures,
    {
      onSuccess: (data) => {
        if (data?.content) {
          const proceduresData = data.content.map((item: any) => ({
            key: item.id,
            name: item.name,
            description: item.description,
          }));
          setProcedures(proceduresData)
          setFilasTotales(data.content.length);
        }
      }
    }
  )

  return true;

  // if (status === 'loading') {
  //   return <Box>Buscando procedimientos...</Box>
  // }
  // if (status === 'error') {
  //   return <Box>Error</Box>
  // }

}

// export function useFetch(url: string) {
//     const {name, description, setProcedures, setFilasTotales} = useAppContext();
//     const options = React.useMemo(() => {
//         return {
//           ...baseOptions,
//           body: JSON.stringify({name: name,
//           description: description})
//         }
//     }, [name, description])
//     useEffect(() => {
//         fetch(url, options)
//           .then(response => response.json())
//           .then((data) => {
//             console.log(data);
//             const proceduresData: Procedure[] = data.content.map((item: any) => ({
//               key: item.id,
//               name: item.name,
//               description: item.description,
//           }));
//           setProcedures(proceduresData);
//           setFilasTotales(proceduresData.length)
//         });  
//     }, [url, options, setProcedures, setFilasTotales]);
//     return true;
// }


// , options, setProcedures
  //OPCION OPTIMA
  // const options = React.useMemo(() => {
  //   return {
  //     ...baseOptions,
  //     body: JSON.stringify({name: name,
  //     description: description})
  //   }
  // }, [name, description])
  
  // FUNCIONA DE CHIRIPA
  // const options =  {
  //     ...baseOptions,
  //     body: JSON.stringify({name: name,
  //       description: description})
  //   };

  // useEffect(() => {
  //   fetch(url, options)
  //   .then(response => response.json())
  //   .then((data) => {
  //     console.log(data);
  //     const proceduresData: Procedure[] = data.content.map((item: any) => ({
  //       key: item.id,
  //       name: item.name,
  //       description: item.description,
  //     }));
  //     setProcedures(proceduresData);
  //   });
      
  // }, [url, name, description]);

  // NO FUNCIONA
  // const options =  {
  //   ...baseOptions,
  //   body: JSON.stringify({name: name,
  //     description: description})
  // };

  // useEffect(() => {
  //   fetch(url, options)
  //   .then(response => response.json())
  //   .then((data) => {
  //     console.log(data);
  //     const proceduresData: Procedure[] = data.content.map((item: any) => ({
  //       key: item.id,
  //       name: item.name,
  //       description: item.description,
  //     }));
  //     setProcedures(proceduresData);
  //   });
    
  // }, [url, options]);

  // useEffect(() => {
  //   fetch(url, options)
  //   .then(response => response.json())
  //   .then((data) => {
  //     console.log(data);
  //     const proceduresData: Procedure[] = data.content.map((item: any) => ({
  //       key: item.id,
  //       name: item.name,
  //       description: item.description,
  //     }));
  //     setProcedures(proceduresData);
  //   });
    
  // }, [url, name, description]);
 