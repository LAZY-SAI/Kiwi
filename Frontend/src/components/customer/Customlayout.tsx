import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { NavBar } from "@/components/ui/NavBar.tsx";

export function CustomLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-custom flex flex-col font-sans p-6">

            <header className="w-full flex items-center justify-between gap-4 max-w-[1600px] mx-auto mb-8">


                <div className="flex items-center shadow-md border-black border-1 h-[46px] px-6 rounded-full border ">
                    <h1 className="text-black  text-[19px] tracking-tight">Kiwi Enterprise</h1>
                </div>


                <div className="flex items-center gap-3">

                    <NavBar />


                    <button className="flex shadow-md items-center gap-1.5 bg-white h-[46px] px-4 rounded-full border border-black/[0.03] text-[#444] hover:text-black transition-colors">
                        <svg className="h-4 w-4 stroke-[1.8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.754c-.29.219-.453.566-.451.932a1.44 1.44 0 0 1 0 .048c-.002.366.16.713.45.931l1.004.754a1.125 1.125 0 0 1 .26 1.43l-1.297 2.247a1.125 1.125 0 0 1-1.37.491l-1.216-.456c-.356-.133-.751-.072-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.754c.29-.218.453-.565.451-.93a1.44 1.44 0 0 1 0-.048c.002-.366-.16-.713-.45-.931l-1.004-.754a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        <span className="text-[13px] font-medium tracking-tight">Setting</span>
                    </button>


                    <button className="flex items-center shadow-md justify-center bg-white h-[46px] w-[46px] rounded-full border border-black/[0.03] text-[#444] hover:text-black transition-colors">
                        <svg className="h-[18px] w-[18px] stroke-[1.8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                        </svg>
                    </button>


                    <button className="flex items-center shadow-md justify-center bg-white h-[46px] w-[46px] rounded-full border border-black/[0.03] text-[#444] hover:text-black transition-colors overflow-hidden">
                        <svg className="h-5 w-5 stroke-[1.8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                    </button>
                </div>
            </header>


            <main className={cn("@container/main w-full max-w-[1600px] mx-auto relative flex flex-col flex-grow")}>
                {children}
            </main>
        </div>
    );
}
CustomLayout.displayName = "CustomLayout";