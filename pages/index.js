import React, { useState } from 'react';
import Link from 'next/link';
import { getPosts } from '../utils/mdx-utils';
import { getGlobalData } from '../utils/global-data';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import SEO from '../components/SEO';
import { serverSideTranslations} from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function Index({ posts, globalData }) {
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation('common');
  const filteredPosts = posts.filter(post => {
    const title = post.data.title.toLowerCase();
    const description = post.data.description.toLowerCase();
    return title.includes(searchTerm.toLowerCase()) || description.includes(searchTerm.toLowerCase());
  });

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />
      <main className="w-full">
        <h1 className="text-3xl lg:text-5xl text-center mb-12">
          {globalData.blogTitle}
        </h1>
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Buscarn en publicaciones..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <ul className="w-full">
          {filteredPosts.map(post => (
            <li
              key={post.filePath}
              className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
            >
              <Link
                as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                href={`/posts/[slug]`}
                className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4"
              >
                {post.data.date && (
                  <p className="uppercase mb-3 font-bold opacity-60">
                    {post.data.date}
                  </p>
                )}
                <h2 className="text-2xl md:text-3xl">{post.data.title}</h2>
                {post.data.description && (
                  <p className="mt-3 text-lg opacity-60">
                    {post.data.description}
                  </p>
                )}
                <ArrowIcon className="mt-4" />
              </Link>
            </li>
          ))}
        </ul>
      </main>
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
  let posts = getPosts();
  
  // Sort posts by date by default
  posts = posts.sort((a, b) => {
    const dateA = new Date(a.data.date);
    const dateB = new Date(b.data.date);
    return dateB - dateA; // Sort in descending order
  });

  const globalData = getGlobalData();

  return {props: {
    ...(await serverSideTranslations(locale, ['common'])),
    posts,
    globalData,
  },
 };
}

