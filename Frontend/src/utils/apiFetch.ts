const API_URL = import.meta.env.VITE_BACKEND_URI;

let isRefreshing = false;
let refreshPromise:Promise<boolean> | null = null;

async function refreshAccessToken():Promise<boolean>{
    if(isRefreshing && refreshPromise){
        return  refreshPromise;
    }

    isRefreshing = true;
    refreshPromise = fetch(`${API_URL}/refresh`,{
        method:"POST",
        credentials:"include"

    })

        .then((res) => res.ok)
        .finally(() => {
            isRefreshing = false;
            refreshPromise = null;
        });

    return refreshPromise;
}



//@ts-ignore
export async function apiFetch(url:string, options:RequestInit = {}):Promise<Response>{
    const fetchOptions:RequestInit = {
        ...options,
        credentials:"include"
    }
    let res = await fetch(url,fetchOptions);
    if(res.status === 401){
        const refreshed = await refreshAccessToken();
        if(refreshed){
            res = await fetch(url,fetchOptions);
        }


    }
    return res;
}
