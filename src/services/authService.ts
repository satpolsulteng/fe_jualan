export const loginPegawai = async (credentials: any) => {
  // Use gateway API
  const { gatewayApi } = await import('../config/api');
  const res = await gatewayApi.post('/login', credentials);
  return res;
};



export const getProfile = async () => {
  const { api_kepegawaian } = await import('../config/api');
  const res: any = await api_kepegawaian.get('pegawai-portal/profile');
  // res is already res.data.data because of interceptor
  return res;
};

export const logoutPegawai = () => {
  localStorage.removeItem('pegawai_access_token');
  localStorage.removeItem('pegawai_user');
  window.location.href = '/login';
};
