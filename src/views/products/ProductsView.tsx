import { useCallback, useEffect, useState } from "react";

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from "@mui/material"
import ProductCard from "./components/ProductCard";
import apiConnector from "../../services/api.service";
import { motion } from 'framer-motion';
import { useAuthContent } from "../../core/layout/AuthContext";
import { useTheme } from '@mui/material/styles';

const ProductsView = () => {
  const {user} = useAuthContent();
  const theme = useTheme();
  const [manifest, setManifest] = useState<any>({});
  const [loading, setLoading] = useState<any>(false);
  const [products, setProducts] = useState<any>(null);
  
  
  const get = useCallback(async() => {
    setLoading(true);
    const  products: any = await apiConnector.get(`/manifest/pendingByStaff/${user.id}`)
    setProducts(products);;
    setLoading(false);

  }, [setLoading]);

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
        <Grid container spacing={3}>
          <Grid item lg={4} sm={6} xs={12}>
            <ProductCard products={products}/> 
          </Grid>
        </Grid> 
      }
  </motion.div>
  );
}

export default ProductsView;
