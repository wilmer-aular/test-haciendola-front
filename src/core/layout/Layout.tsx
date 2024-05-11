import { Box } from "@mui/material";
import Navigation from "./components/Navigation";

const Layout = ({children}: any) => {
  
  return (<>
    <Box>
      <Box  sx={
      { 
        backgroundImage: `url('https://www.palmerstonmoving.ca/wp-content/uploads/2020/07/routes.jpg')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize:'cover',
        backgroundPosition: 'center top',
        height: {lg: 300, xs: 140},
        backgroundColor: 'dimgrey',
        backgroundBlendMode: 'multiply'
      }
      }>
        {/* Header */}
        <Navigation />
      </Box>
      <Box sx={{position: 'relative', top: '-50px'}}>
        {children}
      </Box>
    </Box>
  </>);
}

export default Layout;