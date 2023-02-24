import NotFound from '@/components/NotFound';
import fs from 'fs';
import { BrandDataProps } from '../[slug]/brandLayout';

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