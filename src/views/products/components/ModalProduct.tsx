import { Button, Grid, TextField, Tooltip } from '@mui/material'
import { defaultValues, schema } from './util'

import FormDialog from "../../../core/components/dialogs/FormDialog";
import { Icon } from "@iconify/react";
import apiConnector from '../../../services/api.service';
import toast from 'react-hot-toast'
import { useAuthContent } from "../../../core/layout/AuthContext";
import { useForm } from 'react-hook-form'
import { useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';

const ModalProduct = () => {
  const { user, setUser } = useAuthContent();
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors }
    } = useForm({
      defaultValues: user ? {
        name: user.name, 
        lastName: user.lastName, 
        phone: user.phone, 
        newPassword: '', 
        confirmPassword: ''
      } 
      : defaultValues,
      mode: 'onBlur',
      resolver: yupResolver(schema)
    });

    const onSubmit = async (formData: any) => {
      try {
        setLoading(true);
        await apiConnector.put(`/staff/${user.id}/staffApp`, formData);

        setUser({ ...user, 
          name: formData.name,
          lastName: formData.lastName,
          phone: formData.phone
        })
        
        toast.success('Data updated successfully')
        reset();
        setLoading(false);
        setOpen(false)
      } catch (error) {
        toast.error('Ups, An error occurred.')
      }
    }

  return (
    <>
      <Tooltip title='Actualizar Producto' arrow placement='top'>
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
      </Tooltip>
      <FormDialog 
          open={open} 
          onClose={() => setOpen(false)} 
          title={'Actualizar Producto'}
          onSubmit={handleSubmit(onSubmit)}
          size='xs'
          loading={loading}
      >
        
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              {...register('name')}
              label='Firt Name*'
              variant='outlined'
              size='small'
              fullWidth
              error={Boolean(errors.name)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register('lastName')}
              label='Last Name*'
              variant='outlined'
              size='small'
              fullWidth
              error={Boolean(errors.lastName)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register('phone')}
              label='Phone'
              variant='outlined'
              size='small'
              fullWidth
              error={Boolean(errors.phone)}
            />
          </Grid>
        </Grid>
      </FormDialog>
    </>
    );
}

export default ModalProduct;