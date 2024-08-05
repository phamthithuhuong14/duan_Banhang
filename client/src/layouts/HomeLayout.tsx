import { Box } from '@mui/material'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header'
import { useCart } from 'src/context/cart'
import { useProductCart } from 'src/hooks/useProdutCart'

type Props = {}

const HomeLayout = (props: Props) => {
    // const { loading } = useLoading();
    const { getCartUser } = useProductCart();
  
    useEffect(() => {
      getCartUser();
    }, []);
  return (
    <>
        <Box>
            <Header/>
            <Outlet />
            <Footer/>
        </Box>
    </>
  )
}

export default HomeLayout