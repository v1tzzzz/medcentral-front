import { useEffect } from 'react';

const VLibras = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.VLibras) {
        new window.VLibras.Widget('https://vlibras.gov.br/app');
      }
    };

    return () => script.remove();
  }, []);

  return (
<div data-vw="true" className="enabled">
  <div data-vw-access-button="true" className="active"></div>
  <div data-vw-plugin-wrapper="true">
    <div className="vw-plugin-top-wrapper"></div>
  </div>
</div>
  );
};

export default VLibras;

