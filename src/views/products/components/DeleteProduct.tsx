import { IconButton, Typography, useTheme } from '@mui/material';

import ConfirmDeleteDialog from "../../../core/components/dialogs/ConfirmDeleteDialog";
import { Icon } from '@iconify/react';
import Tooltip from '@mui/material/Tooltip'
import apiConnector from '../../../services/api.service';
import toast from "react-hot-toast";
import { useState } from "react";

const DeleteProduct = ({row, refresh }: any) => {
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handlerShow = (e: any) => {
    e.stopPropagation();
    setOpen(true)
  };

  const onClose = () => setOpen(false);
  
  const onDelete = async() => {
    try {
      setLoading(true)
      await apiConnector.remove(`/templates/${row?.id}`);
      setLoading(false)
      setOpen(false);
      toast.success('Se eliminó el producto con éxito.')
      refresh();
    } catch (error) {
      toast.error('Ups! Ocurrió un error.')
    }
  }

  return (
    <>
        <Tooltip title={'Eliminar producto'} placement='top' arrow> 
            <IconButton onClick={handlerShow}>
                <Icon icon='tabler:trash' style={{ color: theme.palette.error.main }} />
            </IconButton>
        </Tooltip>
        <ConfirmDeleteDialog 
            open={open} 
            onClose={onClose} 
            title={`Eliminar el producto ${row?.name}`}
            titleAction="Eliminar"
            action={onDelete}
            loading={loading}
        >
        <Typography fontSize={14} fontWeight={100} sx={{mt: 3}}>
            ¿Está seguro que desea eliminar el producto <strong>{row?.name}</strong>?
        </Typography>
        </ConfirmDeleteDialog>

    </>
    
  )
}

export default DeleteProduct;
