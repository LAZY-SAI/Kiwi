import {UserDash} from "@/UserSide/UserDashboard.tsx";

import {Route,Routes} from 'react-router'

const UserRoute = ()=>{
    return(
        <Routes>
            <Route index element={<UserDash/>}/>

            </Routes>
    )
}
export default UserRoute