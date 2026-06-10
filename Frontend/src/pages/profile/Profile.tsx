import React, { useState, useEffect } from 'react';
import {
    useGetIdentity,
    useUpdate,
    useNotification,
    useLogout
} from "@refinedev/core";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    User,
    Mail,
    Shield,
    MapPin,
    Camera,
    LogOut,
    Save,
    CheckCircle2
} from "lucide-react";

// --- Types ---
interface IUser {
    id: string | number;
    name: string;
    email: string;
    avatar?: string;
    role?: string;
    bio?: string;
    location?: string;
}

const Profile: React.FC = () => {

    // Refine Hooks
    const { data:   identity, isLoading } = useGetIdentity<IUser>();

    // @ts-ignore
    const { mutate: updateProfile, isLoading: isSaving } = useUpdate();
    const { mutate: logout } = useLogout();
    const { open } = useNotification();

    // Local State
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Partial<IUser>>({});

    // Sync identity data to local form state when loaded
    useEffect(() => {
        if (identity) {
            console.log(identity)
            //@ts-ignore
            //const Result = identity?.data?.[0] ? identity.data[0] : null
            setFormData({
                name: identity.name || "John Doe",
                email: identity.email,
                bio: identity.bio || "",
                location: identity.location || "Nepal",
                role:identity.role || "not verified"
            });

        }
    }, [identity]);

    // const handleInformation = ()=>{
    //     useEffect(() => {
    //         fetch(`${BACKEND_URI}/api/users`)
    //             .then(response => response.data() )
    //     }, []);
    // }

    const handleSave = () => {
        if (!identity?.id) return;

        updateProfile({
            resource: "users",
            id: identity.id,
            values: formData,
            successNotification: () => ({
                message: "Profile updated successfully!",
                description: "Your changes have been saved to the database.",
                type: "success",
            }),
        }, {
            onSuccess: () => setIsEditing(false),
            onError: () => {
                open?.({
                    message: "Update failed",
                    description: "There was an error saving your changes.",
                    type: "error"
                });
            }
        });
    };

    if (isLoading) {
        return <div className="p-10 text-center animate-pulse">Loading Profile...</div>;
    }

    return (
        <div className="max-w-6xl p-6 space-y-8 pb-24 bg-background text-foreground">

            {/* 1. PROFILE TOP HEADER */}
            <Card className="bg-card border-border overflow-hidden shadow-lg">
                <div className="h-40 bg-gradient-to-r from-indigo-600 via-purple-600 to-primary relative" />
                <CardContent className="relative pt-0 px-6 pb-6">
                    <div className="flex flex-col md:flex-row items-end md:items-center gap-6 -mt-16">
                        <div className="relative group">
                            <div className="h-32 w-32 rounded-2xl border-4 border-background bg-slate-800 flex items-center justify-center text-4xl font-bold text-white overflow-hidden shadow-2xl">
                                {identity?.avatar ? (
                                    <img src={identity.avatar} alt="Avatar" className="object-cover h-full w-full" />
                                ) : (
                                    formData.name || "U"
                                )}
                            </div>
                            <button className="absolute bottom-2 right-2 p-2 bg-primary rounded-lg text-white shadow-lg hover:scale-110 transition-transform">
                                <Camera size={16} />
                            </button>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-2">
                                <h2 className="text-3xl font-bold tracking-tight">{formData.name}</h2>
                                <CheckCircle2 className="text-blue-400 h-5 w-5" />
                            </div>
                            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-2">
                                <Badge variant="secondary" className="gap-1.5 py-1">
                                    <Shield size={14} className="text-primary" /> {identity?.role || "Administrator"}
                                </Badge>
                                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin size={14} /> {formData.location}
                </span>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6 md:mt-0">
                            {isEditing ? (
                                <>
                                    <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                                    <Button onClick={handleSave} disabled={isSaving}>
                                        {isSaving ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save</>}
                                    </Button>
                                </>
                            ) : (
                                <Button variant="outline" onClick={() => setIsEditing(true)}>
                                    Edit Profile
                                </Button>
                            )}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:bg-destructive/10"
                                onClick={() => logout()}
                            >
                                <LogOut size={20} />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* 2. ACCOUNT FORM SECTION */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-border">
                        <CardHeader>
                            <CardTitle>Account Details</CardTitle>
                            <CardDescription>Manage your public information and verified email.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            className="pl-10"
                                            value={formData.name || ""}
                                            disabled={!isEditing}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            className="pl-10"
                                            type="email"
                                            value={formData.email || ""}
                                            disabled={!isEditing}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Location</label>
                                <Input
                                    value={formData.location || ""}
                                    disabled={!isEditing}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Bio & Professional Summary</label>
                                <textarea
                                    className="w-full min-h-[120px] bg-background border border-input rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all disabled:opacity-60"
                                    value={formData.bio || ""}
                                    disabled={!isEditing}
                                    placeholder="Describe your role in the shop..."
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* 3. SIDEBAR STATS & SETTINGS */}
                <div className="space-y-6">
                    <Card className="bg-primary/5 border-primary/20">
                        <CardContent className="pt-8 text-center space-y-2">
                            <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-2">
                                <CheckCircle2 size={24} />
                            </div>
                            <h4 className="text-sm font-semibold text-muted-foreground uppercase">Projects Handled</h4>
                            <p className="text-5xl font-black text-primary">142</p>
                            <p className="text-[11px] text-muted-foreground italic">+12 this month</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground">Quick Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Email Notifications</span>
                                <div className="h-5 w-10 bg-primary rounded-full relative"><div className="h-4 w-4 bg-white rounded-full absolute right-0.5 top-0.5 shadow" /></div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Public Profile</span>
                                <div className="h-5 w-10 bg-slate-700 rounded-full relative"><div className="h-4 w-4 bg-white rounded-full absolute left-0.5 top-0.5 shadow" /></div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Profile;