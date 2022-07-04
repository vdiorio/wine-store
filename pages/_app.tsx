/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import MainContainer from '../components/MainContainer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainContainer>
      <Component {...pageProps} />
    </MainContainer>
  );
}

export default MyApp;
