import { Link, NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useCartStore } from "../../store/useCartStore";

// Owner: Member 5 (UI Shell, Day 3 of the sprint plan) — this is intentionally
// unstyled/minimal so the actual visual design is a Day 3 task, not done for you.
export default function Navbar() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const cartCount = useCartStore((s) => s.lines.reduce((n, l) => n + l.quantity, 0));

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm ${isActive ? "font-semibold text-black" : "text-gray-600"} hover:text-black`;

  return (
    <header className="border-b border-gray-200">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-semibold tracking-tight">
          Marb Textile Studio
        </Link>

        <div className="flex items-center gap-6">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/products" className={linkClass}>
            Products
          </NavLink>
          <NavLink to="/cart" className={linkClass}>
            Cart ({cartCount})
          </NavLink>

          {user ? (
            <button onClick={logout} className="text-sm text-gray-600 hover:text-black">
              Log out ({user.first_name})
            </button>
          ) : (
            <NavLink to="/login" className={linkClass}>
              Log in
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}
