import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('posts', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'ooo',
    description: 'out of office',
    site: context.site!,
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    items: posts.map((post) => ({
      link: `${import.meta.env.BASE_URL}posts/${post.slug}/`,
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate
    }))
  });
}
