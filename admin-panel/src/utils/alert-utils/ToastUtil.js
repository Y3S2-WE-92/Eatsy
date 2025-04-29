import { useContext } from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import { toast } from 'react-hot-toast';

export const useToast = () => {
  const { theme } = useContext(ThemeContext);

  const isDark = theme === 'dark';

  return {
    info: (message = 'Info!') => {
      toast(message, {
        position: 'top-right',
        duration: 3000,
        style: {
          borderRadius: '8px',
          background: isDark ? '#1e293b' : '#f0f9ff',
          color: isDark ? '#f8fafc' : '#1e3a8a',
          border: '1px solid',
          borderColor: isDark ? '#334155' : '#bfdbfe',
        },
      });
    },

    warning: (message = 'Warning!') => {
      toast(message, {
        position: 'top-right',
        duration: 3000,
        style: {
          borderRadius: '8px',
          background: isDark ? '#78350f' : '#fffbeb',
          color: isDark ? '#fde68a' : '#92400e',
          border: '1px solid',
          borderColor: isDark ? '#fbbf24' : '#fbbf24',
        },
      });
    },

    success: (message = 'Success!') => {
      toast.success(message, {
        position: 'top-right',
        duration: 3000,
        style: {
          borderRadius: '8px',
          background: isDark ? '#064e3b' : '#ecfdf5',
          color: isDark ? '#6ee7b7' : '#065f46',
          border: '1px solid',
          borderColor: isDark ? '#34d399' : '#34d399',
        },
      });
    },

    error: (message = 'Something went wrong!') => {
      toast.error(message, {
        position: 'top-right',
        duration: 4000,
        style: {
          borderRadius: '8px',
          background: isDark ? '#7f1d1d' : '#fef2f2',
          color: isDark ? '#fecaca' : '#991b1b',
          border: '1px solid',
          borderColor: isDark ? '#f87171' : '#f87171',
        },
      });
    },

    loading: (message = 'Loading...') => {
      return toast.loading(message, {
        position: 'top-right',
        style: {
          borderRadius: '8px',
          background: isDark ? '#1e40af' : '#eff6ff',
          color: isDark ? '#bfdbfe' : '#1d4ed8',
          border: '1px solid',
          borderColor: isDark ? '#60a5fa' : '#60a5fa',
        },
      });
    },

    dismiss: (id) => {
      toast.dismiss(id);
    },

    promise: (promise, { loading = 'Loading...', success = 'Success!', error = 'Error!' }) => {
      return toast.promise(promise, {
        loading,
        success,
        error,
      }, {
        position: 'top-right',
      });
    },
  };
};
