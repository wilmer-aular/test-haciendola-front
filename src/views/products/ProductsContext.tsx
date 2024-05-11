import { ReactNode, createContext, useCallback, useContext, useState } from 'react'

import apiConnector from '../../services/api.service';

export type ProductType = {
      get: () => any
      loading: boolean,
      products: any[],
    };
  
  // ** Defaults
  const defaultProvider: ProductType = {
    get: () => Promise.resolve(),
    loading: false,
    products: [],
  }
  
  const ProductContext = createContext(defaultProvider)
  
  export function useProductContent() {
      return useContext(ProductContext);
    }
  
  type Props = { children: ReactNode };
  
  const ProductProvider = ({ children }: Props) => {
    const [loading, setLoading] = useState<any>(false);
    const [products, setProducts] = useState<any>([]);
    
    const get = useCallback(async() => {
      try{
        setLoading(true);
        const resolved: any = await apiConnector.get(`/products`)
        setProducts(resolved.data);;
        setLoading(false);
      } catch (error) {
        console.error(error);
      };
    }, [setLoading]);
  
    const values: any = {
      get,
      loading,
      products,
  };
  
    return <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  }
  
  export { ProductContext, ProductProvider }