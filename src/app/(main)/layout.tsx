import { Navbar } from "@/shared/components/navbar";

const MainLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="h-dvh max-w-6xl border-x mx-auto overflow-scroll">
            <Navbar
                latitude={30.733729951515837}
                longitude={76.75320035056701}
            />
            {children}
        </div>
    );
};

export default MainLayout;
