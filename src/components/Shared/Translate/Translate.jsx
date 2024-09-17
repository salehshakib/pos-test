// import { useEffect, useRef } from 'react';

// const Translate = () => {
//   const googleTranslateRef = useRef(null);

//   useEffect(() => {
//     let intervalId;

//     const checkGoogleTranslate = () => {
//       if (window.google && window.google.translate) {
//         clearInterval(intervalId);
//         new window.google.translate.TranslateElement(
//           {
//             pageLanguage: 'en',
//             layout:
//               window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//           },
//           googleTranslateRef.current
//         );
//       }
//     };

//     intervalId = setInterval(checkGoogleTranslate, 100);

//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <div>
//       <div ref={googleTranslateRef}></div>
//     </div>
//   );
// };

// export default Translate;

import { useEffect, useRef } from 'react';

const Translate = () => {
  const googleTranslateRef = useRef(null);

  useEffect(() => {
    const loadGoogleTranslateScript = () => {
      if (!document.querySelector('script[src*="translate.google.com"]')) {
        const script = document.createElement('script');
        script.src =
          'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);
      }
    };

    const initGoogleTranslate = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          googleTranslateRef.current
        );
      }
    };

    // Check if the script is already loaded
    if (window.google && window.google.translate) {
      initGoogleTranslate();
    } else {
      window.googleTranslateElementInit = initGoogleTranslate;
      loadGoogleTranslateScript();
    }
  }, []);

  return <div ref={googleTranslateRef}></div>;
};

export default Translate;
