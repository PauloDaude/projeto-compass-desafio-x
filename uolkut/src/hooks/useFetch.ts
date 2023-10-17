import { useState, useEffect } from 'react';

// Define os métodos HTTP suportados
type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT';

// Define a configuração para requisições HTTP
interface IHttpConfig {
  method: HttpMethod;
  headers: {
    'Content-type': string;
  };
  body?: string;
}

// Define a estrutura do resultado de uma requisição
interface IFetchResult<D> {
  data: D | null; // D é um tipo genérico que será especificado ao usar o hook
  httpConfig: (data: any, method: HttpMethod) => void; // Função para configurar a requisição HTTP
  loading: boolean; // Indica se a requisição está em andamento
  error: string | null; // Mensagem de erro, se houver
}

export const useFetch = <D>(url: string): IFetchResult<D> => {
  const [data, setData] = useState<D | null>(null);
  const [config, setConfig] = useState<IHttpConfig | null>(null);
  const [method, setMethod] = useState<HttpMethod | null>(null);
  const [callFetch, setCallFetch] = useState<D | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [itemId, setItemId] = useState<number | null>(null);

  // Função para configurar a requisição HTTP com dados e método
  const httpConfig = (data: any, method: HttpMethod) => {
    if (method === 'POST') {
      setConfig({
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      setMethod(method);
    } else if (method === 'DELETE') {
      setConfig({
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      });
      setMethod(method);
      setItemId(data);
    }
  };

  // Efeito para buscar dados da URL
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        const json: D = await res.json();
        setData(json);
      } catch (error: any) {
        console.log(error.message);
        setError('Houve algum erro ao carregar os dados');
      }
      setLoading(false);
    };
    fetchData();
  }, [url, callFetch]);

  // Efeito para realizar requisições HTTP (POST e DELETE)
  useEffect(() => {
    async function httpRequest() {
      let json: D | null = null;

      if (method === 'POST') {
        if (config) {
          const fetchOption: [string, IHttpConfig] = [url, config];
          const res = await fetch(...fetchOption);
          json = await res.json();
        }
      } else if (method === 'DELETE') {
        if (config) {
          const deleteUrl = `${url}/${itemId}`;
          const res = await fetch(deleteUrl, config);
          json = await res.json();
        }
      }
      setCallFetch(json);
    }
    httpRequest();
  }, [config, method, url, itemId]);

  // Retorna os dados, função de configuração, status de carregamento e erro
  return { data, httpConfig, loading, error };
};
