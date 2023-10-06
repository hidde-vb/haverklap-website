import React from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get';
import { Helmet } from 'react-helmet';

import ImageGrid from '../components/image-grid';
import Layout from '../components/layout';

import favicon from '../images/favicon.ico';

const Feest = (props) => {
  const siteTitle = get(props, 'data.site.siteMetadata.title');
  const contactImage = get(props, 'data.contentfulAsset.contactImage');
  const pageContent = get(props, 'data.contentfulPageContent');

  return (
    <Layout location={props.location} footerImage={contactImage} hasBigLogo={false}>
      <Helmet title={siteTitle}>
        <link rel="icon" href={favicon} />
      </Helmet>
      <div className="wrapper">
        <h1 className="pageTitle">{pageContent.title}</h1>
        <div
          className="textBlock"
          dangerouslySetInnerHTML={{
            __html: pageContent.article.childMarkdownRemark.html,
          }}
        />
        <ImageGrid data={pageContent.images} />
      </div>
    </Layout>
  );
};

export default Feest;

export const pageQuery = graphql`
  query FeestIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    contentfulPageContent(title: { eq: "feest" }) {
      title
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
    contentfulAsset(title: { eq: "contact" }) {
      gatsbyImage(layout: FULL_WIDTH, width: 300, height: 400)
    }
  }
`;
