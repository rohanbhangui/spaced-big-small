
export type BrandDataProps = {
  title: string;
  theme: {
    colors: {
      primary: string;
      background: string;
    }
  },
  description: string;
}

const BrandLayout = ({data}: { data: BrandDataProps }) => {
  const {
    title
  } = data;

  return (
    <>{title}</>
    
  )
}

export default BrandLayout;