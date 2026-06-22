import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card"
import { Graph } from "@/components/graph/graph"
import { Button } from "@/components/ui/button"
import {
  Plus,
  Users,
  AlertTriangle,
  TrendingUp,
  Clock,
  CreditCard
} from "lucide-react"
import { useEffect, useState } from "react";
import { apiFetch } from "@/utils/apiFetch.ts";

const API_URI = import.meta.env.VITE_BACKEND_URI


interface DashboardData {
  total_orders: number;
}

const DashBoard = () => {

  const [data, setData] = useState<DashboardData>({ total_orders: 0 });

  useEffect(() => {

    const fetchDashboardData = async () => {
      try {
        const res = await apiFetch(`${API_URI}/api/total`, {
          method: "GET",
          credentials: "include"
        });


        const jsonBody = await res.json();
        setData(jsonBody);
        console.log(jsonBody);
      } catch (error) {
        console.error("Failed fetching dashboard data: ", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
      <div className=" min-h-screen p-2 bg-background text-foreground pb-24">
        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <Breadcrumb />
            <h1 className="text-3xl font-bold tracking-tight mt-2">Admin Overview</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Export Report</Button>
            <Button size="sm" className="bg-primary text-primary-foreground">
              <Plus className="mr-2 h-4 w-4" /> New Order
            </Button>
          </div>
        </header>

        {/* TOP ROW: KEY METRICS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="bg-card shadow-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>

              <div className="text-2xl font-bold">{data.total_orders}</div>
              <p className="text-xs text-primary font-medium">+12.5% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Workers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">8 currently on-site</p>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Revenue</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rs. 84,200</div>
              <p className="text-xs text-rose-500 font-medium">Rs. 12,000 Unpaid</p>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-sm border-border border-l-4 border-l-destructive">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Stock Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">5</div>
              <p className="text-xs text-muted-foreground">Requires immediate restock</p>
            </CardContent>
          </Card>
        </section>

        {/* MIDDLE SECTION: CHART & RECENT ACTIVITY */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
          <Card className="lg:col-span-2 bg-card border-border shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Product Sales Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <Graph />
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Clock className="h-4 w-4" /> Activity Feed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { title: "New Order", desc: "Interior Job - Balaju", time: "2 min ago", type: "new" },
                  { title: "Payment Received", desc: "Order #4592", time: "1 hour ago", type: "success" },
                  { title: "Worker Assigned", desc: "Suresh M. for Job #391", time: "3 hours ago", type: "process" },
                ].map((item, idx) => (
                    <div key={idx} className="flex flex-col gap-1 border-l-2 border-border pl-4 relative">
                      <div className="absolute w-2.5 h-2.5 rounded-full bg-primary -left-[6px] top-1" />
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold">{item.title}</p>
                        <span className="text-[10px] text-muted-foreground">{item.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4 text-xs text-primary">View All History</Button>
            </CardContent>
          </Card>
        </section>

        {/* BOTTOM SECTION: WORKER STATUS OVERVIEW */}
        <section className="mt-10">
          <Card className="bg-card border-border shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Current Worker Deployment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-lg bg-accent/50">
                  <p className="text-sm text-muted-foreground">Available</p>
                  <p className="text-2xl font-bold text-emerald-500">32</p>
                </div>
                <div className="p-4 rounded-lg bg-accent/50">
                  <p className="text-sm text-muted-foreground">On Site</p>
                  <p className="text-2xl font-bold text-blue-500">8</p>
                </div>
                <div className="p-4 rounded-lg bg-accent/50">
                  <p className="text-sm text-muted-foreground">Travel</p>
                  <p className="text-2xl font-bold text-amber-500">2</p>
                </div>
                <div className="p-4 rounded-lg bg-accent/50">
                  <p className="text-sm text-muted-foreground">Inactive</p>
                  <p className="text-2xl font-bold text-muted-foreground">0</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
  )
}

export default DashBoard;