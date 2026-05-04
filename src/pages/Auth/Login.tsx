import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { loginPegawai } from '../../services/authService';
import { useAuth } from "@/provider/AuthProvider";
import { setAccessTokenCookie } from '@/utils/cookie';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    setToken,
  } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await loginPegawai(form);
      console.log(res);
      if (res.data.token) {
        setToken(res.data.token);
        setAccessTokenCookie(res.data.token);
        // setUsername(res.data.user.username);
        navigate('/');
      } else {
        setError('Login gagal, token tidak diterima.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Username atau password salah.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 p-6 relative overflow-hidden">
      {/* Visual background decorations */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-8 relative z-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
            <Icon icon="mdi:user-tie" className="text-3xl" />
          </div>
          <h1 className="text-2xl font-bold font-heading text-slate-800">Portal Pegawai</h1>
          <p className="text-slate-500 text-sm mt-1">Layanan Administrasi Kepegawaian Digital</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-border-rose-100 text-rose-600 text-sm rounded-xl flex items-center gap-2">
            <Icon icon="mdi:alert-circle" className="text-lg shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">NIP / Username</label>
            <div className="relative">
              <Icon icon="mdi:id-card" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
              <input
                type="text"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                placeholder="Masukkan NIP Anda"
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
            <div className="relative">
              <Icon icon="mdi:lock-outline" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
              <input
                type="password"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-primary hover:bg-primary-dark font-semibold rounded-xl transition-all shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading ? (
              <Icon icon="mdi:loading" className="animate-spin text-xl" />
            ) : (
              <>
                Masuk
                <Icon icon="mdi:arrow-right" className="text-lg" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">
            Untuk login PERTAMA KALI, gunakan <span className="font-semibold text-slate-600">NIK Anda</span> sebagai password.
          </p>
        </div>
      </div>
    </div>
  );
}
