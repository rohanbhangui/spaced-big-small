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

  console.log("DEBUG", fileName)

  return fileName as BrandDataProps;
}

const Layout = async ({params}: PageProps) => {
  let data: BrandDataProps;
  try {
    data = await fetchData(params);
  } catch (err) {
    return <NotFound />;
  }

  return <BrandLayout data={data} />;
}

export default Layout;
