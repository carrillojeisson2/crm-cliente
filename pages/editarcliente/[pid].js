import React from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { useQuery, gql } from '@apollo/client'
import { Formik } from 'formik'


const OBTENER_CLIENTE = gql`
query ObtenerCliente($id: ID!) {
    obtenerCliente(id: $id) {
      nombre
      apellido
      email
      telefono
      empresa

    }
  }
`

const EditarCliente = () => {

    const router = useRouter();
    const { query: { pid } } = router;
    console.log(pid)


    // consultar para obtener el cliente
    const { data, loading, error } = useQuery(OBTENER_CLIENTE, {
        variables: {
            id: pid
        }
    })

    // console.log(data)
    // console.log(loading)
    // console.log(error)


    if (loading) return "Cargando..."




    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Editar Cliente</h1>



            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>

                    <Formik>

                        {props => {
                            console.log(props)

                            return (




                                <form
                                    className='bg-white shadow-md px-8 pt-6 pb-8 mb-4'
                                    onSubmit={props.handleSubmit}
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        // value={formik.values.nombre}
                                        />
                                    </div>

                                    {props.touched.nombre && props.errors.nombre ? (
                                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                            <p className='font-bold'>Error</p>
                                            <p>{props.errors.nombre}</p>
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        // value={formik.values.apellido}
                                        />
                                    </div>

                                    {props.touched.apellido && props.errors.apellido ? (
                                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                            <p className='font-bold'>Error</p>
                                            <p>{props.errors.apellido}</p>
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        // value={formik.values.empresa}
                                        />
                                    </div>

                                    {/* {formik.touched.empresa && formik.errors.empresa ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                <p className='font-bold'>Error</p>
                                <p>{formik.errors.empresa}</p>
                            </div>
                        ) : null} */}


                                    <div className='mb-4'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                                            Email
                                        </label>

                                        <input
                                            className='bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id="email"
                                            type="email"
                                            placeholder='Email Cliente'
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        // value={formik.values.email}
                                        />
                                    </div>

                                    {/* {formik.touched.email && formik.errors.email ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                <p className='font-bold'>Error</p>
                                <p>{formik.errors.email}</p>
                            </div>
                        ) : null} */}

                                    <div className='mb-4'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='telefono'>
                                            Telefono
                                        </label>

                                        <input
                                            className='bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id="telefono"
                                            type="tel"
                                            placeholder='Telefono Cliente'
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        // value={formik.values.telefono}
                                        />
                                    </div>



                                    <input
                                        type='submit'
                                        className='bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900'
                                        value="Registrar Cliente"
                                    />




                                </form>

                            )
                        }}

                    </Formik>

                </div>

            </div>


        </Layout>
    );
}

export default EditarCliente;