import Inventory from "@/pages/inventory/Inventory.tsx";
import {Route, Routes} from "react-router";
import StockForm from "@/popup/stock.tsx";
import Report from "@/pages/Report/Report.tsx";
const InventoryRoutes = () => {
    return(
        <Routes>
            <Route index element={<Inventory/>}/>


            <Route path="edit" element={<StockForm/>}/>
            <Route path={"report"} element={<Report/>}/>
        </Routes>

    )
}

export default InventoryRoutes