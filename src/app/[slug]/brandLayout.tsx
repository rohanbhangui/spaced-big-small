'use client';

import { desktop, smallTablet, tablet, desktopFHD, largeDesktop, phone, smallDesktop } from "@/assets/styles/themeConfig";
import { useWindowDimensions } from "@/utils/hooks";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

export type BrandDataProps = {
  title: string;
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
    hover_thumbnail: string;
    img: string;
    img_alt: string;
    hover_position: {
      left: string;
      top: string;
    }
  }[]
}

const RestrictContainer = styled.div`
  width: 100%;
  margin: 0 auto;

  @media ${({ theme }) => theme.mediaQuery.smallTablet} {
    max-width: ${smallTablet}px;
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
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

  .invisible-text {
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
    margin: 4rem 0;
    padding: 0 1rem;
    line-height: 1.4;

    @media ${({ theme }) => theme.mediaQuery.tablet} {
      width: 80%;
      margin: 6rem 0;
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
    }
  }
`

const HighlightsGrid = styled.div`
  margin: 4rem;
  
  .grid {
    margin-top: 2rem;
    display: grid;
    grid-gap: 0.8rem;
    /* grid-template-columns: repeat(12,1fr);
    grid-template-rows: repeat(3, 1fr); */
    grid-template-areas: 
      "a a a a a a a b b b b b"
      "a a a a a a a c c c c c"
      "d d d d e e e e f f f f";

    .img {
      &.a {
        grid-area: a;
      }

      &.b {
        grid-area: b;
        aspect-ratio: 730/580;
      }

      &.c {
        grid-area: c;
        aspect-ratio: 730/580;
      }

      &.d {
        grid-area: d;
        aspect-ratio: 1/1;
      }

      &.e {
        grid-area: e;
        aspect-ratio: 1/1;
      }

      &.f {
        grid-area: f;
        aspect-ratio: 1/1;
      }

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
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

  return 1.8
}

const BrandLayout = ({data}: { data: BrandDataProps }) => {
  const {
    title,
    headerImage,
    theme,
    description,
    montageItems,
    highlightGrid,
  } = data;

  const { width } = useWindowDimensions()
  const [montageSlidesToShow, setMontageSlidesToShow] = useState(renderNumberOfMontageSlides(width))

  useEffect(() => {
    setMontageSlidesToShow(renderNumberOfMontageSlides(width))
  }, [width])

  return (
    <Container background={theme.colors.background} color={theme.colors.primary}>
      <Title color={theme.colors.primary}>{title}</Title>
      <div className="invisible-text">
        <div className="inner">{title}</div>
      </div>
      <RestrictContainer>
        <div className="header-image">
          <Image
            src={JSON.parse(headerImage)}
            alt={title}
          />
        </div>
        <div className="content h3">
          {description}
        </div>
      </RestrictContainer>
      <MontageCarousel>
        <div className="content">
          <div className="inner swiper-restrict">
            <Swiper
              modules={[Scrollbar]}
              scrollbar={{ draggable: true }}
              spaceBetween={0}
              slidesPerView={montageSlidesToShow}
            >
              {montageItems.map(({ img, id, img_alt }, index) => (
                <SwiperSlide key={id}>
                  <div className="img-container">
                    <Image
                      src={JSON.parse(img)} alt={img_alt} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </MontageCarousel>
      <HighlightsGrid>
        <h2>Highlights</h2>
        <div className="grid">
          {highlightGrid.map(({id, img, img_alt}, index) => (
            <div className={`img ${id}`} key={id}>
              <Image
                src={JSON.parse(img)} alt={img_alt} />
            </div>
          ))}
        </div>
      </HighlightsGrid>
    </Container>
    
  )
}

export default BrandLayout;