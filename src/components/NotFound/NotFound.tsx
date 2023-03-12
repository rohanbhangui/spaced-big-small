'use client'

import React, { useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components';
import { analytics, Event } from '@/utils/analytics';

const Main = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    max-width: 36rem;
    width: 100%;
    margin: 0 auto;
    text-align: center;

    .title {
      margin-bottom: 3rem;
    }

    a {
      color: black;
      text-decoration: underline;
    }
  }
`

const NotFound = () => {

  useEffect(() => {
    analytics.track(Event.PAGE_NOT_FOUND);
  }, [])

  return (
    <Main>
      <Head>
        <title>Plaen - 404 Not Found</title>
        <meta name="description" content="Whoops! Looks like what you were looking for isn't here." />
        <meta name="robots" content="noindex" />
      </Head>

      <div className="content">
        <h3 className="title">Whoops! Looks like what you were looking for isn&apos;t here.</h3>
        <Link href="/">
          Return to home
        </Link>
      </div>
    </Main>
  )
}

export default NotFound;