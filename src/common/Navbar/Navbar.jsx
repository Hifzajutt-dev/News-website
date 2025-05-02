import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?search=${query}`);
      setMenuOpen(false);
    }
  };
const toggleMenu = () => {setMenuOpen(!menuOpen);
  };
return (
    <nav className="bg-gradient-to-r from-green-500 via-emerald-500 to-blue-500 shadow-md px-6 py-3 sticky top-0 z-50 text-white">
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide hover:text-white"
        >
          NewsWorld
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/categories"
            className="text-white hover:underline text-lg transition-all duration-200"
          >
            Categories
          </Link>

          <form
            onSubmit={handleSearch}
            className="flex items-center border border-white/30 bg-white/90 rounded-md shadow-sm overflow-hidden"
          >
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search news..."
              className="px-3 py-1 text-sm focus:outline-none text-gray-800 w-40 md:w-48"/>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 px-3 py-1 text-sm text-white font-medium transition-all"
            >
              Search
            </button>
          </form>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mt-4 flex flex-col gap-4 md:hidden">
          <Link
            to="/categories"
            onClick={() => setMenuOpen(false)}
            className="text-white hover:underline text-base"
          >
            Categories
          </Link>

          <form
            onSubmit={handleSearch}
            className="flex items-center border border-white/30 bg-white/90 rounded-md shadow-sm overflow-hidden"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search news..."
              className="px-3 py-1 text-sm focus:outline-none text-gray-800 w-full"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 px-3 py-1 text-sm text-white font-medium transition-all"
            >
              Search
            </button>
          </form>
        </div>
      )}
    </nav>
  );
}
