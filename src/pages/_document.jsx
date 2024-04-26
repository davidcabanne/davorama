import Document from "next/document";
import { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html lang="en">
        <meta property="og:title" content="Davorama" />
        <meta property="og:url" content="https://www.davorama.com" />
        <meta property="og:site_name" content="Davorama" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="description" />
        <meta property="og:image:secure_url" content="url" />
        <meta property="og:image" content="url" />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="og:image:width" content="384" />
        <meta property="og:image:height" content="216" />

        <meta name="twitter:card" content="Davorama" />
        <meta name="twitter:site" content="@davorama" />
        <meta name="twitter:title" content="Davorama" />
        <meta name="twitter:description" content="description" />
        <meta name="twitter:image" content="url" />

        <meta name="keywords" content="Davorama" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" type="image/x-icon" sizes="any" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/x-icon"
          sizes="32x32"
          href="/favicon.ico"
        />
        <link
          rel="icon"
          type="image/x-icon"
          sizes="16x16"
          href="/favicon.ico"
        />
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
