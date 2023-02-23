'use client';

import { desktop, smallTablet, tablet, desktopFHD } from "@/assets/styles/themeConfig";
import Image from "next/image";
import styled from "styled-components";

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
    padding: 0 1rem;

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
`

const BrandLayout = ({data}: { data: BrandDataProps }) => {
  const {
    title,
    headerImage,
    theme,
    description
  } = data;

  return (
    <Container background={theme.colors.background} color={theme.colors.primary}>
      <Title color={theme.colors.primary}>{title}</Title>
      <div className="invisible-text">
        <div className="inner">{title}</div>
      </div>
      <RestrictContainer>
        <div className="header-image">
          <Image
            src={headerImage}
            alt={title}
          />
        </div>
        <div className="content h3">
          {description}
        </div>
      </RestrictContainer>
    </Container>
    
  )
}

export default BrandLayout;