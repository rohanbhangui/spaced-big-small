export const generateMetadata = async () => {

  const title = `Spacd - Find Small Business Brands`;
  const seo_img = `${process.env.NEXT_PUBLIC_HOST}/social-sharing.png`;
  const url = `${process.env.NEXT_PUBLIC_HOST}`;
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

const Home = () => {
  return <>This is the home page</>
}

export default Home;