import { Inter } from 'next/font/google'
import Layout from '../components/Layout'


// const inter = Inter({ subsets: ['latin'] })

const Productos = () => {
    return (
        <div>
            <Layout>
                <h1 className='text-2xl text-gray-800 font-light'>Productos</h1>

            </Layout>
        </div>
    )
}

export default Productos;