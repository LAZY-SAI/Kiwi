export const UserDash = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    return (
        <div className="min-h-screen p-2 text-foreground">
            <div>

                <div className="text-4xl flex text-black justify-between items-center">
                    <h1 className="font-semibold tracking-tight">Welcome in, Customer</h1>

                    <div className="flex gap-2">
                        <span className="flex gap-2">
                            <h3 className="text-sm font-medium">Day:</h3>
                            <p className="text-sm">{day < 10 ? `0${day}` : day}</p>
                        </span>
                        <span className="flex gap-2">
                            <h3 className="text-sm font-medium">Month:</h3>
                            <p className="text-sm">{month < 10 ? `0${month}` : month}</p>
                        </span>
                        <span className="flex gap-2">
                            <h3 className="text-sm font-medium">Year:</h3>
                            <p className="text-sm">{year}</p>
                        </span>
                    </div>
                </div>
            </div>

            {/* Profile Card Container */}

            <div className="relative w-64 h-64 rounded-2xl bg-gray-300 mt-6 overflow-hidden shadow-sm group">
                <img
                    src="/pictures/profile.png"
                    alt="profile"
                    className="w-full h-full object-cover"
                />


                <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/20 backdrop-blur-sm border-t border-white/10 flex flex-col gap-0.5">
                    <p className="text-white text-lg font-semibold tracking-tight">Customer</p>
                    <p className="text-white/80 text-xs font-medium">Butwal</p>
                </div>
            </div>
        </div>
    );
};