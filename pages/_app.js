import '../styles/globals.css';
import 'prismjs/themes/prism-tomorrow.css';
import { appWithTranslation } from 'next-i18next'; 

function MyApp({ Component, pageProps }) {
  return (
    <>
      <span className="theme-bejamas" />
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(MyApp);
