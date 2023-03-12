'use client'

import { BrandDataProps } from "@/app/brands/[slug]/brandLayout";
import BrandHeader from "@/components/BrandHeader";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { largeDesktop } from "@/assets/styles/themeConfig";
import { SPACES } from "@/utils/constants";

const Container = styled.div`
  .header {
    z-index: 100;
    mix-blend-mode: difference;
  }
`

const Hero = styled.div<{ background: string; }>`
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${({ background }) => background });
  background-size: cover;
  height: 15rem;
  display: flex;
  flex-direction: column;

  @media ${({ theme }) => theme.mediaQuery.smallTablet} {
    height: 25rem;
  }

  @media ${({ theme }) => theme.mediaQuery.smallDesktop} {
    height: 30rem;
  }

  @media ${({ theme }) => theme.mediaQuery.largeDesktop} {
    height: 45rem;
  }

  .title-wrapper {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
      color: white;
      text-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.4);
      margin-bottom: 2rem;
    }
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
    margin: -2rem auto 2rem;
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

type SpacesLayoutProps = {
  brands: BrandDataProps[];
  title: string;
}

const Layout = ({ brands, title }: SpacesLayoutProps) => {

  const background = SPACES[title as keyof typeof SPACES];

  return (
    <Container>
      <Hero background={background}>
        <BrandHeader className="header" background={"#000000"} />
        <div className="title-wrapper">
          <h1>{title}</h1>
        </div>
      </Hero>
      <Grid>
        {
          brands.map(item => (
            <div className="brand-tile" key={item.title}>
              <Link className="direct" href={`${item.link.url}?ref=projectspce`} rel="noopener noreferrer" target="_blank">
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
    </Container>
  )
}

export default Layout;