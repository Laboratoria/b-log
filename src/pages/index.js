import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const demos = data.allGoogleSpreadsheetSourceDemos.edges.map((e) => e.node);

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      {demos.map(({ fecha, estudiante, proyecto, video }) => {
        const title = `${estudiante} ${proyecto}`;
        return (
          <article key={title}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={`/${estudiante}/${proyecto}`}>
                  {title}
                </Link>
              </h3>
              <small>{fecha}</small>
            </header>
          </article>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allGoogleSpreadsheetSourceDemos {
      edges {
        node {
          fecha
          estudiante
          proyecto
          video
        }
      }
    }
  }
`
