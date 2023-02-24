'use client';

import { desktop, smallTablet, tablet, desktopFHD, largeDesktop, phone, smallDesktop } from "@/assets/styles/themeConfig";
import CustomTooltip from "@/components/Tooltip";
import { useWindowDimensions } from "@/utils/hooks";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import Popup from 'reactjs-popup';
import { PopupPosition } from "reactjs-popup/dist/types";
import Link from "next/link";

enum tooltipPositions {
  'top left',
  'top center',
  'top right',
  'right top',
  'right center',
  'right bottom',
  'bottom left',
  'bottom center',
  'bottom right',
  'left top',
  'left center',
  'left bottom',
  'center center',
};


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
    margin: 4rem 0 7rem;
    padding: 0 1rem;
    line-height: 1.4;

    @media ${({ theme }) => theme.mediaQuery.tablet} {
      width: 80%;
      margin: 6rem 0 10rem;
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

const HighlightsGrid = styled.div`
  margin: 4rem 1rem 0;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    margin: 4rem 4rem 0;
  }
  
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
      position: relative;

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

const ToolTipButton = styled.div<{ position?: Position }>`
  background: white;
  height: 1rem;
  width: 1rem;
  border-radius: 5rem;
  box-shadow: 0 0 0 1rem rgba(255, 255, 255, 0.3);
  cursor: pointer;

  position: absolute;
  transform: translateX(-50%) translateY(-50%);
  ${({ position }) => position ? `
    left: ${position.left};
    top: ${position.top};
  ` : ``}
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
        margin: 0 1rem 0 0.5rem;
        white-space: nowrap;
        font-size: 1rem;
        color: black;

        .title {
          font-weight: 600;
        }

        .subtitle {
          color: rgba(0, 0, 0, 0.5);
        }
      }
    }
  }
`;

const TagList = styled.div`
  margin: 2rem auto 0;
  padding: 0 1rem;
  max-width: ${tablet}px;
  text-align: center;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    margin: 2rem auto 0;
  }

  .tag {
    color: rgba(0, 0, 0, 0.5);
    font-weight: 600;
    display: inline-block;
    margin: 0 0.6rem;
    transition: color 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
      color: rgba(0, 0, 0, 1);
    }
  }
`

const Footer = styled.div<{ color: string; }>`
  margin: 2rem auto 4rem;
  padding: 0 1rem;
  max-width: ${smallTablet}px;

  @media ${({ theme }) => theme.mediaQuery.smallTablet} {
    margin: 4rem auto;
  }

  @media ${({ theme }) => theme.mediaQuery.smallDesktop} {
    margin: 7rem auto;
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
    link,
    tags
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
          {highlightGrid.map(({id, img, img_alt, hover_name, hover_link, hover_thumbnail, hover_position, tooltip}, index) => (
            <div className={`img ${id}`} key={id}>
              <StyledPopup on={['hover']} trigger={<ToolTipButton position={hover_position.smallTablet} />} position={tooltip?.placement ?? 'top center'}>
                <a href={hover_link} className="flex">
                  <div className="img-container">
                    <Image src={JSON.parse(hover_thumbnail)} alt={img_alt} />
                  </div>
                  <div className="overlay-content">
                    <div className="title">{hover_name}</div>
                    {/* { subtitle ? (
                      <div className="subtitle">{subtitle}</div>
                    ): null } */}
                  </div>
                </a>
              </StyledPopup>
              {/* <CustomTooltip
                title={hover_name}
                thumbnail_alt={img_alt}
                thumbnail={hover_thumbnail}
                position={hover_position.smallTablet}
                url={hover_link}
              /> */}
              <Image
                src={JSON.parse(img)} alt={img_alt} />
            </div>
          ))}
        </div>
      </HighlightsGrid>
      <div className="flex-center">
        <a href={`${link.url}?ref=spaced`} target="_blank" rel="noopener noreferrer" className="h5 brand-link-button">{link.label}</a>
      </div>
      <TagList>
        {tags.map((tag) => (
          <Link href={`/search?query=${tag}`} key={tag}><div className="h2 tag" >{tag}</div></Link>
        ))}
      </TagList>
      <Footer color={theme.colors.primary}>
        <div className="flex">
          <div className="footer-content">
            <div className="h5">Have a brand in mind?</div>
            <div className="h5">Drop us a note!</div>
          </div>
          <div className="button">
            <a href="mailto:rohan@bhangui.com" className="h6">Message Us</a>
          </div>
        </div>
      </Footer>
    </Container>
    
  )
}

export default BrandLayout;