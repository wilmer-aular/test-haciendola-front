import { Alert, Avatar, Box, Card, CardContent, Divider, Grid, Typography, useTheme } from "@mui/material";
import { useMemo, useState } from "react";

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
  const [showTitle, setShowTitle] = useState<Boolean>(false)

  const title = useMemo(() => {

    if(product.title.length > 32 && !showTitle) {
      return product.title.slice(0, 32)
    }
    return product.title;
  }, [product, showTitle])

  return(
    <Card>
      <CardContent>
        <Grid container spacing={2} >
          <Grid item xs={12}>
            <Box sx={{ display: 'flex' }}>
                <Typography fontSize={16} variant='h6' > {title} {title.length === 32 ? '...' : ''} </Typography>
       
                  { 
                    title.length === 32 ? <Icon onClick={() => setShowTitle(true)} icon={'mdi:eye-outline'} style={{ marginLeft: 5, cursor: 'pointer' }} color={theme.palette.success.main}/>
                    : title.length > 32 ? <Icon onClick={() => setShowTitle(false)} icon={'mdi:eye-off-outline'} style={{ marginLeft: 5, cursor: 'pointer' }} color={theme.palette.error.main}/> : <></>
                  }
            </Box>
          </Grid>
          <Grid item lg={4}>
            {/* Aqui deberia ir la imagen del producto */}
            <Avatar
              alt={handlerName(product.title)}
              src={product?.title}
              sx={{ width: 80, height: 80, fontSize: '2.5rem' }}
            >
              {
                getInitials(handlerName(product.title))
              }
            </Avatar>    
          </Grid>
          <Grid item  lg={8}>
            <ValueBox field="Precio" value={product.price} icon="mdi:dollar" color={theme.palette.success.main}/>
            <ValueBox field="Stock" value={product.stock} icon="ant-design:stock-outlined" color={theme.palette.warning.main}/>
            <ValueBox field="Gramos" value={product.grams} icon="icon-park-outline:weight" color={theme.palette.error.main}/>
          </Grid>
        </Grid>
        <Divider sx={{my: 1}}/>
        {
          product.description ? 
          <Box sx={{ overflow: 'auto', maxHeight: 100, height: 100 }}> {ReactHtmlParser(product.description)}</Box>
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

