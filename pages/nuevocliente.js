import React, { useState } from 'react'
import Layout from '../components/Layout';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';

const NUEVO_CLIENTE = gql`
    mutation nuevoCliente($input: ClienteInput) {
        nuevoCliente(input: $input) {
            id
            nombre
            apellido
            empresa
            email
            telefono
        }
    }
`;


const OBTENER_CLIENTES_USUARIO = gql`
query obtenerClientesVendedor {
  obtenerClientesVendedor {
      id
      nombre
      apellido
      empresa
      email
  }
}
`;


const NuevoCliente = () => {

    const [mensaje, setMensaje] = useState(null);



    const router = useRouter();

    const [nuevoCliente] = useMutation(NUEVO_CLIENTE, {
        update(cache, { data: { nuevoCliente } }) {
            // Obtener el objeto del cache que deseamos actualizar
            const { obtenerClientesVendedor } = cache.readQuery({ query: OBTENER_CLIENTES_USUARIO });

            // Reescribimos el cache (el cache nunca de debe modificar )
            cache.writeQuery({
                query: OBTENER_CLIENTES_USUARIO,
                data: {
                    obtenerClientesVendedor: [...obtenerClientesVendedor, nuevoCliente]
                }
            })
        }
    })


    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            empresa: '',
            email: '',
            telefono: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                .required('El nombre es requerido'),
            apellido: Yup.string()
                .required('El apellido es requerido'),
            empresa: Yup.string()
                .required('La empresa es requerida'),
            email: Yup.string()
                .email('El email no es valido')
                .required('El apellido es requerido'),

        }),
        onSubmit: async valores => {
            // console.log(valores)
            const { nombre, apellido, empresa, email, telefono } = valores;

            try {
                const { data } = await nuevoCliente({
                    variables: {
                        input: {
                            nombre,
                            apellido,
                            empresa,
                            email,
                            telefono
                        }
                    }
                })
                console.log(data.nuevoCliente)
                setMensaje('Creado');

                setTimeout(() => {
                    setMensaje(null)
                    router.push('/');
                }, 2000);
            } catch (error) {
                console.log(error)
                setMensaje(error.message.replace('GraphQL error: ', ''));

                setTimeout(() => {
                    setMensaje(null)
                }, 3000);

            }
        }

    })

    const monstrarMensaje = () => {
        return (
            <div className='bg-white text-black py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
                <p>{mensaje}</p>
            </div>
        )
    }


    return (
        <Layout>

            {mensaje && monstrarMensaje()}

            <h1 className="text-2xl text-gray-800 font-light">NuevoCliente</h1>

            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <form
                        className='bg-white shadow-md px-8 pt-6 pb-8 mb-4'
                        onSubmit={formik.handleSubmit}
                    >


                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nombre'>
                                Nombre
                            </label>

                            <input
                                className='bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id="nombre"
                                type="text"
                                placeholder='Nombre Cliente'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.nombre}
                            />
                        </div>

                        {formik.touched.nombre && formik.errors.nombre ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                <p className='font-bold'>Error</p>
                                <p>{formik.errors.nombre}</p>
                            </div>
                        ) : null}

                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='apellido'>
                                Apellido
                            </label>

                            <input
                                className='bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id="apellido"
                                type="text"
                                placeholder='Apellido Cliente'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.apellido}
                            />
                        </div>

                        {formik.touched.apellido && formik.errors.apellido ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                <p className='font-bold'>Error</p>
                                <p>{formik.errors.apellido}</p>
                            </div>
                        ) : null}



                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='empresa'>
                                Empresa
                            </label>

                            <input
                                className='bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id="empresa"
                                type="text"
                                placeholder='Nombre Empresa Cliente'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.empresa}
                            />
                        </div>

                        {formik.touched.empresa && formik.errors.empresa ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                <p className='font-bold'>Error</p>
                                <p>{formik.errors.empresa}</p>
                            </div>
                        ) : null}


                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                                Email
                            </label>

                            <input
                                className='bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id="email"
                                type="email"
                                placeholder='Email Cliente'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                        </div>

                        {formik.touched.email && formik.errors.email ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                <p className='font-bold'>Error</p>
                                <p>{formik.errors.email}</p>
                            </div>
                        ) : null}

                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='telefono'>
                                Telefono
                            </label>

                            <input
                                className='bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id="telefono"
                                type="tel"
                                placeholder='Telefono Cliente'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.telefono}
                            />
                        </div>



                        <input
                            type='submit'
                            className='bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900'
                            value="Registrar Cliente"
                        />




                    </form>
                </div>

            </div>
        </Layout>
    )
}

export default NuevoCliente;