import fs from 'fs';
import NotFound from '@/components/NotFound';

import SpacesLayout from './spacesLayout';
import { lowerCase, startCase } from 'lodash';
import path from 'path';
import { SPACES } from '@/utils/constants';
import { encodeSpaceUrlParam } from '@/utils/utils';

export const config = {
  dynamicParams: true
}

export type PageParams = Record<string, string | string[]>;
export interface PageProps {
  params?: PageParams;
  searchParams?: Record<string, string | string[]>;
}

export const generateMetadata = async ({ params }: { params: PageProps["params"]}) => {
  const title = `ProjectSpce - Find Small Business Brands`;
  const seo_img = `${process.env.NEXT_PUBLIC_HOST}/api/og`;
  const initialUrl = `${process.env.NEXT_PUBLIC_HOST}`;
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
  ];
  const canonical = `${initialUrl}/spaces/${params?.slug}`
  const url = canonical;

  return { 
    title,
    description,
    applicationName: title,
    keywords: tags,
    alternates: {
      canonical,
    },
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
    other: {
      "theme-color": "#ffffff"
    }
  }
}

export const generateStaticParams = async (): Promise<PageParams[]> => {
  // Generate a path for each one
  const paths = Object.keys(SPACES).map((space) => ({
    slug: encodeSpaceUrlParam(space),
  }));

  // return list of paths
  return paths;
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


// filter brands that dont match the tags
const isInSpace = (brands: any[], elem: string) => {
  return brands.filter((brand) => {
    return brand.tags.includes(elem.toLowerCase()) || (brand?.hiddenTags ?? []).includes(elem.toLowerCase());
  });
}

const Layout = async ({params}: PageProps): Promise<JSX.Element> => {
    let brandsData;
    try {
      brandsData = await fetchBrands();
    } catch (err) {
      console.error(err);
      return <NotFound />;
    }
    

    // if slug is not a string show not found
    const rawSlug = params?.slug as string;
    const slug = lowerCase(decodeURIComponent(rawSlug));
    if(!slug || !Object.keys(SPACES).map(space => encodeSpaceUrlParam(space)).includes(rawSlug)) return <NotFound />

    const brands = await Promise.all(
      isInSpace(brandsData, slug).map(async(item) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { headerImage: headerImg, montageItems, highlightGrid, ...rest } = item;
        const headerImage = await import(`@/assets/img/${headerImg}`);

        return {
          ...rest,
          headerImage: JSON.stringify(headerImage)
        }
      })
    );

    const title = slug === "edc" ? "EDC" : startCase(slug);

    return (
      <SpacesLayout title={title} brands={brands.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()))} />
    )
}

export default Layout;