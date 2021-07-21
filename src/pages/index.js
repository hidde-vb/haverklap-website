import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import Footer from '../components/footer'
import ImageGrid from '../components/imageGrid'

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const contactImage = get(this, 'props.data.contentfulAsset.contactImage')
    const pageContent = get(this, 'props.data.contentfulPageContent')

    return (
      <Layout location={this.props.location}>
        <Helmet title={siteTitle} />
        <div className="wrapper">
          <h1>{pageContent.title}</h1>
          <Img
            alt={pageContent.title}
            fluid={pageContent.titleImage.fluid}
          />
          <div style={{ maxWidth: '600px', fontSize: '19px', padding: '20px' }}
            dangerouslySetInnerHTML={{
              __html: pageContent.article.childMarkdownRemark.html,
            }}
          />
          <ImageGrid data={pageContent.images}/>
        </div>

        <Footer data={contactImage} />
      </Layout>
    )
  }
}

export default RootIndex

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
    contentfulPageContent {
      title
      titleImage {
        fluid(
                maxWidth: 1200
                maxHeight: 600
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
          background: "rgb:000000"
        ) {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
    }
  }
`
