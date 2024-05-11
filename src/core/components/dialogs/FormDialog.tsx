import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

import { Icon } from '@iconify/react'

const FormDialog = ({open, onClose, title, children, onSubmit, loading=false, size='sm', titleAction="Guardar" }: any) => {
  
  return (
  <Dialog 
    open={open}
    onClose={onClose}
    aria-labelledby="form-dialog-title"
    fullWidth
    maxWidth={size}
    transitionDuration={500}
    PaperProps={{
      style: {
        transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: open ? 1 : 0,
        borderRadius: 8,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
      }
    }}
  >
      <DialogTitle sx={{backgroundColor: 'primary.main'}}>
        <Typography fontWeight={600} fontSize={20} color='#fff' sx={{my: 2}}>{title}</Typography>
      </DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={onClose} color="error">Cancelar</Button>
          <Button 
            variant="contained" 
            color="primary" 
            sx={{color: '#fff'}}
            onClick={onSubmit}
            startIcon={loading ? <Icon icon='eos-icons:loading' /> : <></>}
            disabled={loading}
          >
            { titleAction }
          </Button>
        </DialogActions>
      </form>
  </Dialog>
  );
}

export default FormDialog;
