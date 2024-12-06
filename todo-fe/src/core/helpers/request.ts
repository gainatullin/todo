import axios, { AxiosRequestConfig, Method } from 'axios';

axios.defaults.timeout = Number(process.env.NEXT_PUBLIC_API_TIMEOUT_MS) || 3000;

interface IRequest {
  method?: Method;
  url: string;
  data?: any;
  contentType?: string;
  baseURL?: string;
}

export const request = ({
  method = 'POST',
  url = '',
  data = null,
  contentType = 'application/json',
  baseURL = 'http://localhost:3001/api/',
}: IRequest): Promise<any> => {
  const options: AxiosRequestConfig = {
    method,
    baseURL,
    url,
    headers: { 'Content-Type': contentType },
  };

  if (data && (method === 'GET' || method === "DELETE")) {
    options.params = data;
  } else if (data) {
    options.data = data;
  }

  return new Promise((resolve, reject) => {
    axios(options)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};
