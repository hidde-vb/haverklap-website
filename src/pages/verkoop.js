import React from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get';
import { Helmet } from 'react-helmet';

import * as styles from './verkoop.module.css';
import Layout from '../components/layout';
import ProductPreview from '../components/product-preview';
import favicon from '../images/favicon.ico';

const Verkoop = (props) => {
  const siteTitle = get(props, 'data.site.siteMetadata.title');
  const pageContent = get(props, 'data.contentfulPageContent');
  const products = get(props, 'data.allContentfulProduct.edges');
  const contactImage = get(props, 'data.contentfulAsset.contactImage');

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
        <div className={styles.productList}>
          {products
            .sort((a, b) => {
              if (a.node.order < b.node.order) return 1;
              return -1;
            })
            .map(({ node }) => {
              return <ProductPreview key={node.slug} product={node} />;
            })}
        </div>
      </div>
    </Layout>
  );
};

export default Verkoop;

export const pageQuery = graphql`
  query VerkoopIndexQuery {
    contentfulPageContent(title: { eq: "verkoop" }) {
      title
      article {
        childMarkdownRemark {
          html
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
    contentfulAsset(title: { eq: "contact" }) {
      contactImage: gatsbyImage(layout: FULL_WIDTH, width: 600, height: 800)
    }
    allContentfulProduct {
      edges {
        node {
          title
          slug
          order
          article {
            childMarkdownRemark {
              html
            }
          }
          images {
            id
            gatsbyImage(layout: FULL_WIDTH, width: 350, height: 400)
          }
        }
      }
    }
  }
`;
