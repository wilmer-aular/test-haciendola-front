import axios from 'axios';

const repository = axios.create({
  baseURL: 'http://localhost:3002/api',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': '12345',
  },
});
if (typeof window !== 'undefined') {
  // Perform localStorage action
  const token = localStorage.getItem('accessToken');
  const tokenHeader = token ? `Bearer ${token}`
    : null;
  if (token) {
    repository.defaults.headers.common['Authorization'] = tokenHeader;
  }
}

repository.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    console.error(error);

return Promise.reject(error);
  }
);

repository.interceptors.response.use(
  function (response) {

    if (response.data.status === 403 || response.data.status === 401) {
      throw new Error('Error al iniciar sesion');
    }

    return response;
  },
  function (error) {
    if (error.response?.status === 401 || error.response?.status === 403 || (error.response?.data && error.response.data?.message === 'Unauthenticated')) {
      const currentURL = window.location.href;
      if (!currentURL.includes('/login') && !currentURL.includes('/register')) {
         window.open('http://localhost:3000/login', '_self')
      }
      throw Error('Error al iniciar sesion');
    } else if (error.response?.data) {
      throw new Error(error.response.data.message);
    }

    throw error;
  }
);
const getHeaders = () => {
  const headers: any = {};
  const token = localStorage.getItem("token");
  if(token) {
      const tokenHeader = token ? `Bearer ${token}` : null;
      headers['Authorization'] = tokenHeader;
  }

  return headers;
}

const apiConnector = {
    get: async <T>(path: string, params = {}) => await repository.get<T>(path, { params }).then(({data})=>data),
    post: async (path: string, body: any) => await repository.post(path, body).then(({data})=>data),
    put: async (path: string, body: any) => await repository.put(path, body).then(({data})=>data),
    remove: async (path: string, params = {}) => await  repository.delete(path, { params }).then(({data})=>data),
    sendFile: async (path: string, body: any) => {
      const headers = { "Content-Type": "multipart/form-data", ...getHeaders()};

      return await repository
        .post(path, body, {
          headers,
        }).then(({data})=>data);
    },
  };

export default apiConnector;
