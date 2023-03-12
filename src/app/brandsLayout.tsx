'use client';

import { desktopFHD, largeDesktop, smallDesktop, ThemeType } from "@/assets/styles/themeConfig";
import { useEffect, useRef, useState, MouseEvent } from "react";
import styled, { useTheme } from "styled-components";
import { BrandDataProps } from "./brands/[slug]/brandLayout";
import Image from "next/image";
import Link from 'next/link';
import { useDebounce, useMediaQuery } from "@/utils/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import BrandHeader from "@/components/BrandHeader";
import TextTransition, { presets } from "react-text-transition";
import HeroImage from "@/assets/img/hero-image.png";
import { analytics, Event } from "@/utils/analytics";

type BrandOrder = BrandDataProps & {
  count: number;
}

const Container = styled.div`

  .link-button.collapse {
    z-index: 120;
    cursor: pointer;
    position: absolute;
    right: 1rem;
    top: 1.5rem;
    background: none;
    color: rgba(0, 0, 0, 0.5);
    transition: 0.1s ease-in-out;
    border: none;
    
    &:hover {
      text-decoration: underline;
      color: rgba(0, 0, 0, 1);
    }
  }
  
  .search-bar {
    max-width: ${largeDesktop}px;
    width: 100%;
    margin: 0.5rem auto 1rem;
    display: flex;
    align-items: center;
    /* border-bottom: 2px solid rgba(0, 0, 0, 0.33); */
    transition: border-bottom 0.25s ease-in-out;
    padding: 0 1.5rem;

    @media ${({ theme }) => theme.mediaQuery.tablet} {
      margin: 1rem auto 2rem;
    }

    /* &:focus-within {
      border-bottom: 2px solid rgba(0, 0, 0, 1);
    } */

    input {
      width: 100%;
      padding: 0.5rem 1rem;
      font-size: 1.2rem;
      border: none;
      outline: none;

      @media ${({ theme }) => theme.mediaQuery.tablet} {
        font-size: 2rem;
      }

    }

    .pick-random {
      color: #999;

      i {
        color: #999;
        margin-right: 1rem;
      }

      @media ${({ theme }) => theme.mediaQuery.smallTablet} {
        font-size: 0.7rem;
        border: 1px solid #999;
        color: #999;
        flex: 1;
        white-space: nowrap;
        border-radius: 4rem;
        padding: 0.25rem 0.5rem;
      }
    }

    i.fa-xmark, i.fa-magnifying-glass {
      font-size: 1.2rem;
      display: flex;
      align-items: center;

      @media ${({ theme }) => theme.mediaQuery.tablet} {
        font-size: 1.5rem;
      }
    }

    i.fa-xmark {
      color: rgba(0, 0, 0, 0.33);
      cursor: pointer;
      margin-left: 0.5rem;

      @media ${({ theme }) => theme.mediaQuery.tablet} {
        margin-left: 1rem;
      }

      &:hover {
        color: rgba(0, 0, 0, 1);
      }
    }
  }
`

