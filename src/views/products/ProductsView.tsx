import { Alert, Box, Grid, Typography } from "@mui/material"

import CircularProgress from '@mui/material/CircularProgress';
import ProductCard from "./components/ProductCard";
import { motion } from 'framer-motion';
import { useEffect } from "react";
import { useProductContent } from "./ProductsContext";

const ProductsView = () => {
const { get, loading, products } = useProductContent();

  useEffect(() => {
      get()
  }, [get]);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {
        loading ? 
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 10 }}>
            <CircularProgress />
        </Box> 
        :
        <>
        {
          products.length ? 
          <Grid container spacing={3}>
            {
              products.map((product: any, index: number) => (
                  <Grid key={index} item lg={4} sm={6} xs={12}>
                    <ProductCard product={product}/> 
                  </Grid>
              ))
            }
          
          </Grid> 
          :
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 10 }}>
              <Alert severity="warning" sx={{ py: 3, mb: 2, '& .MuiAlert-message': { p: 0 } }}>
                <Typography variant='body2' sx={{ color: 'warning.main' }}>
                  ¡Ops! Aun no tiene productos, puede crear uno desde el menu.
                </Typography>
              </Alert>
          </Box>       
        } 
        </>
      }
  </motion.div>
  );
}

export default ProductsView;
