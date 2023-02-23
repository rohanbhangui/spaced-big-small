import { Position } from "@/app/[slug]/brandLayout";
import styled from "styled-components";
import Image from "next/image";

type TooltipProps = {
  title: string;
  subtitle?: string;
  thumbnail: string;
  thumbnail_alt: string;
  position?: Position;
  url: string;
}

const Container = styled.div<{ position: TooltipProps["position"] }>`
  position: absolute;
  transform: translateX(-50%) translateY(-50%);
  ${({ position }) => position ? `
    left: ${position.left};
    top: ${position.top};
  ` : ``}

  &:hover {
    .overlay {
      opacity: 1;
      transform: translateX(-50%) translateY(-100%);
    }
  }

  .point {
    background: white;
    height: 1rem;
    width: 1rem;
    border-radius: 2rem;
    box-shadow: 0 0 0 1rem rgba(255, 255, 255, 0.3);
    cursor: pointer;
  }

  .overlay {
    z-index: 3;
    position: absolute;
    left: 50%;
    top: -0.5rem;
    transform: translateX(-50%) translateY(-75%);
    background: white;
    box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.33);
    border-radius: 1rem;
    padding: 0.25rem;
    opacity: 0;
    transition: all 0.25s ease-in-out;


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
          object-fit: contain;
        }
      }

      .overlay-content {
        flex: 1;
        margin: 0 1rem;
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
`

const Tooltip = ({
  title,
  subtitle = "",
  thumbnail,
  thumbnail_alt,
  position,
  url
}: TooltipProps) => {
  if(!position) {
    return null;
  }

  return (
    <Container position={position}>
      <div className="point"></div>
      <div className="overlay">
        <a href={url} className="flex">
          <div className="img-container">
            <Image src={JSON.parse(thumbnail)} alt={thumbnail_alt} />
          </div>
          <div className="overlay-content">
            <div className="title">{title}</div>
            { subtitle ? (
              <div className="subtitle">{subtitle}</div>
            ): null }
          </div>
        </a>
      </div>
    </Container>
  )
}

export default Tooltip;