import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import ImageGrid from '../components/imageGrid'
import favicon from '../images/favicon.ico'
class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const contactImage = get(this, 'props.data.contentfulAsset.contactImage')
    const pageContent = get(this, 'props.data.contentfulPageContent')

    return (
      <Layout location={this.props.location} footerImage={contactImage} hasBigLogo={false}>
        <Helmet title={siteTitle} >
          <link rel="icon" href={favicon} />
        </Helmet>
        <div className="wrapper">
          <h1 className="pageTitle">{pageContent.title}</h1>
          <div className="textBlock"
            dangerouslySetInnerHTML={{
              __html: pageContent.article.childMarkdownRemark.html,
            }}
          />
          <ImageGrid data={pageContent.images} />
        </div>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query AtelierIndexQuery {
    site {
      siteMetadata {
        title
      } 
    }
    contentfulPageContent(title: { eq: "atelier"}) {
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
          quality: 95
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
  }
`
