import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {Home, Album,Warehouse,ClipboardPlus,MonitorCog,  UserPen } from "lucide-react"
import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Outlet,  Route, Routes } from "react-router";
import "./App.css";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";

import Landing from "./pages/Landing";
import DashBoard from "./pages/DashBoard";
import { Layout } from "./components/refine-ui/layout/layout";
import Order from "./pages/Order";
import Signup from "./pages/login";
import {dataProvider} from "@/providers/dataProvider";

import Report from "@/pages/Report/Report.tsx";
import InventoryRoutes from "@/routes/inventory.route.tsx";
import Management from "@/pages/ProjectManage/Management.tsx";
import Profile from '@/pages/profile/Profile.tsx'
function App() {
  return (
    <BrowserRouter>
      
      <RefineKbarProvider>
        <ThemeProvider>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              notificationProvider={useNotificationProvider()}
              routerProvider={routerProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "gi6p2k-27fsKW-PEOZfT",
              }}
              resources={[
                {
                  name:"dashboard",
                  list:"/dashboard",
                  meta:{label:"Dashboard", icon:<Home/>}
                },
                {
                  name: "orders",
                  list: "/order",
                  create: "/order/create",
                  edit: "/order/update/:id",
                  meta: {
                    label: "Orders",
                    icon: <Album/>
                  }
                },
                {
                  name:"inventory",
                  list:"/inventory",
                  create:"/inventory/create",
                  edit:"/inventory/update/:id",
                  meta:{
                    label:"Inventory",
                    icon:<Warehouse/>
                  }
                },
                {
                  name:'Project_management',
                  list:"/management",
                  meta:{
                    label:"Project-Management",
                    icon:<MonitorCog/>
                  }
                },
                {
                  name:'reports',
                  list:'/report',
                  create:'/report/create',
                  meta:{ 
                    label:"Reports",
                    icon:<ClipboardPlus/>
                  }
                },
                {
                  name:'/account',
                  list:'/account',
                  meta:{
                    label:"Account",
                    icon:<UserPen/>
                  }
                }
              ]}
            >
              <Routes>
                <Route index element={<Landing />} />
                  <Route path="/signup" element={<Signup/>}/>
                  <Route element={
                    <Layout>
                      <Outlet/>
                    </Layout>
                  }>
                       <Route path="/dashboard" element={<DashBoard/>}/>

                        <Route path="/order" element={<Order/>}/>
                    <Route path={"/inventory/*"} element={<InventoryRoutes/>}/>
                    <Route path={"/report"} element={<Report/>}/>
                    <Route path={"/management"} element={<Management/>}/>
                    <Route path={"/account"} element={<Profile/>}/>
                  </Route>
                 
              </Routes>
              <Toaster />
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
