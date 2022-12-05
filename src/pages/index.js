import React from "react";
import { graphql } from "gatsby";
import get from "lodash/get";
import { Helmet } from "react-helmet";
import Img from "gatsby-image";

import ImageGrid from "../components/imageGrid";
import Layout from "../components/layout";
import Modal from "../components/modal";

import signature from "../images/signature.jpg";
import favicon from "../images/favicon.ico";

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, "props.data.site.siteMetadata.title");
    const contactImage = get(this, "props.data.contentfulAsset.contactImage");
    const pageContent = get(this, "props.data.contentfulPageContent");
    const newsContent = get(this, "props.data.contentfulNews");

    const searchParams = this.props.location.search;

    return (
      <Layout
        location={this.props.location}
        footerImage={contactImage}
        hasBigLogo={true}
      >
        <Helmet title={siteTitle}>
          <link rel="icon" href={favicon} />
        </Helmet>
        <div className="jumbo">
          <Img alt={pageContent.title} fluid={pageContent.titleImage.fluid} />
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

        {searchParams.includes("success=true") && (
          <Modal>
          <p>Bedankt voor je bestelling!</p>
          <p>We gaan er direct mee aan de slag.</p>
        </Modal>
        )}
        {searchParams.includes("canceled=true") && (
        <Modal>
          <p>De bestelling is geannuleerd.</p>
        </Modal>
        )}
      </Layout>
    );
  }
}

export default RootIndex;

export const pageQuery = graphql`
  query HomeQuery {
    contentfulAsset(title: { eq: "contact" }) {
      contactImage: fluid(
        maxWidth: 300
        maxHeight: 400
        background: "rgb:000000"
      ) {
        ...GatsbyContentfulFluid_tracedSVG
      }
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
        fluid(
          maxWidth: 2400
          maxHeight: 1200
          quality: 95
          background: "rgb:000000"
        ) {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      article {
        childMarkdownRemark {
          html
        }
      }
      images {
        id
        fluid(
          maxWidth: 400
          maxHeight: 400
          quality: 95
          background: "rgb:000000"
        ) {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
    }
  }
`;
