import { Alert, Avatar, Box, Card, CardContent, Divider, Grid, Typography, useTheme } from "@mui/material";

import DeleteProduct from "./DeleteProduct";
import { Icon } from "@iconify/react";
import ModalProduct from "./ModalProduct";
import ReactHtmlParser from 'html-react-parser';
import { getInitials } from '../../../core/utils/get-initials';
import { handlerName } from "../../../core/utils/util";

const ValueBox = ({ value, icon, field, color }: any) => {
  return ( 
  <Box  sx={{display: 'flex', mr: 5}}>
    <Icon icon={icon} style={{marginTop: '1px', marginRight: 10}} fontSize={20} color={color}/>
    {field}: <Typography sx={{ ml: 1 }} color='grey'>{value}</Typography>
  </Box> 
  ); 
}

const StaffCard = ({ product }: any) => {
  const theme = useTheme();

  return(
    <Card sx={{mb: 3}}>
      <CardContent>
        <Grid container spacing={2} >
          <Grid item lg={3} sm={2} xs={2.5}>
            <Avatar
              alt={'Producto'}
              src={product?.title}
              sx={{ width: {lg: 80, xs: 60}, height: {lg: 80, xs: 60}, mb: 2, fontSize: {lg: '2.5rem', xs: '2rem'} }}
            >
              {
                getInitials(handlerName(product.title))
              }
            </Avatar>    
          </Grid>
          <Grid item  lg={9} sm={3} xs={6}>
            <Typography fontSize={16} variant='h6' >
              {product.title}
            </Typography>
            <ValueBox field="Precio" value={product.price} icon="mdi:dollar" color={theme.palette.success.main}/>
            <ValueBox field="Stock" value={product.stock} icon="ant-design:stock-outlined" color={theme.palette.warning.main}/>
            <ValueBox field="Gramos" value={product.grams} icon="icon-park-outline:weight" color={theme.palette.error.main}/>
          </Grid>
        </Grid>
        <Divider sx={{my: 1}}/>
        {
          product.description ? 
          <Box sx={{ overflow: 'auto', maxHeight: 100 }}> {ReactHtmlParser(product.description)}</Box>
          :
          <Box sx={{ height: 100 }}>
             <Alert severity="warning" sx={{ py: 3, mb: 2, '& .MuiAlert-message': { p: 0 } }}>
              <Typography variant='body2' sx={{ color: 'warning.main' }}>
                Agrega una descripciòn a tu producto.
              </Typography>
            </Alert>
          </Box>
         
        }
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', mt: 2}}>
            <ModalProduct product={product}/>
            <DeleteProduct product={product}/>
        </Box>
      </CardContent>
    </Card>
  );
}

export default StaffCard;

