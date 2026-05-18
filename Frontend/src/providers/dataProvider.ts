import {DataProvider, BaseRecord, GetListResponse, GetListParams} from "@refinedev/core";
import {MOCK_ORDERS} from "@/providers/mockData.ts";


const API_URI = import.meta.env.VITE_BACKEND_URI
export const dataProvider: DataProvider = {

        getList: async <TData extends BaseRecord = BaseRecord>({resource}:
        GetListParams): Promise <GetListResponse<TData>> => {
            if (resource === 'orders')
            {
                return {data: MOCK_ORDERS as unknown as TData[],
                    total:MOCK_ORDERS.length}
            }
            return {
                data:[],
                total:0
            }
        },

    getOne: async () => {throw new Error ('this function is not present in mock')},
    create: async () => {throw new Error ('this function is not present in mock')},
    update: async () => {throw new Error ('this function is not present in mock')},
    deleteOne: async () => {throw new Error ('this function is not present in mock')},
    getApiUrl : () => `${API_URI}`


}