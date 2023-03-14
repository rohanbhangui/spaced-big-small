import NotFound from '@/components/NotFound';
import fs from 'fs';
import { countBy } from 'lodash';
import path from 'path';

import PageLayout from './brandsLayout';

const title = `ProjectSpce - Find Small Business Brands`;
const seo_img = `${process.env.NEXT_PUBLIC_HOST}/img/social-sharing.png`;
const url = `${process.env.NEXT_PUBLIC_HOST}`;
const description = "We collect the best products for all of the spaces in your home. We do this by sourcing far and wide: Magazines, Blogs, TikTok, Instagram."
const tags = [
  "spce",
  "project",
  "space",
  "buy small",
  "small business",
  "gift",
  "gift ideas",
  "plaen",
]

export const metadata = { 
  title,
  description,
  applicationName: title,
  keywords: tags,
  icons: {
    icon: '/icon.png',
    shortcut: '/shortcut-icon.png',
    apple: '/apple-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
  openGraph: {
    title,
    description,
    url,
    siteName: 'ProjectSpce',
    images: [
      {
        url: seo_img,
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [seo_img],
  },
  // other: {
  //   "og:image": seo_img,
  //   "og:image:secure_url": seo_img
  // },
}

const fetchBrands = async () => {
  // get list of files from the brands folder
  const files = fs.readdirSync(path.resolve(process.cwd(), 'brands'));

  // get each json
  const brandFiles = files.map((fileName) => {
      const readFile = fs.readFileSync(`brands/${fileName}`, 'utf-8');

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { montageItems, highlightGrid, ...rest } = JSON.parse(readFile);

      return {
        ...rest,
      }
  });

  // Return the pages static props
  return brandFiles;
}

export const dynamic = 'force-dynamic';
const Layout = async (): Promise<JSX.Element> => {
    let brandsData;

    try {
      brandsData = await fetchBrands();
    } catch (err) {
      return <NotFound />;
    }

    let rawTags: string[] = [];

    const brands = await Promise.all(
      brandsData.map(async(item) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { headerImage: headerImg, montageItems, highlightGrid, ...rest } = item;
        const headerImage = await import(`@/assets/img/${headerImg}`);

        rawTags = [...rawTags, ...rest.tags];

        return {
          ...rest,
          headerImage: JSON.stringify(headerImage)
        }
      })
    );

    const tags = countBy(rawTags)

    return (
      <PageLayout brands={brands.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()))} tags={tags} />
    )
}

export default Layout;