import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import FallbackSpinner from './FallbackSpinner';
import apiConnector from '../../../src/services/api.service';
import { useRouter } from 'next/router';

const defaultUser = {
  id: '',
  email: '',
  fullName: '',
}

export interface IUser {
  fullName: string;
  id: string;
  email: string;
}

interface ValueTypes {
  user: IUser;
  setUser: any;
  loading: boolean;
  setLoading: any;
  login: any;
  logout: any;
  register: any;
} 
const defaultValues: ValueTypes = {
  user: defaultUser,
  setUser: undefined,
  loading: true,
  setLoading: undefined,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
}

const AuthContext = createContext(defaultValues);


export function useAuthContent() {
  return useContext(AuthContext);
}

export const AuthConsumer = AuthContext.Consumer;

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();


  const login = async (data: any) => {
    const response = await  apiConnector.post('/auth/login', data);  
    window.localStorage.setItem('accessToken', response.accessToken)
    const returnUrl = router.query.returnUrl?.toString()

    setUser({ ...response })
    window.localStorage.setItem('userData', JSON.stringify(response));
    window.localStorage.setItem('type', JSON.stringify(response.type));

    const redirectURL: string = returnUrl && returnUrl !== '/' ? returnUrl : '/'

    window.location.href = redirectURL;
  }

  const logout = () => {
    router.push('/login');
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem('accessToken');
    setTimeout(() => setUser(null), 2000);
  }

  const initAuth = useCallback(async() => {
    const stored = window.localStorage.getItem('userData');

    
    setLoading(false);
    if(stored) {
        setUser(JSON.parse(stored));
    } else {
      if(!router.pathname.includes('registrarme')) {
        await router.replace('/login/');
      }
    }
  }, []);
  
  const register = async(data: any) => {
    await  apiConnector.post('/auth/register', data);  
    await router.replace('/login');
  }

  useEffect(() => {initAuth()}, [initAuth]);

  const values = {
    user, setUser,
    loading, setLoading,
    login, logout, register,
  };

  return <AuthContext.Provider value={values}>
    {
      loading ? <FallbackSpinner /> : children
    }
  </AuthContext.Provider>
}
export { AuthContext, AuthProvider }