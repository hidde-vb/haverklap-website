import React from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get';
import { Helmet } from 'react-helmet';

import Layout from '../components/layout';
import favicon from '../images/favicon.ico';

const winkelwagenPage = (props) => {
  const siteTitle = get(props, 'data.site.siteMetadata.title');
  const contactImage = get(props, 'data.contentfulAsset.contactImage');

  return (
    <Layout location={props.location} footerImage={contactImage} hasBigLogo={false}>
      <Helmet title={siteTitle}>
        <link rel="icon" href={favicon} />
      </Helmet>
      <div className="wrapper">
        <h2 className="pageTitle">Winkelwagentje</h2>
      </div>
    </Layout>
  );
};

export default winkelwagenPage;

export const pageQuery = graphql`
  query winkelwagenQuery {
    contentfulAsset(title: { eq: "contact" }) {
      contactImage: fluid(maxWidth: 300, maxHeight: 400, background: "rgb:000000") {
        ...GatsbyContentfulFluid_tracedSVG
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;
