import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypePrism from '@mapbox/rehype-prism';
import remarkGfm from 'remark-gfm';

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH = path.join(process.cwd(), 'posts');

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  // Only include md(x) files
  .filter((filePath) => /\.mdx?$/.test(filePath));

export const sortPostsByDate = (posts) => {
  return posts.sort((a, b) => {
    const aDate = new Date(a.data.date);
    const bDate = new Date(b.data.date);
    return bDate - aDate;
  });
};

export const getPosts = (locale) => {
  let posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const { content, data } = matter(source);

    // Check if the post has a locale field and match it with the current locale
    if (data.locale === locale) {
      return {
        content,
        data,
        filePath,
      };
    }
    return null;
  });

  // Filter out null values and sort by date
  posts = sortPostsByDate(posts.filter(post => post));

  return posts;
};

export const getPostBySlug = async (slug, locale) => {
  const postFilePath = path.join(POSTS_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  // Check if the post has a locale field and match it with the current locale
  if (data.locale === locale) {
    const mdxSource = await serialize(content, {
      // Optionally pass remark/rehype plugins
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypePrism],
      },
      scope: data,
    });
  
    return { mdxSource, data, postFilePath };
  }

  return null;
};

export const getNextPostBySlug = (slug, locale) => {
  const posts = getPosts(locale);
  // Find the index of the current post
  const currentIndex = posts.findIndex((post) => post.filePath === `${slug}.mdx`);
  // Get the next post based on the index
  const nextIndex = currentIndex - 1;
  if (nextIndex >= 0) {
    const nextPost = posts[nextIndex];
    return {
      title: nextPost.data.title,
      slug: nextPost.filePath.replace(/\.mdx?$/, ''),
    };
  }
  return null;
};

export const getPreviousPostBySlug = (slug, locale) => {
  const posts = getPosts(locale);
  // Find the index of the current post
  const currentIndex = posts.findIndex((post) => post.filePath === `${slug}.mdx`);
  // Get the previous post based on the index
  const previousIndex = currentIndex + 1;
  if (previousIndex < posts.length) {
    const previousPost = posts[previousIndex];
    return {
      title: previousPost.data.title,
      slug: previousPost.filePath.replace(/\.mdx?$/, ''),
    };
  }
  return null;
};
