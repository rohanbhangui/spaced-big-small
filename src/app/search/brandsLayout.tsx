'use client';

import { smallTablet, tablet } from "@/assets/styles/themeConfig";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { BrandDataProps } from "../[slug]/brandLayout";
import Image from "next/image";
import Link from 'next/link';
import { useDebounce } from "@/utils/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import BrandHeader from "@/components/BrandHeader";

type BrandOrder = BrandDataProps & {
  count: number;
}

const Container = styled.div`
  .search-bar {
    max-width: ${smallTablet}px;
    width: 100%;
    margin: 2rem auto;
    display: flex;
    align-items: stretch;
    border-bottom: 2px solid rgba(0, 0, 0, 0.33);
    transition: border-bottom 0.25s ease-in-out;
    padding: 0 0.5rem;

    &:focus-within {
      border-bottom: 2px solid rgba(0, 0, 0, 1);
    }

    input {
      width: 100%;
      padding: 0.5rem 1rem;
      font-size: 2rem;
      border: none;
      outline: none;
    }

    i.fa-xmark, i.fa-magnifying-glass {
      font-size: 1.5rem;
      display: flex;
      align-items: center;
    }

    i.fa-xmark {
      color: rgba(0, 0, 0, 0.33);
      cursor: pointer;
      margin-left: 1rem;

      &:hover {
        color: rgba(0, 0, 0, 1);
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
    transition: border-radius 0.25s ease-in-out;
    border-radius: 0rem;
    overflow: hidden;

    &:hover {
      border-radius: 1rem;
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
  }
`

const Search = ({ brands }: { brands: BrandDataProps[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [ search, setSearch ] = useState(searchParams?.get('query') ?? '');
  const debouncedSearch = useDebounce(search, 500);
  const [ filteredBrands, setFilteredBrands ] = useState(brands);

  const onClear = () => {
    setSearch('');
  }

  useEffect(() => {
    const terms = debouncedSearch.trim().split(" ").filter(Boolean).map(item => item.toLowerCase());
    
    const filterBrands = brands.map((brand) => {

      // check the tags count
      const tagsCount = brand.tags.filter(elem => terms.includes(elem.toLowerCase())).length;

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

    if(debouncedSearch) {
      router.replace(`search?query=${debouncedSearch}`);
    } else {
      router.replace(`search`);
    }
  }, [debouncedSearch])

  useEffect(() => {
    setSearch(searchParams?.get("query") ?? "")
  }, [searchParams])
  
  return (
    <Container>
      <BrandHeader background={"#FFFFFF"} />
      <div className="search-bar">
        <i className="fa-regular fa-magnifying-glass" />
        <input onChange={(e) => setSearch(e.target.value)} value={search} placeholder="Space, Brand or Keyword" />
        { search.trim() === "" ? (
          null
        ): (
          <i onClick={onClear} className="fa-regular fa-xmark" />
        )}
      </div>
      <Grid>
        {
          filteredBrands.map(item => (
            <Link href={`/${item.path}`} className="brand-tile" key={item.title}>
              <div className="overlay">
                <div className="titling">{item.title}</div>
              </div>
              <Image width={480} src={JSON.parse(item.headerImage)} alt={item.title} placeholder="blur" quality={50} />
            </Link>
          ))
        }
      </Grid>
    </Container>
  )
}

export default Search;