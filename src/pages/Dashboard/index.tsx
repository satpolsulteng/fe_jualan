import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { getMySubmissions } from '@/services/pelayananService';
import DashboardLayout from '@/components/Layouts/DashboardLayout';
import Hero from '@/components/Sections/Hero';
import SubmissionList from '@/components/Sections/SubmissionList';

export default function Dashboard() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const userStr = localStorage.getItem('pegawai_user');
  const user = userStr ? JSON.parse(userStr) : null;

  useEffect(() => {
    getMySubmissions()
      .then(setSubmissions)
      .catch(console.error);
  }, []);

  return (
    <DashboardLayout>
      <Hero
        title={`Selamat Datang, ${user?.name || 'Pegawai'}`}
        description="Kelola administrasi kepegawaian Anda seperti kenaikan berkala, pangkat, dan pensiun secara digital dan modern."
      />

      <main className="max-w-5xl mx-auto px-6 -mt-14 pb-20 space-y-8 relative z-20">

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div
            onClick={() => navigate('/layanan')}
            className="group bg-white dark:bg-slate-800 rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 cursor-pointer hover:border-primary hover:shadow-primary/10 transition-all flex items-start gap-6"
          >
            <div className="w-16 h-16 bg-sky-50 dark:bg-sky-900/30 text-sky-500 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-inner">
              <Icon icon="mdi:file-document-edit" className="text-3xl" />
            </div>
            <div className="pt-1">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-xl group-hover:text-primary transition-colors">Buat Pengajuan Baru</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">Ajukan Gaji Berkala, Kenaikan Pangkat, atau Pensiun dengan mudah.</p>
            </div>
          </div>

          <div
            className="group bg-white dark:bg-slate-800 rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 cursor-pointer hover:border-primary hover:shadow-primary/10 transition-all flex items-start gap-6"
          >
            <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/30 text-amber-500 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-inner">
              <Icon icon="mdi:account-details" className="text-3xl" />
            </div>
            <div className="pt-1">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-xl group-hover:text-amber-600 transition-colors">Informasi Profil</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">Periksa detil biodata, informasi jabatan, dan riwayat pendidikan Anda.</p>
            </div>
          </div>
        </div>

        {/* Status Pengajuan Section */}
        <SubmissionList submissions={submissions} />

      </main>
    </DashboardLayout>
  );
}
