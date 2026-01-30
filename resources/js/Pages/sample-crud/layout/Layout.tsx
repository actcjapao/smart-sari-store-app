import { ReactNode } from "react";
import Navbar from "../components/Navbar";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children } : LayoutProps) => {
    return (
        <main>
            <Navbar />
            <div>{children}</div>
        </main>
    )
};

export default Layout;