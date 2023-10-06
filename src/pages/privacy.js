import React from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get';
import { Helmet } from 'react-helmet';
import Layout from '../components/layout';
import favicon from '../images/favicon.ico';

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const contactImage = get(this, 'props.data.contentfulAsset.gatsbyImage');
    const pageContent = get(this, 'props.data.contentfulPageContent');

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
        </div>
      </Layout>
    );
  }
}

export default RootIndex;

export const pageQuery = graphql`
  query PrivacyQuery {
    contentfulAsset(title: { eq: "contact" }) {
      gatsbyImage(layout: FULL_WIDTH, width: 300, height: 400)
    }
    contentfulPageContent(title: { eq: "privacy" }) {
      title
      article {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
