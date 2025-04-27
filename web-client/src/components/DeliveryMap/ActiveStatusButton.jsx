import React, { useRef } from 'react';
import lottie from 'lottie-web';
import activeAnimation from '../../assets/icons/Active.json';

const ActiveStatusButton = ({ isActive, toggleActiveStatus }) => {
  const lottieRef = useRef(null);

  React.useEffect(() => {
    const lottieInstance = lottie.loadAnimation({
      container: lottieRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: isActive,
      animationData: activeAnimation,
    });

    return () => {
      lottieInstance.destroy();
    };
  }, [isActive]);

  return (
    <button
      onClick={toggleActiveStatus}
      style={{
        position: 'absolute',
        top: '110px',
        right: '10px',
        zIndex: 1000,
        padding: '10px 20px',
        backgroundColor: isActive ? 'gray' : 'red',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <div
        ref={lottieRef}
        style={{
          width: '40px',
          height: '40px',
          display: isActive ? 'block' : 'none',
        }}
      />
      {isActive ? 'I AM ACTIVE' : 'NOT ACTIVE'}
    </button>
  );
};

export default ActiveStatusButton;
