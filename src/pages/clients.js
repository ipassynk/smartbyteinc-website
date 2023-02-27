import React from "react";
import { graphql, Link } from "gatsby";
import Helmet from "react-helmet";
import SEO from "../components/SEO";
import Layout from "../components/Layout";
import Call from "../components/Call";

const Clients = (props) => {
  const intro = props.data.intro;
  const features = props.data.features.edges;
  const introImageClasses = `intro-image ${intro.frontmatter.intro_image_absolute && 'intro-image-absolute'} ${intro.frontmatter.intro_image_hide_on_mobile && 'intro-image-hide-mobile'}`;

  return (
    <Layout bodyClass="page-clients">
      <SEO title={"Clients"} />

      <div className="intro">
        <div className="container">
          <div className="row justify-content-start">
            <div className="col-12 col-md-7 col-lg-6 order-2 order-md-1">
              <div dangerouslySetInnerHTML={{ __html: intro.html }} />
            </div>
            {intro.frontmatter.intro_image && (
              <div className="col-12 col-md-5 col-lg-6 order-1 order-md-2 position-relative">
                <img alt={intro.frontmatter.title} className={introImageClasses} src={intro.frontmatter.intro_image} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container pb-6">
        <div className="row">
          {features.map(({node}) => (
            <div key={node.id} className="col-12 col-md-4 mb-1">
              <div className="card service service-teaser">
                <div className="card-content">
                  <h2 style={{color: '#8036ca'}}>
                  {node.title}
                  </h2>
                  <ul style={{padding: '20px'}}>
                  {(node.items || []).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
       </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    features: allFeaturesJson {
      edges {
        node {
          id
          title
          items
        }
      }
    }
    intro: markdownRemark(fileAbsolutePath: {regex: "/(clients.md)/"}) {
        html
        frontmatter {
          title
          image
          intro_image
          intro_image_absolute
          intro_image_hide_on_mobile
        }
      }
  }
`;

export default Clients;
