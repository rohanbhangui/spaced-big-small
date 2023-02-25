import fs from "fs";
import NotFound from "../../components/NotFound";
import BrandLayout, { BrandDataProps } from "./brandLayout";

export const config = {
  dynamicParams: true
}

export type PageParams = Record<string, string | string[]>;
export interface PageProps {
  params?: PageParams;
  searchParams?: Record<string, string | string[]>;
}


export const generateStaticParams = async (): Promise<PageParams[]> => {
  const files = fs.readdirSync("brands");
  // Generate a path for each one
  const paths = files.map((fileName) => ({
    slug: fileName.replace(".json", ""),
  }));

  // return list of paths
  return paths;
}

const fetchData = async (params: PageProps["params"]) => {
  const slug = params?.slug;
  const fileName = JSON.parse(fs.readFileSync(`brands/${slug}.json`, 'utf-8'));

  return fileName as BrandDataProps;
}

const Layout = async ({params}: PageProps) => {
  let data: BrandDataProps;
  try {
    data = await fetchData(params);
  } catch (err) {
    return <NotFound />;
  }

  // // headerImage
  // const headerImage = await import(`@/assets/img/${data.headerImage}`);
  
  // // montage Images
  // const montageItems = await Promise.all(
  //   data.montageItems.map(async(item) => {
  //     const imported = await import(`@/assets/img/${item.img}`);
  //     return {
  //       ...item,
  //       img: JSON.stringify(imported)
  //     }
  //   })
  // );

  // // highlightGrid
  // const highlightGrid = await Promise.all(
  //   data.highlightGrid.map(async (item) => {
  //     const img = await import(`@/assets/img/${item.img}`);
  //     const thumbnail = await import(`@/assets/img/${item.hover_thumbnail}`);

  //     return {
  //       ...item,
  //       img: JSON.stringify(img),
  //       hover_thumbnail: JSON.stringify(thumbnail)
  //     }
  //   })
  // )

  // return <BrandLayout data={{
  //   ...data,
  //   headerImage: JSON.stringify(headerImage),
  //   montageItems,
  //   highlightGrid,
  // }} />;

  return <BrandLayout data={data} />
}

export default Layout;
