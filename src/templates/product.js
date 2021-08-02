import React from 'react'
import { graphql, Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'

import styles from './product.module.css'

class ProductTemplate extends React.Component {
  render() {
    const product = get(this.props, 'data.contentfulProduct')
    const contactImage = get(this, 'props.data.contentfulAsset.contactImage')
    const productImages = [...product.images]
    const mainProductImage = productImages.shift();

    return (
      <Layout location={this.props.location} footerImage={contactImage} hasBigLogo={false}>
        <Helmet title={`${product.title}`} />
        <div className="wrapper">
          <Link className={styles.link} to={`/verkoop`}>
            <button className="button button-light">← terug</button>
          </Link>
          <div className={styles.productWrapper}>
            <Img className={styles.gridTile} key={mainProductImage.id} alt={mainProductImage.title} fluid={mainProductImage.fluid} />
            <div className={`${styles.gridTile} ${styles.article}`}>
              <h2 className="title">{product.title}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: product.article.childMarkdownRemark.html,
                }}
              />
              <Link className={styles.link} to={`/contact`}>
                <button className="button">Bestel hier → </button>
              </Link>
            </div>
            {productImages.map(image => {
              return (
                <Img className={styles.gridTile} key={image.id} alt={image.title} fluid={image.fluid} />
              )
            })}
          </div>
        </div>
      </Layout>
    )
  }
}

export default ProductTemplate

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
`
