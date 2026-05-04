import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { api_kepegawaian } from '@/config/api';
import DashboardLayout from '@/components/Layouts/DashboardLayout';
import Button from '@/components/Elements/Button';
import Badge from '@/components/Elements/Badge';
import Webcam from 'react-webcam';

export default function PelayananUpload() {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const subId = searchParams.get('subId');
  const navigate = useNavigate();

  const [submission, setSubmission] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeReqId, setActiveReqId] = useState<number | null>(null);

  useEffect(() => {
    // Fetch categories and submission detail
    api_kepegawaian.get('/pegawai-portal/categories').then((res: any) => {
      const cat = res.categories.find((c: any) => c.id == categoryId);
      setCategory(cat);
    }).catch(console.error);

    fetchSubmission();
  }, [categoryId, subId]);

  const fetchSubmission = () => {
    api_kepegawaian.get('/pegawai-portal/submissions').then((res: any) => {
      const sub = res.submissions.find((s: any) => s.id == subId);
      setSubmission(sub);
    }).catch(console.error);
  };

  const handleUploadClick = (reqId: number) => {
    setActiveReqId(reqId);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeReqId || !subId) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('requirement_id', activeReqId.toString());

    try {
      await api_kepegawaian.post(`/pegawai-portal/submissions/${subId}/documents`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      fetchSubmission(); // Refresh data
    } catch (err) {
      console.error(err);
      alert('Gagal mengupload file.');
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
      setActiveReqId(null);
    }
  };

  const [showWebcamModal, setShowWebcamModal] = useState(false);
  const webcamRef = useRef<any>(null);

  const handleSubmitFinal = async () => {
    setShowWebcamModal(true);
  };

  const processSubmit = async () => {
    if (!webcamRef.current) return alert('Kamera tidak terdeteksi!');
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return alert('Gagal mengambil foto. Pastikan memberikan izin akses kamera.');

    setIsSubmitting(true);
    try {
      await api_kepegawaian.post(`/pegawai-portal/submissions/${subId}/submit`, {
        webcam_photo: imageSrc
      });
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Gagal submit pengajuan.');
    } finally {
      setIsSubmitting(false);
      setShowWebcamModal(false);
    }
  };

  if (!category || !submission) return <div className="p-12 text-center text-slate-500">Memuat data...</div>;

  const isDraft = submission.status === 'draft' || submission.status === 'revised';

  return (
    <DashboardLayout>
      <div className="p-8 max-w-5xl mx-auto space-y-8 pb-24">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-semibold group"
        >
          <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5">
            <Icon icon="mdi:arrow-left" className="text-xl" />
          </div>
          Kembali ke Dashboard
        </button>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors"></div>
          <div className="text-5xl p-6 bg-primary/10 text-primary rounded-[2rem] shrink-0 border border-primary/20 relative z-10 shadow-inner">
            {category.icon}
          </div>
          <div className="flex-1 text-center md:text-left relative z-10 pt-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
              <h1 className="text-3xl font-bold font-heading text-slate-800">{category.name}</h1>
              <Badge variant={isDraft ? 'slate' : 'blue'}>
                Status: {submission.status.replace(/_/g, ' ')}
              </Badge>
            </div>
            <p className="text-slate-500 text-lg leading-relaxed">{category.description}</p>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
              <Icon icon="mdi:file-certificate" className="text-lg" />
            </div>
            <h2 className="font-bold text-slate-800 text-lg">Persyaratan Berkas</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {category.requirements.map((req: any) => {
              const doc = submission.documents?.find((d: any) => d.requirement_id === req.id);
              return (
                <div key={req.id} className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors">
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                      {req.name}
                      {req.is_required && <span className="text-rose-500 text-[10px] font-bold bg-rose-50 px-2 py-0.5 rounded uppercase border border-rose-100">Wajib</span>}
                    </h3>
                    <p className="text-sm text-slate-400 mt-1 font-medium flex items-center gap-1">
                      <Icon icon="mdi:file-outline" /> Format: {req.allowed_types.join(', ').toUpperCase()}
                    </p>
                    {doc?.admin_notes && (
                      <div className="mt-4 bg-rose-50 p-4 rounded-2xl border border-rose-100 flex gap-3 items-start">
                        <Icon icon="mdi:alert-circle" className="text-rose-500 text-xl shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-rose-700 text-sm italic">Catatan Perbaikan:</p>
                          <p className="text-rose-600 text-sm mt-0.5">{doc.admin_notes}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="shrink-0 flex items-center gap-4">
                    {doc ? (
                      <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-100 shadow-inner">
                        <div className="px-4">
                          <Badge variant={doc.status === 'sah' ? 'emerald' : doc.status === 'tidak_memenuhi_syarat' ? 'rose' : 'slate'}>
                            {doc.status.replace(/_/g, ' ')}
                          </Badge>
                        </div>

                        <a
                          href={`${import.meta.env.VITE_API_URL || 'http://localhost:7775/api/v1'}/pegawai-portal/submissions/${subId}/documents/${doc.id}/view`}
                          target="_blank" rel="noreferrer"
                          className="w-12 h-12 bg-white text-primary border border-slate-200 hover:border-primary hover:text-primary rounded-xl flex items-center justify-center transition-all shadow-sm group/eye"
                        >
                          <Icon icon="mdi:eye-outline" className="text-2xl group-hover/eye:scale-110 transition-transform" />
                        </a>

                        {isDraft && (doc.status === 'belum_diperiksa' || doc.status === 'tidak_memenuhi_syarat') && (
                          <button onClick={() => handleUploadClick(req.id)} className="w-12 h-12 bg-white text-slate-400 border border-slate-200 hover:border-amber-500 hover:text-amber-600 rounded-xl flex items-center justify-center transition-all shadow-sm group/up">
                            <Icon icon="mdi:cloud-sync" className="text-2xl group-hover/up:rotate-12 transition-transform" />
                          </button>
                        )}
                      </div>
                    ) : (
                      isDraft && (
                        <Button
                          variant="outline"
                          size="md"
                          onClick={() => handleUploadClick(req.id)}
                          leftIcon="mdi:cloud-upload-outline"
                        >
                          Upload File
                        </Button>
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {isDraft && (
          <div className="flex justify-end pt-6">
            <Button
              variant="success"
              size="lg"
              onClick={handleSubmitFinal}
              isLoading={isSubmitting}
              rightIcon="mdi:send-check"
              className="px-12 rounded-2xl"
            >
              Serahkan Berkas Pengajuan
            </Button>
          </div>
        )}

        {/* Webcam Modal */}
        {showWebcamModal && (
          <div className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-xl flex items-center justify-center p-4">
            <div className="bg-white rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="p-10 text-center space-y-8">
                <div>
                  <h3 className="text-3xl font-black text-slate-800">Verifikasi Wajah</h3>
                  <p className="text-slate-500 font-medium mt-2">Pastikan wajah Anda terlihat jelas untuk autentikasi penyerahan berkas.</p>
                </div>

                <div className="aspect-square w-full max-w-sm mx-auto bg-slate-900 rounded-[2.5rem] overflow-hidden border-8 border-slate-100 shadow-inner relative group">
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 border-[2px] border-white/20 rounded-[2rem] m-6 border-dashed pointer-events-none"></div>
                </div>

                <div className="flex flex-col gap-4">
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={processSubmit}
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                    className="py-6 rounded-2xl text-lg font-black shadow-2xl shadow-primary/20"
                    leftIcon="mdi:camera-iris"
                  >
                    Ambil Foto & Kirim Sekarang
                  </Button>
                  <button 
                    onClick={() => setShowWebcamModal(false)}
                    className="text-slate-400 font-bold hover:text-slate-600 transition-colors uppercase tracking-widest text-xs"
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf,.jpg,.jpeg,.png"
        />
      </div>
    </DashboardLayout>
  );
}