const Hero = styled.div`
  background: #F1F1F1;
  margin-top: -4rem;

  .header {
    position: sticky;
    top: 0rem;
    z-index: 100;
    mix-blend-mode: difference;
  }

  .wrapper {
    max-width: ${smallDesktop}px;
    width: 100%;
    margin: 4rem auto 0;
    display: grid;
    grid-template-columns: repeat(1, 1fr);

    @media ${({ theme }) => theme.mediaQuery.smallTablet} {
      grid-template-columns: repeat(12, 1fr);
    }

    @media ${({ theme }) => theme.mediaQuery.desktopFHD} {
      max-width: ${desktopFHD}px;
    }

    .content {
      grid-column: 1/13;
      align-self: center;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      text-align: center;
      margin-top: 2rem;
      margin-bottom: 2rem;

      @media ${({ theme }) => theme.mediaQuery.smallTablet} {
        text-align: left;
        grid-column: 1/6;
      }

      .inner {
        width: 100%;
        padding-left: 0rem;

        @media ${({ theme }) => theme.mediaQuery.smallTablet} {
          padding-left: 1rem;
          width: auto;
        }
      }

      h1 {
        display: block;
        max-width: 20rem;
        width: 100%;
        margin: 0 auto;
        color: rgba(0, 0, 0, 0.5);

        @media ${({ theme }) => theme.mediaQuery.smallTablet} {
          max-width: 30rem;
          margin: 0;
        }

        em {
          color: rgba(0, 0, 0, 1);
          font-style: normal;
          overflow: hidden;

          > div {
            justify-content: center;

            @media ${({ theme }) => theme.mediaQuery.smallTablet} {
              justify-content: flex-start;
            }
          }
        }
      }

      button {
        padding: 0.5rem 1.75rem;
        border-radius: 0.6rem;
        border: none;
        cursor: pointer;
        margin-top: 1rem;
        margin-bottom: 3rem;
        font-size: 1.05rem;

        @media ${({ theme }) => theme.mediaQuery.smallTablet} {
          margin-top: 2rem;
        }

        &.subscribe-button {
          background: black;
          color: white;
          border: 2px solid black;
          margin-right: 0.5rem;
        }

        &.go-to-app {
          border: 2px solid black;
          color: black;
        }
      }
    }

    .img-container.hero {
      grid-column: 1/13;
      max-width: 20rem;
      width: 100%;
      margin: 0 auto;

      @media ${({ theme }) => theme.mediaQuery.smallTablet} {
        max-width: none;
        grid-column: 6/13;
      }
      
      img {
        width: 100%;
        height: auto;
        display: block;
      }
    }
  }

  .white-bar {
    height: 4rem;
    width: 100%;
    background: white;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-auto-rows: min-content;
  grid-gap: 0.8rem;
  max-width: ${largeDesktop}px;
  width: 100%;
  margin: 1rem auto 2rem;
  padding: 0 0.8rem;
  min-height: calc(100vh - 4rem);

  @media ${({ theme }) => theme.mediaQuery.phone} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    grid-template-columns: repeat(3, 1fr);
    margin: 2rem auto;
  }

  @media ${({ theme }) => theme.mediaQuery.largeDesktop} {
    grid-template-columns: repeat(4, 1fr);
  }

  .brand-tile {
    aspect-ratio: 4/3;
    position: relative;
    transition: border-radius 0.25s ease-in-out;
    border-radius: 0rem;
    overflow: hidden;

    &:hover {
      border-radius: 1rem;

      .direct {
        display: inline-flex;
      }
    }

    .overlay {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      inset: 0;
      background: rgba(0, 0, 0, 0.25);

      .titling {
        color: white;
        font-weight: 600;
        font-size: 1.5rem;
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .direct {
      position: absolute;
      right: 0.75rem;
      top: 0.75rem;
      color: white;
      border-radius: 2rem;
      height: 2rem;
      width: 2rem;
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 10;
      transition: 0.1s ease-in-out;
      display: inline-flex;

      @media ${({ theme }) => theme.mediaQuery.phone} {
        display: none;
      }

      &:hover {
        background: rgba(255, 255, 255, 1);
        color: black;
      }
    }
  }
`

const TagsList = styled.section`
  height: 2rem;
  overflow: hidden;
  padding: 0 1rem;
  margin: 0 auto;
  max-width: ${largeDesktop}px;

  .inner {
    overflow: scroll;
    overflow-y: hidden;
    display: flex;
    flex-wrap: nowrap;
    gap: 0.5rem;
    height: 4rem;
    align-items: flex-start;

    .tag {
      padding: 0.3rem 0.6rem;
      border: 1px solid #bbbbbb;
      border-radius: 5rem;
      color: black;
      font-size: 0.8rem;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      white-space: nowrap;

      span {
        font-size: 0.8rem;
        color: #ffffff;
        background: #bbbbbb;
        display: inline-block;
        margin-right: 0.25rem;
        padding: 0 0.35rem;
        border-radius: 5rem;
      }

      &.active {
        background: #111111;
        border: 1px solid #111111;
        color: white;
        
        span {
          color: white;
          background: rgba(255, 255, 255, 0.33);
        }
      }
    }
  }
`

const NoResult = styled.div`
  width: 100%;
  margin: 2rem auto;
  max-width: ${largeDesktop}px;
  padding: 0 1rem;

  h2 {
    width: 100%;
    color: rgba(0, 0, 0, 0.5);
  }
`

const Text = [
  "Living Room",
  "Bedroom",
  "Kitchen",
  "Pockets",
  "Car",
  "Wardrobe",
  "Night Out",
]

