import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { getCategories, createSubmission } from '@/services/pelayananService';
import DashboardLayout from '@/components/Layouts/DashboardLayout';
import Button from '@/components/Elements/Button';

export default function PelayananList() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(console.error);
  }, []);

  const handleSelect = async (categoryId: number) => {
    try {
      const submission = await createSubmission(categoryId);
      navigate(`/layanan/${categoryId}/upload?subId=${submission.id}`);
    } catch (err: any) {
      console.error(err);
      const msg = err.response?.data?.message || 'Gagal membuat draft pengajuan.';
      alert(msg);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-5xl mx-auto space-y-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors font-semibold group"
        >
          <div className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5">
            <Icon icon="mdi:arrow-left" className="text-xl" />
          </div>
          Kembali
        </button>

        <div className="border-b border-slate-200 dark:border-slate-700 pb-6">
          <h1 className="text-3xl font-bold font-heading text-slate-800 dark:text-white">Pilih Layanan Administrasi</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Silakan pilih kategori layanan kepegawaian untuk melanjutkan pengajuan berkas.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(cat => (
            <div
              key={cat.id}
              className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/40 dark:shadow-none hover:shadow-primary/10 hover:border-primary transition-all flex flex-col h-full group"
            >
              <div className="text-5xl mb-6 p-5 bg-slate-50 dark:bg-slate-700 rounded-3xl w-fit group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                {cat.icon}
              </div>
              <h3 className="font-bold text-xl text-slate-800 dark:text-white mb-3 group-hover:text-primary transition-colors">{cat.name}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8 flex-1">{cat.description}</p>

              <Button
                onClick={() => handleSelect(cat.id)}
                fullWidth
                rightIcon="mdi:chevron-right"
              >
                Pilih Layanan
              </Button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
