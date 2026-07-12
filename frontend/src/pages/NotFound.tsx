import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <p className="text-gray-500 mb-4">Page not found.</p>
      <Link to="/" className="text-sm underline">
        Back to home
      </Link>
    </div>
  );
}
