import { CrudFilter, CrudSort, DataProvider, HttpError, Pagination, ValidationErrors } from "@refinedev/core";
import { apiClient } from "./libs/axios/config";
import { AxiosError } from "axios";

export const dataProvider = (url: string): DataProvider => ({
  getOne: async ({resource, id}) => {
    const showUrl = `${url}/${resource}/${id}`;

    try {
      const response = await apiClient.get(showUrl);
  
      return {
          data: response.data,
      }
      
    }
    catch(err) {
      
      const errorsList = parseAxiosErrorsToList(err);
        
      const httpError: HttpError = {
        errors: {
          data: errorsList
        },
        message: "حدث خطأ",
        statusCode: 422,
      };
      
      console.log("httpError", httpError);

      return Promise.reject(httpError);
    }
  
  },

  create: async ({resource, variables}) => {

    console.log("variables", variables);

    const postUrl = `${url}/${resource}`;

    try {
      const response = await apiClient.post(postUrl, variables);
  
      return {
          data: response.data,
          total: 10
      }
      
    }
    catch(err) {
      
      const errorsList = parseAxiosErrorsToList(err);
        
      const httpError: HttpError = {
        errors: {
          data: errorsList
        },
        message: "حدث خطأ",
        statusCode: 422,
      };
      
      console.log("httpError", httpError);

      return Promise.reject(httpError);
    }

  },
  update: async ({resource, variables, id}) => {
    const updateUrl = `${url}/${resource}/${id}`;

    try {
      const response = await apiClient.patch(updateUrl, variables);
  
      return {
          data: response.data,
          total: 10
      }
      
    }
    catch(err) {
      
      const errorsList = parseAxiosErrorsToList(err);
        
      const httpError: HttpError = {
        errors: {
          data: errorsList
        },
        message: "حدث خطأ",
        statusCode: 422,
      };
      
      console.log("httpError", httpError);

      return Promise.reject(httpError);
    }
  },
  deleteOne: async ({resource, id}) => {
    const deleteUrl = `${url}/${resource}/${id}`;

    try {
      const response = await apiClient.delete(deleteUrl);
  
      return {
          data: response.data,
      }
      
    }
    catch(err) {
      
      const axiosError = err as AxiosError;

      const httpError: HttpError = {
        message: "حدث خطأ",
        statusCode: 422,
      };

      return Promise.reject(httpError);
    }
  },
  getList: async ({resource, filters, pagination, sorters}) => {

    console.log("sorters", sorters);
    
    // console.log("pagination", pagination);

    console.log("filters" ,filters);

    const filtersQuery = getFiltersQuery(filters);
    
    const paginationQuery = getPaginationQuery(pagination); 
    
    const sortersQuery = getSortersQuery(sorters);  

    console.log("sorters after", getSortersQuery(sorters))
    
    const queryQuestionMarkOrEmpty = getQueryQuestionMarkOrEmpty(filtersQuery, paginationQuery, sortersQuery);
  
    // console.log("filtersQuery", filtersQuery);
    // console.log("filtersPagination", paginationQuery);
    // console.log("filtersQuestion", queryQuestionMarkOrEmpty);

    const uri = `${url}/${resource}${queryQuestionMarkOrEmpty}${paginationQuery}${filtersQuery}${sortersQuery}`;

    console.log(uri)
    
    const response = await apiClient.get(uri);
    
    if (response.status < 200  || response.status > 299) {
      const error: HttpError = {
          message: "حدث خطأ",
          statusCode: 404,
      };
      return Promise.reject(error);
    }

    // console.log("response", response);
    
    const data = response.data.data ?? response.data; 
    // in case of pagination response
    //  response.data.data is the array
    // response.data data is the array  

    const total = response.data.total ?? data.length;
     // in case of pagination response
    //  response.data.total is the total in server not in sent to client.
    // data.length in case of response an array of items  

    return {
        data,
        total
    }
  },
  custom : async ({url, method, headers, payload, query }) => {
    console.log("url", url);
    if(method === 'get' || method == 'delete')
    {
      const response = await apiClient[method](`${url}`);
      return {
        data: response.data,
        total: 10
      }
    }
    // if(method == 'post' || method === 'patch')
    // {
    //   const response = await apiClient[method](`${url}`, payload);
    //   return {
    //     data: response.data,
    //     total: 10
    //   }
    // }
    
    const response = await apiClient[method](`${url}`);
    return {
      data: response.data,
      total: 10
    }

  },
  getApiUrl: () => url,
});

const getFiltersQuery = (filters: CrudFilter[] | undefined) => {
    let query = '';
    filters?.forEach((item, index) => {
    
    if(item.value)
    {
      let lastChar = item.field[item.field.length - 1];
      if(Array.isArray(item.value))
      {
        item.value.forEach((listItem, index) => {
          query += '&' + item.field + "=" + listItem;
        });
      }
      else {
        query += '&' + item.field + "=" + item.value;
      }
    }

    })
    return query;
}
const getPaginationQuery = (pagination: Pagination | undefined) => {
  
  let query = '';
  if(pagination && pagination.current! > 1)
  {
    const pageNumber = pagination?.current;
    const pageSize = pagination.pageSize;

    query += `&page=${pageNumber}`;
    query += `&perPage=${pageSize}`;
  }
  return query;
}

const getSortersQuery = (sorters: CrudSort[] | undefined) => {

  if(!sorters || sorters?.length === 0)
  {
    return "";
  }
  
  const query = sorters?.reduce(((prev,curr, index) => {
    if(curr.order === "asc")
    {
      return prev + "&sort=" + curr.field + " asc";
    }
    if(curr.order)
    {
      return prev + "&sort=" + curr.field + " desc";
    }
  }), "")

  return query;
}


const getQueryQuestionMarkOrEmpty = (...values: string[]) =>
{
  if(values.length === 0)
    {
        return "";
    }
  return values.some(query => query.length > 0) ? "?" : "";
}

const  parseAxiosErrorsToList = (err: unknown) => {
  const axiosError = err as AxiosError;

  console.log("error", (axiosError.response?.data as any).errors);

  const x:ValidationErrors = {}

  const errorsObject = ((axiosError.response?.data) as any).errors as Record<string, any>
  
  const errorsList = Object.values(errorsObject).flat() as string[];

  return errorsList;
    
}