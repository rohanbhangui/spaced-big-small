'use client';

import { desktop, smallTablet, tablet, desktopFHD, largeDesktop, phone, smallDesktop, ThemeType } from "@/assets/styles/themeConfig";
import { useMediaQuery, useWindowDimensions } from "@/utils/hooks";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import { Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import Popup from 'reactjs-popup';
import { PopupPosition } from "reactjs-popup/dist/types";
import Link from "next/link";
import BrandHeader from "@/components/BrandHeader";
import tinycolor from "tinycolor2";
import { analytics, Event } from "@/utils/analytics";


export type Position = {
  left: string;
  top: string;
}

export type BrandDataProps = {
  title: string;
  path: string;
  link: {
    url: string;
    label: string;
  };
  theme: {
    colors: {
      primary: string;
      background: string;
    }
  },
  headerImage: string;
  description: string;
  montageItems: {
    id: string;
    img: string;
    img_alt: string;
  }[];
  highlightGrid: {
    id: string;
    hover_name: string;
    hover_subtitle?: string;
    hover_thumbnail: string;
    hover_link: string;
    img: string;
    img_alt: string;
    hover_position: {
      default: Position;
      smallTablet?: Position;
    },
    tooltip?: {
      placement?: PopupPosition;
    }
  }[],
  tags: string[];
  hiddenTags?: string[];
}

const RestrictContainer = styled.div`
  width: 100%;
  margin: 0 auto;

  @media ${({ theme }) => theme.mediaQuery.smallTablet} {
    max-width: ${smallTablet}px;
  }

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    max-width: ${tablet}px;
  }

  @media ${({ theme }) => theme.mediaQuery.desktopFHD} {
    max-width: ${desktop}px;
  }

  @media ${({ theme }) => theme.mediaQuery.desktopQHD} {
    max-width: ${desktopFHD}px;
  }
`

const Title = styled.h1<{ color: string; }>`
  font-weight: 600;
  color: ${({ color }) => `${color}`};
  text-align: center;
  padding: 4rem 0;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    padding: 10rem 0;
  }
`

const Container = styled.main<{ background: string; color: string; }>`
  background: ${({ background }) => background};
  overflow:hidden;
  
  .inner-wrapper {
    max-width: ${desktopFHD}px;
    margin: 0 auto;
    width: 100%;
  }

  .invisible-text {
    pointer-events: none;
    position: relative;
    width: 100%;

    .inner {
      text-align: center;
      position: absolute;
      font-weight: 600;
      top: 0;
      left: 50%;
      transform: translateY(-65%) translateX(-50%);
      font-size: clamp(5rem, 20vw, 150rem);
      color: ${({ color }) => color};
      opacity: 0.15;
      white-space: nowrap;
    }
  }

  .header-image {
    position: relative;
    z-index: 10;
    aspect-ratio: 16/9;
    margin: 0 1rem;

    @media ${({ theme }) => theme.mediaQuery.tablet} {
      padding: 0;
    }
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .content {
    width: 90%;
    margin: 4rem 0 4rem;
    padding: 0 1rem;
    line-height: 1.4;
    color: ${({ background }) => tinycolor(background).isDark() ? "#FFFFFF" : "#000000"};

    @media ${({ theme }) => theme.mediaQuery.smallTablet} {
      margin: 4rem 0 7rem;
    }

    @media ${({ theme }) => theme.mediaQuery.tablet} {
      width: 80%;
      margin: 6rem 0 10rem;
    }

    @media ${({ theme }) => theme.mediaQuery.desktopFHD} {
      width: 60%;
    }
  }

  .flex-center {
    display: flex;
    justify-content: center;

    .brand-link-button {
      ${({ color, background }) => color && background ? `
        color: ${background};
        background: ${color};
      ` : ``};
      
      display: inline-block;
      border-radius: 1rem;
      font-weight: 600;
      padding: 1rem 3rem;
      text-align: center;
      border: none;
      margin: 3rem 0;
      text-align: center;

      @media ${({ theme }) => theme.mediaQuery.smallTablet} {
        border-radius: 1.5rem;
        margin: 7rem 0;
      }

      &:active {
        position: relative;
        top: 1px;
      }
    }
  }
`;

const MontageCarousel = styled.section`
  
  .content {
    z-index: 100;
    position: relative;
    margin: 2rem auto 2rem;
    padding: 0;
    width: 100%;

    .img-container {
      aspect-ratio: 758/912;

      img {
        object-fit: cover;
        height: 100%;
        width: 100%;
      }
    }

    @media ${({ theme }) => theme.mediaQuery.smallTablet} {
      margin: 4rem auto 8rem;
    }

    .swiper {
      overflow: initial;
      
      .swiper-button-prev, .swiper-button-next {
        background: rgba(221, 221, 221, 0.8);
        color: ${({ theme }) => theme.colors.midGrey };
        padding: 2rem;
        border-radius: 10rem;
        display: flex;

        &:after {
          font-size: 1.2rem;
        }

        &.swiper-button-disabled {
          display: none;
        }
      }
    }

    .swiper-horizontal > .swiper-scrollbar {
      left: 16%;
      width: 68%;
      bottom: var(--swiper-scrollbar-bottom,2.5rem);
    }
  }
`

const HighlightsGrid = styled.div<{ background: string; }>`
  margin: 4rem 1rem 0;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    margin: 4rem 4rem 0;
  }

  h2 {
    margin-bottom: 0;
    color: ${({ background }) => tinycolor(background).isDark() ? "#FFFFFF" : "#000000"};
  }

  .mobile-only {
    font-weight: normal;
    color: ${({ background }) => tinycolor(background).isDark() ? "rgba(255, 255, 255, 0.33)" : "rgba(0, 0, 0, 0.33)"};

    @media ${({ theme }) => theme.mediaQuery.smallTablet} {
      display: none;
    }
  }

  .overlay-mobile-text {
    position: absolute;
    bottom: 2rem;
    left: 1.5rem;
    font-weight: 600;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.33);
  }
  
  .grid {
    margin-top: 2rem;
    display: grid;
    grid-gap: 0.8rem;
    width: 100%;
    grid-template-columns: repeat(12,1fr);
    /*grid-template-rows: repeat(3, 1fr); */
    grid-template-areas: 
      "a a a a a a a a a a a a"
      "a a a a a a a a a a a a"
      "b b b b b b b b b b b b"
      "c c c c c c c c c c c c"
      "d d d d d d d d d d d d"
      "d d d d d d d d d d d d"
      "e e e e e e e e e e e e"
      "f f f f f f f f f f f f";

    @media ${({ theme }) => theme.mediaQuery.smallTablet} {
      grid-template-areas: 
      "a a a a a a a b b b b b"
      "a a a a a a a c c c c c"
      "d d d d e e e e f f f f";
    }

    .img {
      position: relative;

      &.a {
        grid-area: a;
        aspect-ratio: 1/1;

        @media ${({ theme }) => theme.mediaQuery.smallTablet} {
          aspect-ratio: auto;
          grid-row: 1 / 3;
        }
      }

      &.b {
        grid-area: b;
        aspect-ratio: 3/2;
        @media ${({ theme }) => theme.mediaQuery.smallTablet} {
          aspect-ratio: 730/580;
          grid-row: 1/2;
        }
      }

      &.c {
        grid-area: c;
        aspect-ratio: 3/2;
        @media ${({ theme }) => theme.mediaQuery.smallTablet} {
          aspect-ratio: 730/580;
          grid-row: 2/3;
        }
      }

      &.d {
        grid-area: d;
        aspect-ratio: 1/1;
        @media ${({ theme }) => theme.mediaQuery.smallTablet} {
          aspect-ratio: 1/1;
        }
      }

      &.e {
        grid-area: e;
        aspect-ratio: 3/2;
        @media ${({ theme }) => theme.mediaQuery.smallTablet} {
          aspect-ratio: 1/1;
        }
      }

      &.f {
        grid-area: f;
        aspect-ratio: 3/2;
        @media ${({ theme }) => theme.mediaQuery.smallTablet} {
          aspect-ratio: 1/1;
        }
      }

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
  }
`

const ToolTipPoint = styled(Link)<{ position?: Position }>`
  position: absolute;
  transform: translateX(-50%) translateY(-50%);
  ${({ position }) => position ? `
    left: ${position.left};
    top: ${position.top};
  ` : ``}
  cursor: pointer;
`

const ToolTipButton = styled.div`
  background: white;
  position: relative;
  height: 1rem;
  width: 1rem;
  border-radius: 5rem;
  box-shadow: 0 0 0 1rem rgba(255, 255, 255, 0.3);
  cursor: pointer;

  &:after {
    z-index: 10;
    position: absolute;
    content: ' ';
    padding: 2rem;
    border-radius: 3rem;
    transform: translateX(-50%) translateY(-50%);
    left: 50%;
    top: 50%;
  }
`

const StyledPopup = styled(Popup)`
  // use your custom style for ".popup-overlay"
  &-overlay {
    border-radius: 1rem;
    border: 1px solid red;
  }
  // use your custom style for ".popup-content"
  &-content {
    width: auto !important;
    border-radius: 1rem !important;

    a {
      outline: none;
    }

    .flex {
      display: flex;
      align-items: center;

      .img-container {
        height: 3rem;
        width: 3rem;
        border-radius: 3rem;

        img {
          width: 100%;
          height: 100%;
          height: 3rem;
          width: 3rem;
          border-radius: 0.75rem;
          object-fit: contain;
        }
      }

      .overlay-content {
        flex: 1;
        margin: 0.5rem 1rem;
        font-size: 1rem;
        color: black;
        max-width: 15.2rem;

        .title {
          font-weight: 600;
          text-decoration: underline;
        }

        .subtitle {
          color: rgba(0, 0, 0, 0.33);
          font-size: 0.8rem;
        }
      }
    }
  }
`;

const TagList = styled.div<{ background: string; }>`
  margin: 2rem auto 0;
  padding: 0 1rem;
  max-width: ${smallDesktop}px;
  text-align: center;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    margin: 2rem auto 0;
  }

  .tag {
    color: ${({ background }) => tinycolor(background).isDark() ? "rgba(255, 255, 255, 0.33)" : "rgba(0, 0, 0, 0.33)"};
    font-weight: 600;
    display: inline-block;
    margin: 0 0.6rem;
    transition: color 0.3s ease-in-out;
    cursor: pointer;
    display: block;

    @media ${({ theme }) => theme.mediaQuery.phone} {
      display: inline-block;
    }

    &:hover {
      color: ${({ background }) => tinycolor(background).isDark() ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)"};
    }
  }
`

const Footer = styled.div<{ color: string; background: string; }>`
  margin: 2rem auto 4rem;
  padding: 0 1rem;
  max-width: ${smallTablet}px;

  @media ${({ theme }) => theme.mediaQuery.smallTablet} {
    margin: 4rem auto;
  }

  @media ${({ theme }) => theme.mediaQuery.smallDesktop} {
    margin: 9rem auto 7rem;
  }

  .flex {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    justify-content: center;

    @media ${({ theme }) => theme.mediaQuery.smallTablet} {
      justify-content: space-between;
      align-items: center;
      flex-wrap: nowrap;
    }

    .footer-content {
      flex: 0 0 100%;
      margin-bottom: 1rem;
      margin-top: 4rem;
      text-align: center;

      @media ${({ theme }) => theme.mediaQuery.smallTablet} {
        flex: 1;
        margin-bottom: 0rem;
        margin-top: 0rem;
        text-align: left;
      }

      .h5 {
        margin-bottom: 0;
        color: ${({ background }) => tinycolor(background).isDark() ? "#FFFFFF" : "#000000"};
      }
    }

    .button {
      flex: 0 0 100%;

      @media ${({ theme }) => theme.mediaQuery.smallTablet} {
        flex: 1;
      }

      a {
        white-space: nowrap;
        color: ${({ color }) => color };
        background: transparent;
        display: inline-block;
        border-radius: 0.75rem;
        font-weight: 600;
        padding: 1rem 3rem;
        text-align: center ${({ color }) => color };
        border: 2px solid ;
        text-align: center;
        display: inline-block;

        @media ${({ theme }) => theme.mediaQuery.smallTablet} {
          border-radius: 1rem;
        }

        &:active {
          position: relative;
          top: 1px;
        }
      }
    }
  }

`

const renderNumberOfMontageSlides = (width: number): number => {
  if (width !== 0) {
    if (width >= desktopFHD) return 2.3
    if (width >= largeDesktop) return 2.2
    if (width >= smallDesktop) return 2.1
    if (width >= tablet) return 1.8
    if (width >= smallTablet) return 1.8
    if (width >= phone) return 1.8
  }

  return 1.2
}

const BrandLayout = ({data}: { data: BrandDataProps }) => {
  const masterTheme = useTheme() as ThemeType;
  const isSmallTabletUp = useMediaQuery(`${masterTheme.mediaQuery.smallTablet}`);

  const {
    title,
    headerImage,
    theme,
    description,
    montageItems,
    highlightGrid,
    link,
    tags
  } = data;

  const { width } = useWindowDimensions()
  const [montageSlidesToShow, setMontageSlidesToShow] = useState(renderNumberOfMontageSlides(width))

  useEffect(() => {
    analytics.track(Event.PAGE_VIEWED, { group: "brand", pageName: title });
  }, [])

  useEffect(() => {
    setMontageSlidesToShow(renderNumberOfMontageSlides(width))
  }, [width])

  return (
    <Container background={theme.colors.background} color={theme.colors.primary}>
      <div className="inner-wrapper">
        <BrandHeader background={theme.colors.background} href={`${link.url}?ref=projectspce`} />
        <Title color={theme.colors.primary}>{title}</Title>
        <div className="invisible-text">
          <div className="inner">{title}</div>
        </div>
        <RestrictContainer>
          <div className="header-image">
            <Image
              src={JSON.parse(headerImage)}
              alt={title}
              width={1400}
              placeholder="blur"
              priority
            />
          </div>
          <div className="content h3">
            {description}
          </div>
        </RestrictContainer>
      </div>
      <MontageCarousel>
        <div className="content">
          <div className="inner swiper-restrict">
            <Swiper
              modules={[Scrollbar]}
              scrollbar={{ draggable: true }}
              spaceBetween={0}
              slidesPerView={montageSlidesToShow}
            >
              {montageItems.map(({ img, id, img_alt }) => (
                <SwiperSlide key={id}>
                  <div className="img-container">
                    <Image
                      src={JSON.parse(img)} alt={img_alt} placeholder="blur" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </MontageCarousel>
      <div className="inner-wrapper">
        <HighlightsGrid background={theme.colors.background}>
          <h2>Our Picks</h2>
          <p className="mobile-only">Tap to see more.</p>
          <div className="grid">
            {highlightGrid.map(({id, img, img_alt, hover_name, hover_subtitle = "", hover_link, hover_thumbnail, hover_position, tooltip}) => (
              <div className={`img ${id}`} key={id}>
                {isSmallTabletUp ? (
                  <>
                    {JSON.parse(hover_thumbnail) ? (
                       <StyledPopup 
                       on={['hover']}
                       trigger={
                         <ToolTipPoint
                           href={hover_link}
                           target="_blank"
                           rel="noopener noreferrer"
                           position={hover_position.smallTablet}
                         >
                           <ToolTipButton />
                         </ToolTipPoint>
                       }
                       position={tooltip?.placement ?? 'top center'}
                     >
                       <a href={hover_link} className="flex" target="_blank" rel="noopener noreferrer">
                         <div className="img-container">
                           <Image quality={50} width={64} height={64} src={JSON.parse(hover_thumbnail)} alt={img_alt} />
                         </div>
                         <div className="overlay-content">
                           <div className="title">{hover_name}</div>
                           { hover_subtitle ? (
                             <div className="subtitle">{hover_subtitle}</div>
                           ): null }
                         </div>
                       </a>
                     </StyledPopup>
                    ): null}
                    <Image
                      src={JSON.parse(img)} alt={img_alt} quality={90} placeholder="blur" />
                  </>
                ): (
                  <a href={hover_link} className="flex">
                    {JSON.parse(hover_thumbnail) ? (
                      <div className="overlay-mobile-text">
                        {hover_name}
                      </div>
                    ): null}
                    <Image
                      src={JSON.parse(img)} alt={img_alt} quality={90} placeholder="blur" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </HighlightsGrid>
        <div className="flex-center">
          <Link href={`${link.url}?ref=projectspce`} target="_blank" rel="noopener noreferrer" className="h5 brand-link-button">
            {link.label}
          </Link>
        </div>
        <TagList background={theme.colors.background}>
          {tags.sort().map((tag) => (
            <Link href={`/?query=${tag}`} key={tag}><div className="h2 tag">{tag}</div></Link>
          ))}
        </TagList>
        <Footer color={theme.colors.primary} background={theme.colors.background}>
          <div className="flex">
            <div className="footer-content">
              <div className="h5">Have a brand in mind?</div>
              <div className="h5">Drop us a note!</div>
            </div>
            <div className="button">
              <a href="mailto:hello@plaen.co?subject=ProjectSpce%3A%20New%20Brand&body=Hi%20ProjectSpce%20Team!%0D%0A%0D%0AI%20have%20a%20new%20brands%20for%20your%20consideration%3A%0D%0A%0D%0AHere%20is%20the%20link%20to%20their%20site%3A%0D%0A%0D%0A" className="h6">Message Us</a>
            </div>
          </div>
        </Footer>
      </div>
    </Container>
    
  )
}

export default BrandLayout;