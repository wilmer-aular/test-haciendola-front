import * as yup from 'yup'

import { Alert, Box, Button, Typography } from "@mui/material";

import { Icon } from '@iconify/react';
import InputPassword from '../login/InputPassword';
import { LinkStyled } from '../login/AuthIllustrationWrapper';
import TextField from '@mui/material/TextField';
import toast from "react-hot-toast";
import { useAuthContent } from "../../core/layout/AuthContext";
import { useForm } from 'react-hook-form'
import { useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  fullName:  yup.string().min(5).required('El nombre completo es requerido'),
  email: yup.string().email().required('Email es requirido'),
  password: yup
  .string()
  .required('La contraseña es obligatoria')
  .min(8, 'La contraseña debe tener al menos 5 caracteres')
  .max(10, 'La contraseña debe tener maxímo 10 caracteres'),
confirmPassword: yup
  .string()
  .when('password', {
    is: (val: string) => val && val.length > 0,
    then: (schema) => schema.oneOf([yup.ref('password')], 'Las contraseñas deben coincidir'),
  }),
})

const RegisterForm = () => {
  const auth = useAuthContent();
  const [loading, setLoading] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = async(data: any) => {
    try {
      setLoading(true);
      await auth.register({...data});
      toast.success('Registro exitoso, ahora puedes iniciar sesión')
    } catch (error) {
      toast.error('Opp!, Ocurrio un error')
    } finally {
      setLoading(false);
    }
  }

  return <>
  {showErrorMessage ? 
    <Alert severity="warning" sx={{ py: 3, mb: 2, '& .MuiAlert-message': { p: 0 } }}>
      <Typography variant='body2' sx={{ color: 'warning.main' }}>
        ¡Ops! Ocurrio un error, comuniquese con el equipo de soporte.
      </Typography>
    </Alert>
    : <></>}
  <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('fullName')}
        label='Nombre Completo'
        variant='outlined'
        size='small'
        fullWidth
        sx={{ mb: 2 }}
        error={Boolean(errors.fullName)}
        placeholder='Wilmer Aular'
        helperText={<>{errors.fullName?.message}</>}
      />
      <TextField
        {...register('email')}
        label='Email'
        variant='outlined'
        size='small'
        fullWidth
        sx={{ mb: 2 }}
        error={Boolean(errors.email)}
        placeholder='john.doe@gmail.com'
        helperText={<>{errors.email?.message}</>}
      />
      <Box sx={{ mb: 2 }}>
        <InputPassword register={register} errors={errors}/>
      </Box>
      <Box sx={{ mb: 2 }}>
        <InputPassword
          register={register}
          errors={errors}
          name='confirmPassword'
          label='Confirmar contraseña'
        />
      </Box>
      <Button fullWidth type='submit' variant='contained' startIcon={loading ? <Icon icon="eos-icons:loading" /> : <></>} >
        <Typography color={'white'} fontWeight={600}>Registrar</Typography>
      </Button>

      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Typography sx={{ color: 'text.secondary', mr: 2 }}>¿Ya tienes una cuenta?</Typography>
        <Typography component={LinkStyled} href='/login'>
          Inicia sesión
        </Typography>
      </Box>
    </form>
  </>
}

export default RegisterForm;
