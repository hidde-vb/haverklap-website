import React, { useState } from "react";
import { graphql, Link } from "gatsby";
import { Helmet } from "react-helmet";
import get from "lodash/get";
import Img from "gatsby-image";
import Layout from "../components/layout";
import favicon from "../images/favicon.ico";

import styles from "./product.module.css";

// TODO test a simple checkout
// TODO show the first spec if available
// DONE render dropdown on een keep selection in state
//    TODO disable selection when sold out
//    TODO when everything is disabled. disable button
const ProductTemplate = (props) => {
  const product = get(props, "data.contentfulProduct");
  const contactImage = get(props, "data.contentfulAsset.contactImage");
  const specifications = get(
    props,
    "data.contentfulProduct.product_specification"
  );

  const [selectedSpec, setSelectedSpec] = useState(specifications[0]);
  const handleBlur = (e) => setSelectedSpec(e.target.value);

  console.log(selectedSpec);

  const productImages = [...product.images];
  const mainProductImage = productImages.shift();

  return (
    <Layout
      location={props.location}
      footerImage={contactImage}
      hasBigLogo={false}
    >
      <Helmet title={`${product.title}`}>
        <link rel="icon" href={favicon} />
      </Helmet>
      <div className="wrapper">
        <Link className={styles.link} to={`/verkoop`}>
          <button className="button button-light">← terug</button>
        </Link>
        <div className={styles.productWrapper}>
          <div className={styles.gridTileContainer}>
            <Img
              className={styles.gridTile}
              key={mainProductImage.id}
              alt={mainProductImage.title}
              fluid={mainProductImage.fluid}
            />
          </div>
          <div className={`${styles.gridTile} ${styles.article}`}>
            <h2 className="title">{product.title}</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: product.article.childMarkdownRemark.html,
              }}
            />
            {specifications?.length > 0 && (
              <div>
                <select
                  name="specifications"
                  id="spec-select"
                  value={selectedSpec}
                  onChange={(e) => setSelectedSpec(e.target.value)}
                >
                  {specifications.map((spec) => {
                    return <option value={spec.price}>{spec.name}</option>;
                  })}
                </select>
                <p></p>
              </div>
            )}
            {specifications?.length > 0 ? (
              <Link className={styles.link} to={`/contact`}>
                <button className="button">Bestel online</button>
              </Link>
            ) : (
              <Link className={styles.link} to={`/contact`}>
                <button className="button">Bestel hier → </button>
              </Link>
            )}
          </div>
          {productImages.map((image) => {
            return (
              <Img
                className={styles.gridTile}
                key={image.id}
                alt={image.title}
                fluid={image.fluid}
              />
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default ProductTemplate;

export const pageQuery = graphql`
  query ProductBySlug($slug: String!) {
    contentfulAsset(title: { eq: "contact" }) {
      contactImage: fluid(
        maxWidth: 300
        maxHeight: 400
        background: "rgb:000000"
      ) {
        ...GatsbyContentfulFluid_tracedSVG
      }
    }
    contentfulProduct(slug: { eq: $slug }) {
      title
      product_specification {
        name
        price
      }
      article {
        childMarkdownRemark {
          html
        }
      }
      images {
        id
        title
        fluid(
          maxWidth: 600
          maxHeight: 500
          quality: 95
          background: "rgb:000000"
        ) {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
    }
  }
`;
