import Carousel from '../components/Carousel';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

export default function ProjectsPage() {
  // Define your project images here
  const projectImages = [
    'https://github.com/SabidurAI/MayaAirwaysSite/assets/36314124/b79068d2-1991-4cca-bbb0-52cc934daacf',
    'https://github.com/SabidurAI/MayaAirwaysSite/assets/36314124/4912eac3-25f2-47d6-b6f7-db4e1ab68bbc',
    'https://github.com/SabidurAI/MayaAirwaysSite/assets/36314124/d7c2d931-ea2a-4c4e-bb8e-849679d7f49',
    // Add more images as needed
  ];
  const globalData = getGlobalData()
  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />
      <Carousel images={projectImages} />
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