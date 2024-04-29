import { getGlobalData } from '../../utils/global-data';
import {
  getNextPostBySlug,
  getPostBySlug,
  getPreviousPostBySlug,
  postFilePaths,
} from '../../utils/mdx-utils';

import { MDXRemote } from 'next-mdx-remote';
import Head from 'next/head';
import CustomLink from '../../components/CustomLink';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout, { GradientBackground } from '../../components/Layout';
import SEO from '../../components/SEO';
import { useTranslation } from 'next-i18next';

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  a: CustomLink,
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  Head,
};

export default function PostPage({
  source,
  frontMatter,
  globalData,
}) {
  const { t } = useTranslation('posts');
  return (
    <Layout>
      <SEO
        title={`${frontMatter.title} - ${globalData.name}`}
        description={frontMatter.description}
      />
      <Header name={globalData.name} />
      <article className="px-6 md:px-0">
        <header>
          <h1 className="text-3xl md:text-5xl dark:text-white text-center mb-12">
            {t(frontMatter.title)}
          </h1>
          {frontMatter.description && (
            <p className="text-xl mb-4">{t(frontMatter.description)}</p>
          )}
        </header>
        <main>
          <article className="prose dark:prose-dark">
            <MDXRemote {...source} components={components} />
          </article>
        </main>
        
      </article>
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="absolute -top-32 opacity-30 dark:opacity-50"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

export const getStaticProps = async ({ params, locale }) => {
  const globalData = getGlobalData();
  // Fetch post data based on locale
  const { mdxSource, data } = await getPostBySlug(params.slug, locale);
  const prevPost = getNextPostBySlug(params.slug, locale);
  const nextPost = getPreviousPostBySlug(params.slug, locale);

  return {
    props: {
      globalData,
      source: mdxSource,
      frontMatter: data,
      prevPost,
      nextPost,
    },
  };
};

export const getStaticPaths = async ({ locales }) => {
  const paths = [];
  for (const locale of locales) {
    const localePaths = postFilePaths
      .map((path) => path.replace(/\.mdx?$/, ''))
      .map((slug) => ({ params: { slug }, locale }));
    paths.push(...localePaths);
  }

  return {
    paths,
    fallback: false,
  };
};
