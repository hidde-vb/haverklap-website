import React from 'react'
import { graphql } from 'gatsby'
import emailjs from 'emailjs-com';

import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import Img from 'gatsby-image'
import Layout from '../components/layout'

import styles from './contact.module.css'

class RootIndex extends React.Component {

  state = {
    disabled: false,
    message: 'verstuur bericht'
  }

  sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_4f1u8bm', 'template_6or4q6s', e.target, 'user_JCR0vlcC7YkydepGLSyMG')
      .then((result) => {
        console.log(result.text)
        this.setState({
          disabled: true,
          message: 'Verzonden! Bedankt voor je bericht.'
        })
      }, (error) => {
        console.log(error.text)
        this.setState({
          disabled: true,
          message: 'Er ging iets mis, probeer later opnieuw.'
        })
      })
  }

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const contactImage = get(this, 'props.data.contentfulAsset.contactImage')
    const pageContent = get(this, 'props.data.contentfulPageContent')

    return (
      <Layout location={this.props.location} footerImage={contactImage} hasBigLogo={false}>
        <Helmet title={siteTitle} />
        <div className="wrapper">
          <h1 className="pageTitle">{pageContent.title}</h1>
          <div className={styles.contactWrapper}>
            <Img className={styles.gridImage} alt={pageContent.title} fluid={pageContent.images[0].fluid} />
            <div className={styles.gridTile}>
              <form id="contact-form" className={styles.form} onSubmit={this.sendEmail}>
                <input type="hidden" name="contact_number" />
                <div className={styles.group}>
                  <label htmlFor="user_name">Naam</label>
                  <input type="text" required name="user_name" placeholder="" />
                </div>
                <div className={styles.group}>
                  <label htmlFor="user_mail">Email</label>
                  <input type="email" required name="user_mail" placeholder="voorbeeld@mail.com" />
                </div>
                <div className={styles.group}>
                  <label htmlFor="message">Bericht (max 300 karakters)</label>
                  <textarea required name="message" placeholder="uw bericht" disabled={this.state.disabled}></textarea>
                </div>
                <div className={styles.group}>
                  <input id="submit" type="submit" value={this.state.message} disabled={this.state.disabled} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query ContactIndexQuery {
    contentfulPageContent(title: { eq: "contact"}) {
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
          maxHeight: 300
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
