import React, { useEffect, useState } from 'react';

const Spacing = () => {
  const [showMe, setShowMe] = useState(false);

  const handler = () => {
    const navbar = document.querySelector('.navbar');
    if(navbar.classList.contains('scrolled')) {
      setShowMe(true);
    } else {
      setShowMe(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div>
      <div style={{ height: showMe ? '100px' : '0px' }}></div>
    </div>
  );
}

export default Spacing;
