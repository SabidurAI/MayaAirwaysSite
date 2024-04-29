import Carousel from '../components/Carousel';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function ProjectsPage() {
  const globalData = getGlobalData();
  const { t } = useTranslation('project')
  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />
      {/**<h1>Lo que hemos hecho hasta ahora</h1>*/}
      {t('title')}
      <br />
      <Image 
      src="/imagenes/proj.jpg" 
      alt="Bici de frente" 
      width={1000}
      height={1000}
      />
      {t('subt1')}
      <ul>
        <li><b>Bourdieu:</b> {t('Bourdieu')}</li>
        <li><b>Fénix:</b> {t('Fénix')}</li>
        <li><b>Wollstonecraft:</b> {t('Wollstonecraft')}</li>
      </ul>
      <Image src="/imagenes/actual.png" alt="colage de bicicletas" 
      width={1000}
      height={1000}
      />
      <a href="https://www.flickr.com/photos/sabidurai/albums">{t('foto_gallery')}</a> -
      <a href="https://bit.ly/maya-air-photos">https://bit.ly/maya-air-photos</a>
      <br />

      {t('par1')}

      <h2>{t('subt2')}</h2>
      <br />
      {/*TODO locale carusel*/}
      <Carousel googleSheetUrl="https://docs.google.com/spreadsheets/d/e/2PACX-1vSqADBj2MZroHM0PC2WDCJ51Za_0Meq9MkNvVPZPm13ljcudVZBKE5W0Th345EsQzrNcO-ujwy6qpYJ/pub?output=csv" />
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="fixed top-20 opacity-40 dark:opacity-60"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}
export async function getStaticProps({locale}) {
  
  const globalData = getGlobalData();

  return {props: {
    ...(await serverSideTranslations(locale, ['project', 'common',])),
    globalData,
  },
 };
}