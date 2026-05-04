import React from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import Badge from '@/components/Elements/Badge';

interface SubmissionListProps {
  submissions: any[];
}

const SubmissionList: React.FC<SubmissionListProps> = ({ submissions }) => {
  const navigate = useNavigate();

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'draft': return 'slate';
      case 'submitted': return 'blue';
      case 'approved': return 'emerald';
      case 'revised': return 'rose';
      default: return 'amber';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
        <h2 className="font-bold text-slate-800 dark:text-slate-100 text-lg flex items-center gap-2">
          <Icon icon="mdi:clock-outline" className="text-primary text-xl" />
          Riwayat Pengajuan
        </h2>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-700">
        {submissions.length === 0 ? (
          <div className="p-16 text-center text-slate-400">
            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100 dark:border-slate-700">
                <Icon icon="mdi:file-search-outline" className="text-3xl opacity-50" />
            </div>
            <p className="font-medium">Belum ada pengajuan layanan.</p>
            <p className="text-sm mt-1">Layanan yang Anda ajukan akan muncul di sini.</p>
          </div>
        ) : (
          submissions.map((sub) => (
            <div
              key={sub.id}
              className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors cursor-pointer"
              onClick={() => navigate(`/layanan/${sub.category_id}/upload?subId=${sub.id}`)}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm shrink-0">
                    {sub.category?.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg leading-tight">{sub.category?.name}</h3>
                  <div className="flex items-center gap-2 mt-1.5 text-slate-500 dark:text-slate-400 text-sm">
                    <Icon icon="mdi:calendar" className="text-lg" />
                    <span>Dikirim: {sub.submitted_at ? new Date(sub.submitted_at).toLocaleDateString('id-ID', { dateStyle: 'long' }) : 'Belum disubmit (Draft)'}</span>
                  </div>
                </div>
              </div>
              <div className="text-right flex flex-col items-end gap-1.5">
                <Badge variant={getStatusVariant(sub.status)}>
                  {sub.status.replace(/_/g, ' ')}
                </Badge>
                {sub.status === 'revised' && (
                  <p className="text-xs font-bold text-rose-500 flex items-center gap-1">
                    <Icon icon="mdi:alert-circle" />
                    Perlu perbaikan berkas
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SubmissionList;
