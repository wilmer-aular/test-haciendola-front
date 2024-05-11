import Container from '@mui/material/Container';
import ProductsView from '../views/products/ProductsView';

function Home() {
  
  return (
    <Container maxWidth="lg">
      <ProductsView />
    </Container>
  );
}

export default Home;
