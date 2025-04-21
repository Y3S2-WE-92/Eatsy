import { toast } from 'react-hot-toast';

const ToastUtil = {
  success: (message = 'Success!') => {
    toast.success(message, {
      position: 'top-right',
      duration: 3000,
      style: {
        borderRadius: '8px',
        background: '#ecfdf5',
        color: '#065f46',
        border: '1px solid #34d399',
      },
    });
  },

  error: (message = 'Something went wrong!') => {
    toast.error(message, {
      position: 'top-right',
      duration: 4000,
      style: {
        borderRadius: '8px',
        background: '#fef2f2',
        color: '#991b1b',
        border: '1px solid #f87171',
      },
    });
  },

  loading: (message = 'Loading...') => {
    return toast.loading(message, {
      position: 'top-right',
      style: {
        borderRadius: '8px',
        background: '#eff6ff',
        color: '#1d4ed8',
        border: '1px solid #60a5fa',
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

export default ToastUtil;