const Search = ({ brands, tags }: { brands: BrandDataProps[], tags: Record<string,number> }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = useTheme() as ThemeType;
  const searchRef = useRef<HTMLDivElement | null>(null);

  const isDesktop = useMediaQuery(`${theme.mediaQuery.smallTablet}`);
  const [ search, setSearch ] = useState(searchParams?.get('query') ?? '');
  const debouncedSearch = useDebounce(search, 1000);
  
  const [ filteredBrands, setFilteredBrands ] = useState(brands);

  const [index, setIndex] = useState(0);
  const [collapse, setCollapse] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() =>
      setIndex(index => index + 1),
      3000 // every 3 seconds
    );

    setCollapse((JSON.parse(localStorage.getItem("projectspce:headerCollapse") ?? "{}")?.collapse ?? false))

    analytics.track(Event.PAGE_VIEWED, { pageName: 'home'});
    
    return () => clearTimeout(intervalId);
  }, []);

  const onClear = () => {
    setSearch('');
  }

  const handleGoToApp = () =>{
    if(searchRef?.current) {
      window.scrollTo({
        top: searchRef.current?.offsetTop,
        left: 0,
        behavior: "smooth",
      });
    }
  }

  useEffect(() => {
    localStorage.setItem("projectspce:headerCollapse", JSON.stringify({ collapse }));
  }, [collapse]);

  useEffect(() => {
    const terms = debouncedSearch.trim().split(" ").filter(Boolean).map(item => item.toLowerCase());
    
    const filterBrands = brands.map((brand) => {

      // check the tags count
      const tagsCount = brand.tags.filter(elem => terms.includes(elem.toLowerCase())).length;

      //check the hidden tag count
      const hiddenTagsCount = brand.hiddenTags?.filter(elem => terms.includes(elem.toLowerCase())).length ?? 0;

      // check the description instance counts
      const descriptionInstanceCount = terms.reduce((acc, curr) => {
        const matches = brand.description.toLowerCase().split(curr).length - 1;
        return acc + matches;
      }, 0);

      //check the title
      const titleInstanceCount = terms.reduce((acc, curr) => {
        const matches = brand.title.toLowerCase().split(curr).length - 1;
        return acc + matches;
      }, 0);

      //check the url
      const urlInstanceCount = terms.reduce((acc, curr) => {
        const matches = brand.link.url.split(curr).length - 1;
        return acc + matches;
      }, 0);

      const keywordCount = tagsCount + descriptionInstanceCount + titleInstanceCount + urlInstanceCount + hiddenTagsCount;

      if(keywordCount === 0) return null;

      return { 
        ...brand,
        count: keywordCount
      };
    }).filter((item) => {
      return item !== null
    }) as BrandOrder[];

    const brandList = filterBrands.sort((a, b) => a.count - b.count);

    setFilteredBrands(terms.length > 0 ? brandList : brands);

    if(debouncedSearch) {
      router.replace(`?query=${debouncedSearch}`);

      analytics.track(Event.SEARCH, {
        searchTerm: debouncedSearch,
        results: filterBrands.length,
      });

    } else {
      router.replace(`/`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

  useEffect(() => {
    setSearch(searchParams?.get("query") ?? "")
  }, [searchParams]);

  const randomBrand = brands[Math.floor(Math.random()*brands.length)];

  const onCollapse = () => {
    setCollapse((prev: boolean) => {
      analytics.track(Event.COLLAPSE_HEADER, { isOpen: !prev })
      return !prev
    })
  }
  
  return (
    <Container>
      <button onClick={onCollapse} className="link-button collapse">
        {collapse ? 'Open' : 'Close' } {isDesktop ? 'Header': ''}
      </button>
      <Hero>
        <BrandHeader className="header" background={"#000000"} />
        {collapse ? null : (
          <div className="wrapper">
            <div className="content">
              <div className="inner">
                <h1 className="h3">
                  Currated products for your&nbsp;
                  <em>
                    { isDesktop ? (
                      <TextTransition inline springConfig={presets.gentle}>
                        {Text[index % Text.length]}
                      </TextTransition>
                    ) : (
                      <TextTransition springConfig={presets.gentle}>
                        {Text[index % Text.length]}
                      </TextTransition>
                    )}
                  </em>
                </h1>
                <div className="actions">
                  {/* <button className="subscribe-button">Subscribe</button> */}
                  <button className="go-to-app" onClick={handleGoToApp}>Go Explore</button>
                </div>
              </div>
            </div>
            <div className="img-container hero">
              <Image src={HeroImage} alt="hero image" placeholder="blur" />
            </div>
          </div>
        )}
        <div className="white-bar" ref={searchRef} />
      </Hero>
      <div className="search-bar">
        <i className="fa-regular fa-magnifying-glass" />
        <input onChange={(e) => setSearch(e.target.value)} value={search} placeholder="Space, Brand or Keyword" />
        { search.trim() === "" ? (
          <Link href={`/brands/${randomBrand.path}`} className="pick-random">{isDesktop ? 'Random Brand' : <i className="fa-sharp fa-solid fa-shuffle" />}</Link>
        ): (
          <i onClick={onClear} className="fa-regular fa-xmark" />
        )}
      </div>
      <TagsList>
        <div className="inner">
          { Object.keys(tags).sort((key1, key2) => tags[key2] - tags[key1]).map((tag) => (
            <Link className={`tag ${search === tag ? "active" : ""}`} key={tag} href={`/?query=${tag}`}><span>{tags[tag]}</span> {tag}</Link>
          ))}
        </div>
      </TagsList>
      { search === "" || filteredBrands.length > 0 ? (
        <Grid>
          {
            filteredBrands.map(item => (
              <div className="brand-tile" key={item.title}>
                <Link className="direct" href={`${item.link.url}`} rel="noopener noreferrer" target="_blank">
                  <i className="fa-sharp fa-solid fa-arrow-up-right-from-square" />
                </Link>
                <Link href={`/brands/${item.path}`}>
                  <div className="overlay">
                    <div className="titling">{item.title}</div>
                  </div>
                </Link>
                <Image width={480} loading="lazy" src={JSON.parse(item.headerImage)} alt={item.title} placeholder="blur" quality={50} />
              </div>
              
            ))
          }
        </Grid>
      ) : (
        <NoResult>
          <h2>No Results Found for &quot;{search}&quot;</h2>
        </NoResult>
      )}
    </Container>
  )
}

export default Search;