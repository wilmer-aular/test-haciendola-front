import { Button, Grid, TextField, Tooltip, Typography } from '@mui/material'
import { defaultValues, schema } from './util'

import Editor from '../../../core/components/editor/Editor';
import FormDialog from "../../../core/components/dialogs/FormDialog";
import { Icon } from "@iconify/react";
import apiConnector from '../../../services/api.service';
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useProductContent } from '../ProductsContext';
import { useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';

const ModalProduct = ({ product, color="white" }: any) => {
  const { get } = useProductContent();
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const {
      register,
      handleSubmit,
      reset,
      setValue,
      formState: { errors }
    } = useForm({
      defaultValues: product ?? defaultValues,
      mode: 'onBlur',
      resolver: yupResolver(schema)
    });

    const onSubmit = async (formData: any) => {
      try {
        formData.handle = formData.title.replace(/\s/g, "-");
        const promise = product?.id ? apiConnector.put(`/products/${product.id}`, formData) :
                                      apiConnector.post('/products', formData)
        setLoading(true);
        await promise
        get()        
        toast.success('Tarea realizada con exito')
        reset();
        setOpen(false)
      } catch (error) {
        toast.error('Ups, Ocurrio un error.')
      } finally{ 
        setLoading(false);
      }
    }

  return (
    <>
      <Tooltip title={`${product?.id ? 'Actualizar' : 'Crear'}  Producto`} arrow placement='top'>
        {
          product?.id ? 
            <Button 
                variant='contained'
                sx={{ color: 'white', mt: 0.5 }}
                onClick={() => setOpen(true)}
                size='small'
                color={'primary'}
                startIcon={<Icon icon='lucide:edit' />}
            >
           Editar
            </Button>
          : <Typography sx={{cursor: 'pointer'}} onClick={() => setOpen(true)} color={color} > Crear producto</Typography>
        }
      
      </Tooltip>
      <FormDialog 
          open={open} 
          onClose={() => setOpen(false)} 
          title={`${product?.id ? 'Actualizar' : 'Crear'}  Producto`}
          onSubmit={handleSubmit(onSubmit)}
          size='sm'
          loading={loading}
      >
        
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} xs={12}>
            <TextField
              {...register('title')}
              label='Titulo *'
              variant='outlined'
              size='small'
              fullWidth
              error={Boolean(errors.title)}
            />
          </Grid>
          <Grid item lg={6} sm={6} xs={6}>
            <TextField
              {...register('price')}
              label='Precio *'
              variant='outlined'
              size='small'
              fullWidth
              type='number'
              error={Boolean(errors.price)}
            />
          </Grid>
          <Grid item lg={6} sm={6} xs={6}>
            <TextField
              {...register('comparePrice')}
              label='Comparar precio *'
              variant='outlined'
              size='small'
              type='number'
              fullWidth
              error={Boolean(errors.comparePrice)}
            />
          </Grid>
          <Grid item lg={6} sm={6} xs={6}>
            <TextField
              {...register('grams')}
              label='Gramos *'
              variant='outlined'
              size='small'
              type='number'
              fullWidth
              error={Boolean(errors.grams)}
            />
          </Grid>
          <Grid item lg={6} sm={6} xs={6}>
            <TextField
              {...register('stock')}
              label='Stock *'
              variant='outlined'
              size='small'
              fullWidth
              type='number'
              error={Boolean(errors.stock)}
            />
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <TextField
              {...register('sku')}
              label='SKU *'
              variant='outlined'
              size='small'
              fullWidth
              type='number'
              error={Boolean(errors.sku)}
            />
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <TextField
              {...register('barcode')}
              label='Código de barras*'
              variant='outlined'
              size='small'
              type='number'
              fullWidth
              error={Boolean(errors.barcode)}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography> Descripción</Typography>
            <Editor setValue={setValue} name= 'description' defaultValue={product?.description}/>
          </Grid>
        </Grid>
      </FormDialog>
    </>
    );
}

export default ModalProduct;