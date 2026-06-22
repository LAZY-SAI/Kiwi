import {DataProvider, BaseRecord, GetListResponse, GetListParams} from "@refinedev/core";
import {MOCK_ORDERS} from "@/providers/mockData.ts";
import {apiFetch} from "@/utils/apiFetch.ts";

const API_URI = import.meta.env.VITE_BACKEND_URI
export const dataProvider: DataProvider = {

        getList: async <TData extends BaseRecord = BaseRecord>({resource}:
        GetListParams): Promise <GetListResponse<TData>> => {

           if(resource === "orders"){
               const res = await apiFetch(`${API_URI}/api/orders`,{
                   method:"GET",
                   headers:{
                       "Content-type":"application/json",
                   },
                   credentials:"include"
               })
               if(!res.ok){
                   throw new Error("error in fetching data")

               }

               const data = await res.json()
               console.log(data)
               return {
                   data:data.data as TData[],
                   total:data.total
               }

           }
           return {data:[], total:0}
        },

    getOne: async () => {throw new Error ('this function is not present in mock')},
    create: async () => {throw new Error ('this function is not present in mock')},
    update: async () => {throw new Error ('this function is not present in mock')},
    deleteOne: async () => {throw new Error ('this function is not present in mock')},
    getApiUrl : () => `${API_URI}`


}


// export const brandData:DataProvider={
//     getList:async ()<Tdata extends BaseRecord = BaseRecord> => {
//
//     }
// }