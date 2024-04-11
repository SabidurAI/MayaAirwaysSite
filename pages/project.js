import Carousel from '../components/Carousel';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

export default function ProjectsPage() {
  const globalData = getGlobalData()
  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />
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