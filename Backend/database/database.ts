import {Pool} from 'pg'
// @ts-ignore
import dotenv from 'dotenv'

dotenv.config()

export const UserPool = new Pool(
    {
        user:process.env.DB_USER,
        host:process.env.DB_HOST,
        database:process.env.DB_DATABASE,
        password:process.env.DB_PASSWORD,
        port:Number(process.env.DB_PORT),
        max:20,
        idleTimeoutMillis:30000,
        connectionTimeoutMillis:2000
    }

)


export const poolBrand = new Pool(
    {
            user:process.env.DB_USER,
            host:process.env.DB_HOST,
            database:process.env.DB_PRODUCTS,
            password:process.env.DB_PASSWORD,
            port:Number(process.env.DB_PORT),
            max:20,
            idleTimeoutMillis:30000,
            connectionTimeoutMillis:2000
    }

)