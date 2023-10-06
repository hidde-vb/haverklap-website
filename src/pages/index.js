import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import { GatsbyImage } from 'gatsby-plugin-image';
import get from 'lodash/get';

import ImageGrid from '../components/image-grid';
import Layout from '../components/layout';
import Modal from '../components/modal';

import signature from '../images/signature.jpg';
import favicon from '../images/favicon.ico';

const RootIndex = (props) => {
  const siteTitle = get(props, 'data.site.siteMetadata.title');
  const contactImage = get(props, 'data.contentfulAsset.contactImage');
  const pageContent = get(props, 'data.contentfulPageContent');
  const newsContent = get(props, 'data.contentfulNews');

  const params = new URLSearchParams(props.location.search);

  return (
    <Layout location={props.location} footerImage={contactImage} hasBigLogo={true}>
      <Helmet title={siteTitle}>
        <link rel="icon" href={favicon} />
      </Helmet>
      <div className="jumbo">
        <GatsbyImage alt={pageContent.title} image={pageContent.titleImage.gatsbyImage} />
        {newsContent.visible && (
          <div
            className="jumboText"
            dangerouslySetInnerHTML={{
              __html: newsContent.main.childMarkdownRemark.html,
            }}
          />
        )}
      </div>
      <div className="wrapper">
        <div className="wrapper-intro">
          <div
            className="textBlock"
            dangerouslySetInnerHTML={{
              __html: pageContent.article.childMarkdownRemark.html,
            }}
          />
          <img className="signature" src={signature} alt="Bieke"></img>
        </div>
        <ImageGrid data={pageContent.images} />
      </div>

      {params.get('success') && (
        <Modal>
          <p>Bedankt voor je bestelling!</p>
          <p>We gaan er direct mee aan de slag.</p>
        </Modal>
      )}
      {params.get('canceled') && (
        <Modal>
          <p>De bestelling is geannuleerd.</p>
        </Modal>
      )}
    </Layout>
  );
};

export default RootIndex;

export const pageQuery = graphql`
  query HomeQuery {
    contentfulAsset(title: { eq: "contact" }) {
      gatsbyImage(layout: FULL_WIDTH, width: 300, height: 400)
    }
    site {
      siteMetadata {
        title
      }
    }
    contentfulNews {
      visible
      main {
        childMarkdownRemark {
          html
        }
      }
    }
    contentfulPageContent(title: { eq: "haverklap" }) {
      title
      titleImage {
        gatsbyImage(layout: FULL_WIDTH, width: 2400, height: 1200)
      }
      article {
        childMarkdownRemark {
          html
        }
      }
      images {
        id
        gatsbyImage(layout: FULL_WIDTH, width: 400, height: 400)
      }
    }
  }
`;
