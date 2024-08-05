
import { Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Banner from 'src/components/Banner'
import { useProductCart } from 'src/hooks/useProdutCart'
import { Product } from 'src/types/Product'


const Homepage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useProductCart();

  const handleAddToCart = (product: Product) => {
    if (quantity <= 0) return;
    addToCart({ product, quantity });
  };
  useEffect(() => {
    const getAllProduct = async () => {
      try {
        const { data } = await axios.get("/products")
        setProducts(data)
      } catch (error) {
        console.log(error)
      }
    }
    getAllProduct()
  },[])
  return (
    <>
      <Banner />
      <Typography component="h1" fontSize={"26px"} fontWeight={"bold"} sx={{ margin: "10px", textAlign: "center" }}>Products new</Typography>
      <Stack direction={"row"} gap={1} sx={{ justifyContent: "center", flexWrap: "wrap", margin: "10px 0", padding: "10px 0", width: "100%", hover: "none" }}>
        {products.map((product: Product, index) => (
          <Card key={index} sx={{ maxWidth: 345, margin: "10px", padding: "6px", hover: "none", transform: "translateY(0)", transition: "all 0.3s ease-in-out", "&:hover": { transform: "translateY(-10px)" }, "&:hover img": { transform: "scale(1.1)" }, "&:hover .MuiCardContent-root": { transform: "translateY(0)" }, "&:hover .MuiCardActions-root": { transform: "translateY(0)" }, "&:hover .MuiTypography-root": { transform: "translateY(0)" }, "&:hover .MuiButton-root": { transform: "translateY(0)" } }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={product.image}
              sx={{ objectFit: "contain", height: "200px" }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.title}
              </Typography>
              <Typography gutterBottom variant="body1" component="div" color="red" fontWeight="bold">
                {product.price}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ minHeight: "50px" }}>
                {product.description}
              </Typography>
            </CardContent>
            <CardActions sx={{ width: "100%", justifyContent: "center", transform: "translateY(350%)", transition: "all 0.4s ease-in-out !important", "&:hover": { transform: "translateY(0)" } }}>
              <Button variant="contained" sx={{ bgcolor: "red", width: "50%" }} onClick={() => handleAddToCart(product)}>Add to cart</Button>
              {/* <Button variant="contained" sx={{ bgcolor: "red", width: "40%" }}>Learn More</Button> */}
              <Link to={`/product/${product._id}`} style={{ textDecoration: "none", color: "white" }}><Button variant="contained" sx={{  width: "120px" }}>View</Button></Link>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </>
  )
}

export default Homepage