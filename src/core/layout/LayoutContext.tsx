import { createContext, useState, useContext } from 'react';
import Layout from './Layout';

interface BreadcrumbsTypes {
  pageName: string;
  links?: [{name: string, path: string}]
}
interface ValueTypes {
  showMenu: boolean;
  setShowMenu: any;
  showCar: boolean;
  setShowCar: any;
  breadcrumbs: BreadcrumbsTypes | undefined;
  setBreadcrumbs: any;
} 
const defaultValues: ValueTypes = {
  showMenu: false,
  setShowMenu: undefined,
  showCar: false,
  setShowCar: undefined,
  breadcrumbs: undefined,
  setBreadcrumbs: undefined,
}

const LayoutContext = createContext(defaultValues);


export function useLayoutContent() {
  return useContext(LayoutContext);
}

export const LayoutConsumer = LayoutContext.Consumer;

const LayoutProvider = ({ children }: any) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showCar, setShowCar] = useState<boolean>(false);
  const [breadcrumbs, setBreadcrumbs] = useState<any>();

  const values = {
    showMenu, setShowMenu,
    showCar, setShowCar,
    breadcrumbs, setBreadcrumbs,
  };

  return <LayoutContext.Provider value={values}>
    {children}
  </LayoutContext.Provider>
}
export { LayoutContext, LayoutProvider }