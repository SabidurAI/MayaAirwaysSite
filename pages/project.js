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
      <h1>Lo que hemos hecho hasta ahora</h1>
      Bicicletas armadas hasta ahora
      <br />
      Hay tres series de bicicletas:
      <ul>
        <li><b>Bourdieu:</b> bicicletas armadas con repuestos nuevos.</li>
        <li><b>Fénix:</b> bicicletas restauradas (según el caso, con repuestos usados y nuevos).</li>
        <li><b>Wollstonecraft:</b> bicicletas armadas con piezas usadas (y algunas nuevas).</li>
      </ul>

      <a href="https://www.flickr.com/photos/sabidurai/albums">Colección fotográfica completa acá</a> -
      <a href="https://bit.ly/maya-air-photos">https://bit.ly/maya-air-photos</a>
      <br />

      Mientras se entregan, algunas de las bicicletas son exhibidas en las tiendas de Moovil y en Bicihangar.

      Todas las bicicletas tienen un escudo de Garage 529 para registrarse en ese sistema de seguimiento de bicicletas, que complementa el Registro Bici de Bogotá.

      <h2>La flota hasta ahora</h2>
      <br />
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