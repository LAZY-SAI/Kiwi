import React, {useEffect, useState} from 'react';
import {
    Card,
    CardHeader,
    CardContent
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Plus,
    Search,
    Filter,
    AlertCircle,
    Package,
    RefreshCcw,
    MoveLeft
} from "lucide-react";
import {useNavigate} from "react-router-dom";

const Popup = ({ isOpen }: { isOpen: boolean}) => {
    const navigate = useNavigate()


    if (!isOpen) return null;
    return (

        <div className="absolute mt-1 w-32 bg-slate-900 border border-slate-700 text-white p-1 rounded-md shadow-xl z-100 flex flex-col">
            <button
                onClick={()=>navigate('edit')}
                className="flex items-center gap-2 hover:bg-slate-800 p-2 text-xs rounded transition-colors text-left">
                Edit
            </button>
            <button className="flex items-center gap-2 hover:bg-slate-800 p-2 text-xs rounded transition-colors text-left">
                Add
            </button>
            <div className="h-1px bg-slate-700 my-1" />
            <button className="flex items-center gap-2 hover:bg-rose-900/50 text-rose-400 p-2 text-xs rounded transition-colors text-left">
                Delete
            </button>
        </div>
    )
}
const Inventory = () => {
    const navigate = useNavigate()
    const [activeId, setActiveId] = useState<number | null>(null)
    // Sample data
    const inventoryItems = [
        { id: 1, name: "Premium Emulsion", brand: "Asian Paints", stock: 12, unit: "Liters", status: "In Stock" },
        { id: 2, name: "Weather Guard", brand: "Berger", stock: 3, unit: "Liters", status: "Low Stock" },
        { id: 3, name: "White Primer", brand: "Nippon", stock: 0, unit: "Liters", status: "Out of Stock" },
        { id: 4, name: "Paint Roller 9-inch", brand: "Generic", stock: 45, unit: "Pieces", status: "In Stock" },
    ];

    useEffect(() => {
        const handleEsc = (e:KeyboardEvent)=>{
            if(e.key==='Escape')
                setActiveId(null)
        }
        window.addEventListener('keydown', handleEsc);
        return ()=>window.removeEventListener('keydown', handleEsc)
    },[]);
    return (
        <>
           <div>
               <button
                   onClick={()=> navigate(-1)}
                   className={"h-8 w-8 rounded-full flex items-center justify-center  hover:bg-gray-700 "}>
                   <MoveLeft className={"text-sm"}/>
               </button>
           </div>
            <div className="max-w-6xl  p-6 space-y-6 pb-24">

                {/* HEADER & ACTIONS */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">Inventory</h1>
                        <p className="text-muted-foreground text-sm">Manage paint stock and supplies.</p>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <Button variant="outline" size="sm">
                            <RefreshCcw className="mr-2 h-4 w-4" /> Sync
                        </Button>
                        <Button size="sm">
                            <Plus className="mr-2 h-4 w-4" /> Add Item
                        </Button>
                    </div>
                </div>

                {/* QUICK STATS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-card">
                        <CardContent className="pt-6 flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-full">
                                <Package className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total SKUs</p>
                                <p className="text-xl font-bold">142 Items</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-card">
                        <CardContent className="pt-6 flex items-center gap-4">
                            <div className="p-3 bg-destructive/10 rounded-full">
                                <AlertCircle className="h-5 w-5 text-destructive" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Out of Stock</p>
                                <p className="text-xl font-bold text-destructive">12 Items</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-card">
                        <CardContent className="pt-6 flex items-center gap-4">
                            <div className="p-3 bg-amber-500/10 rounded-full">
                                <Filter className="h-5 w-5 text-amber-500" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Categories</p>
                                <p className="text-xl font-bold">8 Groups</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* FILTER & TABLE SECTION */}
                <Card className="bg-card border-border">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search products or brands..."
                                className="pl-8 bg-background"
                            />
                        </div>
                        <Button variant="ghost" size="icon">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div >
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs uppercase text-muted-foreground border-b border-border">
                                <tr>
                                    <th className="px-4 py-3 font-medium">Product Name</th>
                                    <th className="px-4 py-3 font-medium">Brand</th>
                                    <th className="px-4 py-3 font-medium">Stock Level</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                {inventoryItems.map((item) => (
                                    <tr key={item.id} className="hover:bg-accent/50 transition-colors">
                                        <td className="px-4 py-4 font-semibold">{item.name}</td>
                                        <td className="px-4 py-4 text-muted-foreground">{item.brand}</td>
                                        <td className="px-4 py-4">
                                            {item.stock} {item.unit}
                                        </td>
                                        <td className="px-4 py-4">
                                            <Badge variant={
                                                item.status === "In Stock" ? "default" :
                                                    item.status === "Low Stock" ? "outline" : "destructive"
                                            }>
                                                {item.status}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-4 text-right relative">
                                            <Button variant="ghost" size="sm"
                                                    onClick={()=>setActiveId(activeId === item.id ? null : item.id)}>:</Button>
                                            <Popup  isOpen={activeId===item.id}
                                                    onClose={activeId===item.id}/>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div></>


    );
};

export default Inventory;