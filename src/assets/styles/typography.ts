import { css } from 'styled-components';

const Typography = css`

  h1, .h1 {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-weight: 400;
    font-size: max(2.3rem, 5vw);
    line-height: 1.3;
    margin-bottom: 0.5rem;

    @media ${({ theme }) => theme.mediaQuery.tablet} {
      font-size: 4.3rem;
    }
  }

  h2, .h2 {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: max(1.9rem, 4vw);
    font-weight: 500;
    margin-bottom: 0.5rem;

    @media ${({ theme }) => theme.mediaQuery.tablet} {
      font-size: 3.2rem;
    }
  }

  h3, .h3 {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: max(1.5rem, 3.2vw);
    font-weight: 500;
    line-height: 1.3;
    margin-bottom: 0.5rem;

    @media ${({ theme }) => theme.mediaQuery.tablet} {
      font-size: 2.6rem;
    }
  }

  h4, .h4 {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: max(1.2rem, 2.5vw);
    font-weight: 500;
    line-height: 1.3;
    margin-bottom: 0.5rem;

    @media ${({ theme }) => theme.mediaQuery.tablet} {
      font-size: 2.1rem;
    }
  }

  h5, .h5 {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: max(1rem, 2.2vw);
    font-weight: 500;
    line-height: 1.3;
    margin-bottom: 0.5rem;

    @media ${({ theme }) => theme.mediaQuery.tablet} {
      font-size: 1.7rem;
    }
  }

  p, .p {
    line-height: 1.5;
    font-weight: 400;
    font-size: 1rem;

    @media ${({ theme }) => theme.mediaQuery.tablet} {
      font-size: 1rem;
      line-height: 1.6;
    }
  }

  a {
    text-decoration: none;
  }
`

export default Typography;