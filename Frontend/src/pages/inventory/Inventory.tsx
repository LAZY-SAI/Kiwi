import React, { useEffect, useState } from 'react';
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
    MoveLeft,
    Loader2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "@/utils/apiFetch.ts";

const API_URI = import.meta.env.VITE_BACKEND_URI

interface InventoryItem {
    product_id: string;
    product_name: string;
    brand_name: string;
    stock_level: string;
    stock_status:string;
}

interface InventorySummary {
    total_skus: number;
    out_of_stock: number;
    total_categories: number;
}

const Popup = ({ isOpen, onEdit, onDelete }: { isOpen: boolean; onEdit: () => void; onDelete: () => void }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;
    return (
        <div className="absolute right-0 top-full mt-1 w-32 bg-slate-900 border border-slate-700 text-white p-1 rounded-md shadow-xl z-50 flex flex-col">
            <button
                onClick={onEdit}
                className="flex items-center gap-2 hover:bg-slate-800 p-2 text-xs rounded transition-colors text-left w-full">
                Edit
            </button>
            <button
                onClick={() => navigate('add')}
                className="flex items-center gap-2 hover:bg-slate-800 p-2 text-xs rounded transition-colors text-left w-full">
                Add
            </button>
            <div className="h-px bg-slate-700 my-1" />
            <button
                onClick={onDelete}
                className="flex items-center gap-2 hover:bg-rose-900/50 text-rose-400 p-2 text-xs rounded transition-colors text-left w-full">
                Delete
            </button>
        </div>
    );
};

const Inventory = () => {
    const navigate = useNavigate();
    const [activeId, setActiveId] = useState<string | null>(null);
    const [inventory, setInventory] = useState<InventoryItem[]>([]);
    const [summary, setSummary] = useState<InventorySummary>({ total_skus: 0, out_of_stock: 0, total_categories: 0 });
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchInventory = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await apiFetch(`${API_URI}/api/inventory`, {
                method: "GET",
                credentials: "include"
            });
            const data = await res.json();
            console.log(data)
            setInventory(data.items ?? data);
            setSummary(data.summary ?? summary);
        } catch (err) {
            console.error(err);
            setError('Failed to load inventory. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (productId: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return;
        try {
            await apiFetch(`${API_URI}/api/inventory/${productId}`, {
                method: "DELETE",
                credentials: "include"
            });
            setInventory(prev => prev.filter(item => item.product_id !== productId));
        } catch (err) {
            console.error(err);
        } finally {
            setActiveId(null);
        }
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setActiveId(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    const filteredInventory = inventory.filter(item =>
        item.product_name?.toLowerCase().includes(search.toLowerCase()) ||
        item.brand_name?.toLowerCase().includes(search.toLowerCase())
    );

    const getStatusVariant = (status: string) => {
        if (status === 'In Stock') return 'default';
        if (status === 'Low Stock') return 'outline';
        return 'destructive';
    };

    return (
        <>
            <div>
                <button
                    onClick={() => navigate(-1)}
                    className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-700">
                    <MoveLeft className="text-sm" />
                </button>
            </div>

            <div className="max-w-6xl p-6 space-y-6 pb-24">

                {/* HEADER & ACTIONS */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">Inventory</h1>
                        <p className="text-muted-foreground text-sm">Manage paint stock and supplies.</p>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <Button variant="outline" size="sm" onClick={fetchInventory} disabled={loading}>
                            <RefreshCcw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                            Sync
                        </Button>
                        <Button size="sm" onClick={() => navigate('add')}>
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
                                <p className="text-xl font-bold">{summary.total_skus} Items</p>
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
                                <p className="text-xl font-bold text-destructive">{summary.out_of_stock} Items</p>
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
                                <p className="text-xl font-bold">{summary.total_categories} Groups</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* ERROR */}
                {error && (
                    <div className="flex items-center gap-2 text-destructive text-sm p-3 bg-destructive/10 rounded-md">
                        <AlertCircle className="h-4 w-4" />
                        {error}
                    </div>
                )}

                {/* FILTER & TABLE */}
                <Card className="bg-card border-border">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search products or brands..."
                                className="pl-8 bg-background"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                        <Button variant="ghost" size="icon">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </CardHeader>

                    <CardContent className="overflow-visible">
                        {loading ? (
                            <div className="flex justify-center items-center py-16">
                                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                            </div>
                        ) : filteredInventory.length === 0 ? (
                            <div className="text-center text-muted-foreground py-16 text-sm">
                                No inventory items found.
                            </div>
                        ) : (
                            <div className="overflow-visible">
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
                                    {filteredInventory.map((item) => (
                                        <tr key={item.product_id} className="hover:bg-accent/50 transition-colors">
                                            <td className="px-4 py-4 font-semibold">{item.product_name}</td>
                                            <td className="px-4 py-4 text-muted-foreground">{item.brand_name}</td>
                                            <td className="px-4 py-4">{item.stock_level}</td>
                                            <td className="px-4 py-4">
                                                <Badge variant={getStatusVariant(item.stock_status)}>
                                                    {item.stock_status}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <div className="relative inline-block text-left">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => setActiveId(activeId === item.product_id ? null : item.product_id)}>
                                                        ···
                                                    </Button>
                                                    <Popup
                                                        isOpen={activeId === item.product_id}
                                                        onEdit={() => { navigate(`edit/${item.product_id}`); setActiveId(null); }}
                                                        onDelete={() => handleDelete(item.product_id)}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default Inventory;