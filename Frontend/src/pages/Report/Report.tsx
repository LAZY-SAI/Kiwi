import React from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Download,
    Calendar as CalendarIcon,
    ArrowUpRight,
    ArrowDownRight,
    FileText
} from "lucide-react";

import { Graph } from "@/components/graph/graph";
import {Badge} from "@/components/ui/badge.tsx"; // Reusing your graph component

const Report = () => {
    return (
        <div className="max-w-6xl  p-6 space-y-8 pb-24">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Business Analytics</h1>
                    <p className="text-muted-foreground text-sm">Detailed insights into your paint shop operations.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <CalendarIcon className="mr-2 h-4 w-4" /> May 2026
                    </Button>
                    <Button className="bg-primary">
                        <Download className="mr-2 h-4 w-4" /> Export PDF
                    </Button>
                </div>
            </div>

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Total Revenue</CardDescription>
                        <CardTitle className="text-2xl font-bold">Rs. 4,25,000</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center text-emerald-500 text-sm font-medium">
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                            12.5% vs last month
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Avg. Order Value</CardDescription>
                        <CardTitle className="text-2xl font-bold">Rs. 8,400</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center text-rose-500 text-sm font-medium">
                            <ArrowDownRight className="h-4 w-4 mr-1" />
                            2.1% vs last month
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Completed Projects</CardDescription>
                        <CardTitle className="text-2xl font-bold">156</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center text-emerald-500 text-sm font-medium">
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                            8 new this week
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* MAIN CHART SECTION */}
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle>Revenue Trends</CardTitle>
                    <CardDescription>Daily income from paint sales and service bookings.</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                    <Graph />
                </CardContent>
            </Card>

            {/* BOTTOM GRID: TABLE & TOP PRODUCTS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Performing Workers */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Review from customer</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { name: "Suman Thapa", comment:'love the service', rating: 4.9 },
                                { name: "Bishal KC", comment: 'fast service', rating: 4.8 },
                                { name: "Anil Gurung", comment: 'great staffs', rating: 4.7 },
                            ].map((worker, i) => (
                                <div key={i} className="flex items-center justify-between border-b border-border pb-2 last:border-0">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-xs">
                                            {worker.name[0]}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">{worker.name}</p>
                                            <p className="text-xs text-muted-foreground">{worker.comment} Jobs Completed</p>
                                        </div>
                                    </div>
                                    <Badge variant="secondary">⭐ {worker.rating}</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Inventory Value Report */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Stock Value Report</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Asian Paints Stock Value:</span>
                            <span className="font-bold font-mono">Rs. 1,40,000</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Berger Paints Stock Value:</span>
                            <span className="font-bold font-mono">Rs. 95,000</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Supplies & Brushes:</span>
                            <span className="font-bold font-mono">Rs. 22,500</span>
                        </div>
                        <div className="h-px bg-border my-2" />
                        <div className="flex justify-between items-center pt-2">
                            <span className="font-bold">Total Inventory Value:</span>
                            <span className="text-xl font-bold text-primary">Rs. 2,57,500</span>
                        </div>
                        <Button variant="outline" className="w-full mt-2">
                            <FileText className="mr-2 h-4 w-4" /> Full Inventory PDF
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Report;