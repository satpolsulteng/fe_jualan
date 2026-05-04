import React from 'react';
import { Icon } from '@iconify/react';
import { logoutPegawai } from '@/services/authService';

import { useTheme } from '@/provider/ThemeProvider';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
            <Icon icon="mdi:user-tie" className="text-xl" />
          </div>
          <span className="font-bold font-heading text-slate-800 dark:text-slate-100 text-lg">Portal Pegawai</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary-dark transition-all bg-slate-100 dark:bg-slate-800"
          >
            <Icon icon={theme === 'light' ? 'mdi:weather-night' : 'mdi:weather-sunny'} className="text-xl" />
          </button>

          <button 
            onClick={logoutPegawai} 
            className="text-slate-500 hover:text-rose-500 dark:text-slate-400 dark:hover:text-rose-400 flex items-center gap-2 text-sm font-semibold transition-all hover:bg-rose-50 dark:hover:bg-rose-900/20 px-3 py-1.5 rounded-lg"
          >
            <span className="hidden sm:inline">Keluar</span>
            <Icon icon="mdi:logout" className="text-xl" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
