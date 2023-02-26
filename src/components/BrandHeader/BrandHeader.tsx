import { smallDesktop, tablet } from "@/assets/styles/themeConfig";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import tinycolor from "tinycolor2";

const Header = styled.header<{ hasHref: boolean; background: string; }>`
  max-width: ${smallDesktop}px;
  margin: 0 auto;
  width: 100%;
  padding: 0.5rem;
  display: flex;
  justify-content: ${({ hasHref }) => hasHref ? "space-between" : "center"};

  .img-container {
    position: relative;
  }

  .link-button {
    padding: 0.5rem 1rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.5);
    color: ${({ background }) => tinycolor(background).isDark() ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"};
    transition: color 0.1s ease-in-out;

    &:hover {
      color: ${({ background }) => tinycolor(background).isDark() ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)"};
    }

    i {
      margin-left: 0.25rem;
    }
  }
`

const BrandHeader = ({
  background,
  href = "",
  text = "Go to site",
}: {
  background: string;
  href?: string;
  text?: string;
}) => {
  const logo = tinycolor(background).isDark() ? "/logo-white.svg" : "/logo.svg"
  return (
    <Header hasHref={href!==""} background={background}>
      <Link href="/search">
        <div className="img-container">
          <Image src={logo} width={50} height={50} alt="Spaced" />
        </div>
      </Link>
      { href === "" ?
        null
      : (
        <Link className="link-button" href={href} rel="noopener noreferrer" target="_blank">
          {text} <i className="fa-sharp fa-solid fa-arrow-up-right-from-square" />
        </Link>
      )}
    </Header>
  )
}

export default BrandHeader;