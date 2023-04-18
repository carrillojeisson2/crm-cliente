import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router';

const OBTENER_USUARIO = gql`
query obtenerUsuario {
    obtenerUsuario {
      id
      nombre
      apellido
    }
  }
`;

const Header = () => {

    const router = useRouter();

    // query apollo
    const { data, loading, error, client } = useQuery(OBTENER_USUARIO);



    if (loading) return null;

    if (!data) {
        localStorage.removeItem('token');
        client.clearStore();
        // return router.push('/login')
        router.push('/login')

    }

    // if (!localStorage.getItem('token')) {
    //     localStorage.removeItem('token');
    //     client.clearStore();
    //     // return router.push('/login')
    //     router.push('/login')
    // }



    if (loading) return null;

    // Si no hay informacion
    if (!data) {
        localStorage.removeItem('token');
        client.clearStore();
        return router.push('/login');
    }






    const cerrarSesion = () => {
        localStorage.removeItem('token');
        client.clearStore();
        router.push('/login');
    }

    const { nombre, apellido } = data.obtenerUsuario ?? {};

    return (
        <div className='flex  justify-between mb-6'>
            {/* <p className='mr-2'>Hola: {data.obtenerUsuario.nombre} </p> */}
            {/* {nombre ? (
                <p className='mr-2'>Hola: {nombre} {apellido} </p>
            ) : (<p>asd</p>)} */}
            {/* <p className='mr-2'>Hola: {apellido} </p> */}

            {
                data.obtenerUsuario ? (
                    <p>usuario: {nombre}  {apellido}</p>
                ) : (
                    <p>ss</p>
                )
            }


            <button
                onClick={() => cerrarSesion()}
                type='button'
                className='bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md'
            >
                Cerrar Sesión
            </button>
        </div>
    );
}

export default Header;