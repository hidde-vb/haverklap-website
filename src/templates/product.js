import React, { useEffect, useState } from "react";
import { graphql, Link } from "gatsby";
import { Helmet } from "react-helmet";
import get from "lodash/get";
import Img from "gatsby-image";
import Layout from "../components/layout";
import Checkout from "../components/checkout";
import favicon from "../images/favicon.ico";

import styles from "./product.module.css";

const fetchProduct = async (product) => {
  const response = await fetch(`${process.env.API_URL}/products/${product}`, {
    method: "GET",
  });
  return response.json();
};

const formatEuro = (price) =>
  new Intl.NumberFormat("nl-BE", {
    currency: "EUR",
    style: "currency",
  }).format(price / 100);

const ProductTemplate = (props) => {
  const product = get(props, "data.contentfulProduct");
  const contactImage = get(props, "data.contentfulAsset.contactImage");
  const stripeProducts = get(props, "data.contentfulProduct.prices");

  const [specs, setSpecs] = useState([]);
  const [selectedSpec, setSelectedSpec] = useState(null);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const fetchSpecs = async () => {
      const data = await Promise.all(stripeProducts.map(fetchProduct));

      setSpecs(data);
      setSelectedSpec(data[0].price.id);
    };

    if (stripeProducts) fetchSpecs();
  }, [stripeProducts]);

  useEffect(() => {
    const spec = specs.find((e) => e.price.id === selectedSpec);

    if (spec) setPrice(formatEuro(spec.price.value));
  }, [selectedSpec]);

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
            {stripeProducts?.length > 0 && selectedSpec ? (
              <div>
                <div className={styles.select}>
                  <select
                    name="prices"
                    id="spec-select"
                    value={selectedSpec}
                    onChange={(e) => setSelectedSpec(e.target.value)}
                  >
                    {specs.map((spec) => (
                      <option key={spec.price.id} value={spec.price.id}>
                        {spec.name}
                      </option>
                    ))}
                  </select>
                  <span class="focus"></span>
                </div>
                <div className={styles.checkoutGroup}>
                  <h2 className={styles.price}>{price}</h2>
                  <Checkout spec={selectedSpec} />
                </div>
              </div>
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
      article {
        childMarkdownRemark {
          html
        }
      }
      prices
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
