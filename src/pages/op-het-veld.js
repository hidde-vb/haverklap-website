import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'

import Layout from '../components/layout'
import Partner from '../components/partner'
import ImageGrid from '../components/imageGrid'

import styles from './op-het-veld.module.css'

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const contactImage = get(this, 'props.data.contentfulAsset.contactImage')
    const pageContent = get(this, 'props.data.contentfulPageContent')
    const partners = get(this, 'props.data.allContentfulPartner.edges')

    return (
      <Layout location={this.props.location} footerImage={contactImage} hasBigLogo={true}>
        <Helmet title={siteTitle} />
        <div className="wrapper">
          <h1 className="pageTitle">{pageContent.title}</h1>
          <div className="textBlock"
            dangerouslySetInnerHTML={{
              __html: pageContent.article.childMarkdownRemark.html,
            }}
          />
          <div className={styles.partnerList}>
            {partners.map(({ node }) => {
              return (
                <Partner key={node.title} partner={node} />
              )
            })}
          </div>
          <ImageGrid data={pageContent.images} />
        </div>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query OpHetVeldIndexQuery {
    contentfulPageContent(title: { eq: "op het veld"}) {
      title
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
          background: "rgb:000000"
        ) {
          ...GatsbyContentfulFluid_tracedSVG
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
    allContentfulPartner {
      edges {
        node {
          title
          website
          image { 
            id
            fluid(
              maxWidth: 400
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
