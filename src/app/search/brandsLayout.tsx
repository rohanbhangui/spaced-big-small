'use client';

import { smallTablet, tablet } from "@/assets/styles/themeConfig";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { BrandDataProps } from "../[slug]/brandLayout";
import Image from "next/image";
import Link from 'next/link';
import { useDebounce } from "@/utils/hooks";

type BrandOrder = BrandDataProps & {
  count: number;
}

const Container = styled.div`
  .search-bar {
    max-width: ${smallTablet}px;
    width: 100%;
    margin: 2rem auto;

    input {
      width: 100%;
      padding: 1rem;
      font-size: 2rem;
      border: none;
      border-bottom: 2px solid rgba(0, 0, 0, 0.33);
      outline: none;
      transition: border-bottom 0.25s ease-in-out;

      &:focus {
        border-bottom: 2px solid rgba(0, 0, 0, 1);
      }
    }
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 0.8rem;
  max-width: ${tablet}px;
  width: 100%;
  margin: 2rem auto;
  padding: 0 0.8rem;

  @media ${({ theme }) => theme.mediaQuery.phone} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    grid-template-columns: repeat(3, 1fr);
  }

  .brand-tile {
    aspect-ratio: 4/3;
    position: relative;

    .overlay {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      inset: 0;
      background: rgba(0, 0, 0, 0.25);

      .h4 {
        color: white;
        font-weight: 600;
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`

const Search = ({ brands }: { brands: BrandDataProps[] }) => {
  const [ search, setSearch ] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [ filteredBrands, setFilteredBrands ] = useState(brands);
  
  useEffect(() => {
    const terms = debouncedSearch.trim().split(" ").filter(Boolean);

    const filterBrands = brands.map((brand) => {

      // check the tags count
      const tagsCount = brand.tags.filter(elem => terms.includes(elem)).length;

      // check the description instance counts
      const descriptionInstanceCount = terms.reduce((acc, curr) => {
        const matches = brand.description.split(curr).length - 1;
        return acc + matches;
      }, 0);

      //check the title
      const titleInstanceCount = terms.reduce((acc, curr) => {
        const matches = brand.title.split(curr).length - 1;
        return acc + matches;
      }, 0);

      //check the url
      const urlInstanceCount = terms.reduce((acc, curr) => {
        const matches = brand.link.url.split(curr).length - 1;
        return acc + matches;
      }, 0);

      const keywordCount = tagsCount + descriptionInstanceCount + titleInstanceCount + urlInstanceCount;

      if(keywordCount === 0) return null;

      return { 
        ...brand,
        count: keywordCount
      };
    }).filter((item) => {
      return item !== null
    }) as BrandOrder[];

    const brandList = filterBrands.sort((a, b) => a.count - b.count)

    setFilteredBrands(terms.length > 0 ? filterBrands : brands);
  }, [debouncedSearch])
  
  return (
    <Container>
      <div className="search-bar">
        <input onChange={(e) => setSearch(e.target.value)} value={search} placeholder="Space, Brand or Keyword" />
        <div className="underline"></div>
      </div>
      <Grid>
        {
          filteredBrands.map(item => (
            <Link href={`/${item.path}`} className="brand-tile" key={item.title}>
              <div className="overlay">
                <div className="h4">{item.title}</div>
              </div>
              <Image src={JSON.parse(item.headerImage)} alt={item.title} />
            </Link>
          ))
        }
      </Grid>
    </Container>
  )
}

export default Search;