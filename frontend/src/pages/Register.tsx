import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await register(form);
      navigate("/login");
    } catch {
      setError("Registration isn't implemented on the backend yet.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">
      <h1 className="text-xl font-semibold">Create an account</h1>
      {(["first_name", "last_name", "email", "password"] as const).map((field) => (
        <input
          key={field}
          type={field === "password" ? "password" : field === "email" ? "email" : "text"}
          placeholder={field.replace("_", " ")}
          value={form[field]}
          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
      ))}
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        className="w-full bg-black text-white text-sm rounded px-3 py-2 hover:bg-gray-800"
      >
        Register
      </button>
    </form>
  );
}
