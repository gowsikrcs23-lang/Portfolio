import { useState, useEffect } from 'react';

export default function Popup() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-16 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 max-w-sm">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800">Welcome!</h3>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
      <p className="text-gray-600 text-sm">
        Thanks for visiting my portfolio. Feel free to explore my projects!
      </p>
    </div>
  );
}