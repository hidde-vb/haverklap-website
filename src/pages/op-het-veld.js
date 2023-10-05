import React from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get';
import { Helmet } from 'react-helmet';

import ImageGrid from '../components/image-grid';
import Layout from '../components/layout';
import Partner from '../components/partner';

import favicon from '../images/favicon.ico';

import * as styles from './op-het-veld.module.css';

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const contactImage = get(this, 'props.data.contentfulAsset.gatsbyImage');
    const pageContent = get(this, 'props.data.contentfulPageContent');
    const partners = get(this, 'props.data.allContentfulPartner.edges');

    return (
      <Layout location={this.props.location} footerImage={contactImage} hasBigLogo={false}>
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
          <div className={styles.partnerList}>
            {partners.map(({ node }) => {
              return <Partner key={node.title} partner={node} />;
            })}
          </div>
          <ImageGrid data={pageContent.images} />
        </div>
      </Layout>
    );
  }
}

export default RootIndex;

export const pageQuery = graphql`
  query OpHetVeldIndexQuery {
    contentfulPageContent(title: { eq: "op het veld" }) {
      title
      article {
        childMarkdownRemark {
          html
        }
      }
      images {
        id
        gatsbyImage(layout: FULL_WIDTH, placeholder: BLURRED, width: 400, height: 400)
      }
    }
    site {
      siteMetadata {
        title
      }
    }
    contentfulAsset(title: { eq: "contact" }) {
      gatsbyImage(layout: FULL_WIDTH, placeholder: BLURRED, width: 300, height: 400)
    }
    allContentfulPartner {
      edges {
        node {
          title
          website
          image {
            id
            gatsbyImage(layout: FULL_WIDTH, placeholder: BLURRED, width: 400, height: 400)
          }
        }
      }
    }
  }
`;
