import { api_kepegawaian } from "@/config/api";

export const getCategories = async () => {
  const res: any = await api_kepegawaian.get('/pegawai-portal/categories');
  return res.categories || [];
};

export const getMySubmissions = async () => {
  const res: any = await api_kepegawaian.get('/pegawai-portal/submissions');
  return res.submissions || [];
};

export const createSubmission = async (categoryId: number) => {
  const res: any = await api_kepegawaian.post('/pegawai-portal/submissions', { category_id: categoryId });
  return res.submission;
};

export const uploadSubmissionDocument = async (submissionId: string, requirementId: number, file: File) => {
  const formData = new FormData();
  formData.append('requirement_id', requirementId.toString());
  formData.append('file', file);

  const res: any = await api_kepegawaian.post(`/pegawai-portal/submissions/${submissionId}/documents`, formData);
  return res.document;
};

export const submitSubmission = async (submissionId: string) => {
  const res: any = await api_kepegawaian.post(`/pegawai-portal/submissions/${submissionId}/submit`);
  return res;
};

export const getDocumentPreviewUrl = (submissionId: string, docId: number) => {
  // Since we use download/preview via API, we return the full URL with token handled by interceptor or as a separate link
  // But for raw <img> or <iframe>, we might need a blob or a direct URL if the API supports it.
  // For now, we'll return the relative path that the interceptor can handle or a direct URL.
  return `${import.meta.env.VITE_API_BASE_URL}/v1/pegawai-portal/submissions/${submissionId}/documents/${docId}/view`;
};
