import NotFound from '@/components/NotFound';
import fs from 'fs';
import { BrandDataProps } from '../brands/[slug]/brandLayout';

import PageLayout from './brandsLayout';

const fetchBrands = async () => {
  // get list of files from the brands folder
  const files = fs.readdirSync('brands');

  // get each json
  const brandFiles = files.map((fileName) => {
      const slug = fileName.replace('.json', '');
      const readFile = fs.readFileSync(`brands/${fileName}`, 'utf-8');

      const { montageItems, highlightGrid, ...rest } = JSON.parse(readFile);

      return {
        ...rest,
      }
  });

  // Return the pages static props
  return brandFiles;
}

export const generateMetadata = async () => {

  const title = `Spacd - Find Small Business Brands`;
  const seo_img = `${process.env.NEXT_PUBLIC_HOST}/social-sharing.png`;
  const url = `${process.env.NEXT_PUBLIC_HOST}/search`;
  const description = "We collect the best products for all of the spaces in your home. We do this by sourcing far and wide: Magazines, Blogs, TikTok, Instagram."
  const tags = [
    "spacd",
    "buy small",
    "small business",
    "gift",
    "gift ideas",
    "plaen",
  ]
  
  return { 
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
      siteName: 'Spacd',
      images: [
        {
          url: seo_img,
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
      url
    },
  }
}

// The Brands Search Page Content
const Layout = async (): Promise<JSX.Element> => {
    let brandsData;

    try {
      brandsData = await fetchBrands();
    } catch (err) {
      return <NotFound />;
    }

    const brands = await Promise.all(
      brandsData.map(async(item) => {
        const { headerImage: headerImg, montageItems, highlightGrid, ...rest } = item;
        const headerImage = await import(`@/assets/img/${headerImg}`);

        return {
          ...rest,
          headerImage: JSON.stringify(headerImage)
        }
      })
    )

    return (
      <PageLayout brands={brands} />
    )
}

export default Layout;