import { NavLink } from "react-router-dom";

export const NavBar = () => {
    const navItems = [
        { name: "Dashboard", path: "/" },
        { name: "Orders", path: "/orders" },
        { name: "color-Palettes", path: "/color-palette" },
        {name: "Reviews", path: "/reviews" },
        {name:"Contact", path:"/contact"}
    ];

    const linkStyles = ({ isActive }: { isActive: boolean }) =>
        `text-[13px] font-medium tracking-tight transition-all duration-200 px-4 py-2 rounded-full ${
            isActive
                ? "bg-[#22252a] text-white shadow-sm"
                : "text-[#555] hover:text-black hover:bg-black/5"
        }`;

    return (
        <nav className="flex items-center bg-white shadow-md  px-2 py-1.5 rounded-full border border-black/[0.03]">
            {/* Desktop Nav  */}
            <div className="hidden xl:flex items-center gap-0.5">
                {navItems.map((item) => (
                    <NavLink key={item.path} to={item.path} className={linkStyles}>
                        {item.name}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};