/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
 
export const config = {
  runtime: 'edge',
};

const font = fetch(new URL('../../assets/BebasNeue-Regular.ttf', import.meta.url)).then(
  (res) => res.arrayBuffer(),
);
 
const ogImage = async (req: NextRequest) => {
  const fontData = await font;
  const { searchParams } = req.nextUrl;
  const brandImage = searchParams.get('brand')?.split("/").at(-1);
  if (!brandImage) {
    return new ImageResponse(
      <img
        height="1200"
        width="630"
        src={`https://projectspce.com/img/social-sharing.png`}
        alt=""
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%"
        }}
      />, {
      width: 1200,
      height: 630,
    });
  }
 
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          position: "relative",
        }}
      >
        <img
          src={`https://projectspce.com/img/${brandImage}`}
          alt=""
          height="1200"
          width="630" 
          style={{
            objectFit: "cover",
            width: '100%',
            height: '100%',
            filter: "brightness(0.75)",
            position: "absolute",
            inset: 0,
            zIndex: "0"
          }}
        />
        <div
          style={{
            fontSize: 120,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            transform: "translateX(-50%) translateY(-50%)",
            color: 'white',
            zIndex: "100",
            position: "absolute",
            fontFamily: '"BebasNeue"',
            left: "50%",
            top: "50%",
            textAlign:"center"
          }}
        >
          ProjectSpce
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'BebasNeue',
          data: fontData,
          style: 'normal',
        },
      ],
    },
  );
}

export default ogImage;