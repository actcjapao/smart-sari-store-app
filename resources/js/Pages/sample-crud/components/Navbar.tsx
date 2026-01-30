import { Link } from "@inertiajs/react";

const Navbar: React.FC = () => {
    return (
        <nav className="w-full bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo / Brand */}
                <div className="text-xl font-semibold text-gray-800">
                    MyApp
                </div>

                {/* Nav Links */}
                <div className="flex space-x-6">
                    <Link
                        href="/"
                        className="text-gray-600 hover:text-gray-900 transition"
                    >
                        Home
                    </Link>

                    <Link
                        href="/about"
                        className="text-gray-600 hover:text-gray-900 transition"
                    >
                        About
                    </Link>

                    <Link
                        href="/services"
                        className="text-gray-600 hover:text-gray-900 transition"
                    >
                        Services
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
