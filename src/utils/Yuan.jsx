import React, { useEffect, useRef } from 'react';
import { yuan } from '../components/Charts';

const Yuan = ({ children }) => {
  const ref = useRef();

  const renderToHtml = () => {
    if (ref.current) {
      ref.current.innerHTML = yuan(children);
    }
  };

  useEffect(() => renderToHtml(), [children]);

  return <span ref={ref} />;
};

export default Yuan;
