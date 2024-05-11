import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import FallbackSpinner from './FallbackSpinner';
import apiConnector from '../../../src/services/api.service';
import { useRouter } from 'next/router';

const defaultUser = {
  name: '',
  lastName: '',
  id: '',
  email: '',
  phone: '',
  photoUrl: '',
  type: ''
}

export interface IUser {
  name: string;
  lastName: string;
  id: string;
  email: string;
  phone: string;
  photoUrl: string;
  type: string;
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


  const login = async (params: any) => {
   
    const response = await  apiConnector.post('/auth/staff', params);  
   
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
    window.localStorage.removeItem('');
    setTimeout(() => setUser(null), 2000);
  }

  const initAuth = useCallback(async() => {
    const storedToken = window.localStorage.getItem('accessToken');
    if(storedToken) {
      setLoading(true);
      try {
        const response: any = await apiConnector.get('/auth/me/staff');
        setUser({ ...response });
        setLoading(false)
      } catch (error) {
        localStorage.removeItem('userData')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('accessToken');
        setUser(null)
        setLoading(false)
        if (!router.pathname.includes('login')) {
          await router.replace('/login/')
        }
        setLoading(false);
      }
    } else {
      if(!router.pathname.includes('registrarme')) {
        await router.replace('/login/');
      }
      setLoading(false);
    }
    
  }, []);
  const register = async() => {

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