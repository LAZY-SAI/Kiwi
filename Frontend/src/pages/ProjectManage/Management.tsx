import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import {
    Calculator,
    Calendar as CalendarIcon,
    Camera,
    Clock,
    CheckCircle2,
    FileText,
    Image as ImageIcon
} from "lucide-react";

const Management = () => {
    // --- Paint Estimation Logic ---
    const [sqft, setSqft] = useState<number>(0);
    const [coats, setCoats] = useState<number>(2);
    const estimatePaint = () => {
        // Standard rule: 1 gallon (approx 3.78L) covers 350-400 sq ft
        const litersNeeded = (sqft / 100) * coats;
        return litersNeeded.toFixed(2);
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8 pb-24 bg-background text-foreground">
            <header>
                <h1 className="text-3xl font-bold">Project Management</h1>
                <p className="text-muted-foreground">Track jobs, estimate materials, and manage site media.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT COLUMN: ACTIVE JOBS & SCHEDULING */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="shadow-md border-border bg-card">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Active Jobs Dashboard</CardTitle>
                                <CardDescription>Current on-site operations</CardDescription>
                            </div>
                            <Button variant="outline" size="sm">
                                <CalendarIcon className="mr-2 h-4 w-4" /> View Calendar
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    { id: 1, client: "Hotel Yak & Yeti", status: "In Progress", progress: 65, date: "May 14" },
                                    { id: 2, client: "Civil Homes Ph-3", status: "Quote Sent", progress: 0, date: "May 16" },
                                    { id: 3, client: "Private Villa - Bhaisepati", status: "In Progress", progress: 30, date: "May 15" },
                                ].map((job) => (
                                    <div key={job.id} className="p-4 rounded-lg border border-border bg-accent/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                                <FileText size={18} />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm">{job.client}</p>
                                                <p className="text-xs text-muted-foreground">Scheduled: {job.date}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6">
                                            <div className="text-right">
                                                <Badge variant={job.status === "In Progress" ? "default" : "outline"}>
                                                    {job.status}
                                                </Badge>
                                                <div className="w-32 h-1.5 bg-border rounded-full mt-2 overflow-hidden">
                                                    <div
                                                        className="h-full bg-primary transition-all"
                                                        style={{ width: `${job.progress}%` }}
                                                    />
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm">Details</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* BEFORE/AFTER PHOTO UPLOAD SECTION */}
                    <Card className="shadow-md border-border bg-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Camera className="h-5 w-5" /> Site Documentation
                            </CardTitle>
                            <CardDescription>Upload and compare project progress</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-accent/50 transition-colors cursor-pointer">
                                    <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                                    <p className="text-sm font-medium">Before Photos</p>
                                    <p className="text-xs text-muted-foreground">Click to upload site condition</p>
                                </div>
                                <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-accent/50 transition-colors cursor-pointer">
                                    <CheckCircle2 className="h-8 w-8 text-emerald-500 mb-2" />
                                    <p className="text-sm font-medium">After Photos</p>
                                    <p className="text-xs text-muted-foreground">Upload final results</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* RIGHT COLUMN: PAINT CALCULATOR */}
                <div className="space-y-6">
                    <Card className="shadow-lg border-primary/20 bg-card sticky top-6">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calculator className="h-5 w-5 text-primary" /> Paint Estimator
                            </CardTitle>
                            <CardDescription>Calculate liters needed for the job</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase text-muted-foreground">Total Square Footage</label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        type="number"
                                        placeholder="e.g. 1200"
                                        onChange={(e) => setSqft(Number(e.target.value))}
                                        className="bg-background"
                                    />
                                    <span className="text-sm font-bold">ft²</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase text-muted-foreground">Number of Coats</label>
                                <select
                                    className="w-full p-2 rounded-md bg-background border border-input text-sm"
                                    onChange={(e) => setCoats(Number(e.target.value))}
                                    value={coats}
                                >
                                    <option value={1}>1 Coat (Touch up)</option>
                                    <option value={2}>2 Coats (Standard)</option>
                                    <option value={3}>3 Coats (Deep Color)</option>
                                </select>
                            </div>

                            <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20 text-center">
                                <p className="text-xs text-primary font-bold uppercase mb-1">Estimated Paint Needed</p>
                                <div className="text-3xl font-black text-primary">
                                    {estimatePaint()} <span className="text-lg">Liters</span>
                                </div>
                                <p className="text-[10px] text-muted-foreground mt-2 italic">
                                    *Based on 400 sq.ft per gallon coverage
                                </p>
                            </div>

                            <Button className="w-full mt-4 bg-primary hover:bg-primary/90">
                                Add to Quote
                            </Button>
                        </CardContent>
                    </Card>

                    {/* QUICK JOB STATUS TRACKER */}
                    <Card className="bg-card border-border">
                        <CardHeader>
                            <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Pipeline</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between items-center text-sm">
                                <span className="flex items-center gap-2"><Clock size={14}/> Quotes Sent</span>
                                <span className="font-bold">14</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-blue-500"/> In Progress</span>
                                <span className="font-bold text-blue-500">5</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500"/> Completed</span>
                                <span className="font-bold text-emerald-500">82</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Management;