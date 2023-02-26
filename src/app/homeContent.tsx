'use client';

import { phone, smallDesktop, smallTablet, ThemeType } from "@/assets/styles/themeConfig";
import Link from "next/link";
import styled, { useTheme } from "styled-components";
import tinycolor from "tinycolor2";
import Image from "next/image";
import TextTransition, { presets } from "react-text-transition";
import { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { BrandDataProps } from "./brands/[slug]/brandLayout";
import Img1 from "@/assets/img/home-moft-img-1.png";
import Img2 from "@/assets/img/home-moft-img-2.png";
import MoftLabel from "@/assets/img/home-moft-label.png";
import FooterArrow from "@/assets/img/home-arrow-footer.svg";

const Container = styled.div`
  background: ${({ theme }) => theme.colors.background};
`

const Header = styled.header`
  max-width: ${smallDesktop}px;
  margin: 0 auto;
  width: 100%;
  padding: 1rem 0.5rem;
  display: flex;
  justify-content: space-between;

  .img-container {
    position: relative;
  }

  .button {
    font-weight: 600;
    color: #ffffff;
    background: ${({ theme }) => theme.colors.primary};
    padding: 0 1.75rem;
    border-radius: 0.8rem;
    display: flex;
    align-items: center;
  }
`

const TitleSection = styled.section`
  max-width: ${smallDesktop}px;
  margin: 0 auto;
  padding: 4rem 1rem 5rem;
  width: 100%;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    padding: 7rem 1rem 10rem;
  }

  h1.h2 {
    text-align: center;
    z-index: 10;
    position: relative;
    font-weight: 600;

    &.highlight {
      z-index: 9;
      color: ${({ theme }) => theme.colors.primary};

      > div {
        justify-content: center;

        > div {
          z-index: 9;
        }
      }
    }
  }
`

const BrandMarquee = styled.section`
  .brand-tile {
    aspect-ratio: 4/5;
    width: 50vw;
    position: relative;

    @media ${({ theme }) => theme.mediaQuery.smallTablet} {
      width: 33vw;
    }

    @media ${({ theme }) => theme.mediaQuery.tablet} {
      width: 40vw;
    }

    .overlay {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      inset: 0;
      background: rgba(0, 0, 0, 0.33);

      .titling {
        color: white;
        font-weight: 600;
        font-size: 1.5rem;
        padding: 0 1rem;
        text-align: center;

        @media ${({ theme }) => theme.mediaQuery.smallTablet} {
          font-size: 2rem;
        }

        @media ${({ theme }) => theme.mediaQuery.tablet} {
          font-size: 3rem;
        }
      }
    }
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`

const ExplainationSection = styled.section`

  .text {
    max-width: ${smallDesktop}px;
    margin: 3rem auto;
    width: 100%;
    padding: 1rem 0.5rem;

    @media ${({ theme }) => theme.mediaQuery.smallTablet} {
      margin: 7rem auto;
    }

    h3 {
      max-width: ${smallTablet}px;
    }
  }

  .img-grid{
    display: grid;
    grid-template-columns: repeat(12,1fr);
    grid-gap: 0.8rem;
    max-width: ${smallDesktop}px;
    width: 100%;
    margin: 0rem 0 0 auto;

    .img-1, .img-2 {
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .img-1 {
      aspect-ratio: 2/3;
      grid-column: 7/13;
      grid-row: 1;
    }

    .img-2 {
      aspect-ratio: 1/1;
      grid-column: 2/7;
      grid-row: 1;
    }
  }
`;

const Footer = styled.footer`
  text-align: center;
  padding: 5rem 1rem 4rem;
  position: relative;
  max-width: ${phone}px;
  width: 100%;
  margin: 0 auto;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    padding: 10rem 1rem 7rem;
  }

  h3 {
    font-weight: 600;
    margin: 0;
  }

  .arrow {
    position: absolute;
    display: inline-block;
    width: 6rem;
    left: 75%;
    transform: translateX(-50%) translateY(-50%) rotate(0deg);
    top: 55%;
    display: none;

    @media ${({ theme }) => theme.mediaQuery.phone} {
      display: block;
    }
    
    @media ${({ theme }) => theme.mediaQuery.tablet} {
      width: 10rem;
      left: 85%;
      top: 60%;
      transform: translateX(-50%) translateY(-50%) rotate(10deg);
    }
  }

  .button {
    margin-top: 1.5rem;
    font-weight: 600;
    color: #ffffff;
    background: ${({ theme }) => theme.colors.primary};
    padding: 1rem 3.5rem;
    border-radius: 1.2rem;
    display: inline-flex;
    align-items: center;

    @media ${({ theme }) => theme.mediaQuery.tablet} {
      margin-top: 3rem;
    }
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

const HomeLayout = ({ data }: { data: BrandDataProps[]}) => {
  const theme = useTheme() as ThemeType;
  const logo = tinycolor(theme.colors.background).isDark() ? "/logo-white.svg" : "/logo.svg";
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() =>
      setIndex(index => index + 1),
      3000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <Container>
      <Header>
        <Link href="/search">
          <div className="img-container">
            <Image src={logo} width={50} height={50} alt="Spaced" />
          </div>
        </Link>
        <Link className="button" href="/search">
          Get App
        </Link>
      </Header>
      <TitleSection>
        <h1 className="h2">Currated products for your</h1>
        <h1 className="h2 highlight">
          {/* <TextSwap
            animationType="fade"
            seconds={3}
            strings={Text}
          /> */}
          <TextTransition springConfig={presets.gentle}>
            {Text[index % Text.length]}
          </TextTransition>
        </h1>
      </TitleSection>
      <BrandMarquee>
        <Marquee pauseOnHover gradient={false}>
          {data.map(item => (
            <Link href={`/brands/${item.path}`} className="brand-tile" key={item.title}>
              <div className="overlay">
                <div className="titling">{item.title}</div>
              </div>
              <Image src={JSON.parse(item.headerImage)} alt={item.title} placeholder="blur" quality={50} />
            </Link>
          ))}
        </Marquee>
      </BrandMarquee>
      <ExplainationSection>
        <div className="text">
          <h3>We collect the best products for all of the spaces in your home. We do this by sourcing from the very best places. Magazines, TikTok, Instagram.</h3>
        </div>
        <div className="img-grid">
            <div className="img-1">
              <Image src={Img1} alt="moft brand photos" />
            </div>
            <div className="img-2">
            <Image src={Img2} alt="moft brand photos" />
            </div>
        </div>
      </ExplainationSection>
      <Footer>
        <h3>Have a brand in mind?</h3>
        <h3>Drop us a note!</h3>
        <Image className="arrow" src={FooterArrow} alt="Drop us a note!" />
        <Link className="button h5" href="mailto:hello@plaen.co" rel="noopener noreferrer" target="_blank">
          Message Us
        </Link>
      </Footer>
    </Container>
  )
}

export default HomeLayout;