import { Card, CardContent, CardHeader, Typography, useTheme } from "@mui/material"

const CardCustom = ({title, subtitle, action, children}: any) => {
  const theme = useTheme();
 
  return <>
    <Card>
      <CardHeader 
      sx={{mx: 1, mt: 1}}
      title={<Typography fontWeight={500} sx={{fontSize: 18}}>
        {title}
      </Typography>} 
      subheader={<Typography sx={{fontSize: 14, color: theme.palette.grey[400]}}>
        {subtitle}
      </Typography>} 
      action={action}/>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  </>
}

export default CardCustom;
