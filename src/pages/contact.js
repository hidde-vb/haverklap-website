import emailjs from '@emailjs/browser';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import get from 'lodash/get';
import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../components/layout';
import favicon from '../images/favicon.ico';
import * as styles from './contact.module.css';

class RootIndex extends React.Component {
  state = {
    disabled: false,
    message: 'verstuur bericht',
  };

  sendEmail = (e) => {
    e.preventDefault();

    emailjs.send('service_4f1u8bm', 'template_6or4q6s', {
      name: document.querySelector("#user_name").value,
      message: document.querySelector("#message").value,
      email: document.querySelector("#user_mail").value,
    }).then(
      (result) => {
        console.log(result.text);
        this.setState({
          disabled: true,
          message: 'Verzonden! Bedankt voor je bericht.',
        });
      },
      (error) => {
        console.log(error);
        this.setState({
          disabled: true,
          message: 'Er ging iets mis, probeer later opnieuw.',
        });
      },
    );
  };

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const contactImage = get(this, 'props.data.contentfulAsset.gatsbyImage');
    const pageContent = get(this, 'props.data.contentfulPageContent');

    emailjs.init({
    publicKey: "82LYrTyAJukkNcSym",
    blockHeadless: true,
  });

    return (
      <Layout location={this.props.location} footerImage={contactImage} hasBigLogo={false}>
        <Helmet title={siteTitle}>
          <link rel="icon" href={favicon} />
        </Helmet>
        <div className="wrapper">
          <h1 className="pageTitle">{pageContent.title}</h1>
          <div
            className="textBlock"
            dangerouslySetInnerHTML={{
              __html: pageContent.article.childMarkdownRemark.html,
            }}
          />
          <div className={styles.contactWrapper}>
            <GatsbyImage className={styles.gridImage} alt={pageContent.title} image={pageContent.images[0].gatsbyImage} />
            <div className={styles.gridTile}>
              <form id="contact-form" className={styles.form} onSubmit={this.sendEmail}>
                <input type="hidden" name="contact_number" />
                <div className={styles.group}>
                  <label htmlFor="user_name">
                    Naam
                    <input type="text" required id="user_name" name="user_name" placeholder="" />
                  </label>
                </div>
                <div className={styles.group}>
                  <label htmlFor="user_mail">
                    Email
                    <input type="email" required id="user_mail" name="user_mail" placeholder="voorbeeld@mail.com" />
                  </label>
                </div>
                <div className={styles.group}>
                  <label htmlFor="message">
                    Bericht (max 300 karakters)
                    <textarea required name="message" id="message" placeholder="uw bericht" disabled={this.state.disabled}></textarea>
                  </label>
                </div>
                <div className={styles.group}>
                  <input id="submit" class="button" type="submit" value={this.state.message} disabled={this.state.disabled} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default RootIndex;

export const pageQuery = graphql`
  query ContactIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    contentfulPageContent(title: { eq: "contact" }) {
      title
      article {
        childMarkdownRemark {
          html
        }
      }
      images {
        id
        gatsbyImage(layout: FULL_WIDTH, width: 400, height: 300)
      }
    }
    contentfulAsset(title: { eq: "contact" }) {
      gatsbyImage(layout: FULL_WIDTH, width: 300, height: 400)
    }
  }
`;
