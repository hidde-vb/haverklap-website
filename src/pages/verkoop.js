import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'

import styles from './verkoop.module.css'
import Layout from '../components/layout'
import ProductPreview from '../components/product-preview'

class Verkoop extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const pageContent = get(this, 'props.data.contentfulPageContent')
    const products = get(this, 'props.data.allContentfulProduct.edges')
    const contactImage = get(this, 'props.data.contentfulAsset.contactImage')

    return (
      <Layout location={this.props.location} footerImage={contactImage}>
        <Helmet title={siteTitle} />
        <div className="wrapper">
          <h1 className="pageTitle">{pageContent.title}</h1>
          <div className="textBlock"
            dangerouslySetInnerHTML={{
              __html: pageContent.article.childMarkdownRemark.html,
            }}
          />
          <div className={styles.productList}>
            {products.map(({ node }) => {
              return (
                <ProductPreview key={node.slug} product={node} />
              )
            })}
          </div>
        </div>
      </Layout>
    )
  }
}

export default Verkoop

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
    contentfulAsset(title: { eq: "contact" }) {
      contactImage: fluid(
        maxWidth: 300
        maxHeight: 400
        background: "rgb:000000"
      ) {
        ...GatsbyContentfulFluid_tracedSVG
      }
    }
    allContentfulProduct {
      edges {
        node {
          title
          slug
          article {
            childMarkdownRemark {
              html
            }
          }
          images { 
            id
            fluid(
              maxWidth: 350
              maxHeight: 400
              background: "rgb:000000"
            ) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`
