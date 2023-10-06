import React from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get';
import { Helmet } from 'react-helmet';
import Layout from '../components/layout';
import favicon from '../images/favicon.ico';

class FourOhFour extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const contactImage = get(this, 'props.data.contentfulAsset.gatsbyImage');

    return (
      <Layout location={this.props.location} footerImage={contactImage} hasBigLogo={false}>
        <Helmet title={siteTitle}>
          <link rel="icon" href={favicon} />
        </Helmet>
        <div className="wrapper">
          <h1 className="pageTitle">Pagina niet gevonden</h1>
          <div className="textBlock">Oeps... de pagina die u zoekt kunnen we niet vinden.</div>
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query FourohFourIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    contentfulPageContent(title: { eq: "contact" }) {
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

export default FourOhFour;
