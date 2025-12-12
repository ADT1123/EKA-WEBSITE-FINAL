// pages/AdminLogin.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../apiConfig.ts";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });


      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("adminToken", data.token);
        navigate("/admin");
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Unable to reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fdf9ff_0,#f5ecff_40%,#f1f5f9_100%)] flex items-center justify-center px-4 py-10">
      {/* subtle card shadow + border */}
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <p className="text-xs font-medium tracking-[0.32em] uppercase text-slate-500 mb-2">
            Eka Gifts · Admin
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Sign in to dashboard
          </h1>
          <p className="mt-2 text-xs md:text-sm text-slate-500">
            Restricted area for internal order management only.
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200/70 shadow-[0_18px_45px_rgba(15,23,42,0.12)] p-7 md:p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Username
              </label>
              <input
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/60 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:border-[#ffd27a] focus:ring-2 focus:ring-[#ffd27a]/25"
                placeholder="admin@eka"
                required
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <span className="text-[11px] text-slate-400">
                  Keep this confidential
                </span>
              </div>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/60 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:border-[#ffd27a] focus:ring-2 focus:ring-[#ffd27a]/25"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-2xl border border-rose-200 bg-rose-50/90 px-3.5 py-2.5 text-[11px] md:text-xs text-rose-700">
                <span className="mt-0.5 text-xs">!</span>
                <p>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-2xl text-sm font-semibold tracking-wide hover:bg-slate-800 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_14px_35px_rgba(15,23,42,0.45)]"
            >
              {loading ? (
                <>
                  <span className="h-3 w-3 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  <span>Signing in…</span>
                </>
              ) : (
                <span>Sign in</span>
              )}
            </button>

            <p className="text-[11px] text-center text-slate-400">
              Having trouble logging in? Contact the site owner to reset admin
              access.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
