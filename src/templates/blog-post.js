import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const { estudiante, proyecto, fecha, video, previous, next } = pageContext

  const [,,,,videoId] = video.split('/');
  console.log(videoId)
  return (
    <Layout location={location} title={siteTitle}>
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {estudiante}
          </h1>
          <h3
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {proyecto}
          </h3>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {fecha}
          </p>
        </header>
        <section>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
            <iframe
              src={`https://www.loom.com/embed/${videoId}`}
              frameborder="0"
              webkitallowfullscreen mozallowfullscreen allowfullscreen
              style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'
              }}
            />
          </div>
        </section>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
        </footer>
      </article>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
