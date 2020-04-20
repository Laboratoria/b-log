import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import { rhythm } from "../utils/typography"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  let entries = data.allGoogleSpreadsheetSourceEntries.edges.map((e) => e.node);
  entries = entries.sort((a, b) => a.fecha < b.fecha);

  return (
    <Layout location={location} title={siteTitle}>
      {entries.map(({ fecha, estudiantes, proyecto, tipo, generacion, reto }) => {
        const estudiantesArr = estudiantes.split('\n');
        let title;
        let url;
        if (estudiantesArr.length > 1) {
          title = `${proyecto} ${generacion} ${reto}`;
          url = `/${generacion}/${proyecto}/${reto}/${tipo}`;
        } else {
          title = `${estudiantes} ${proyecto} (${generacion})`;
          url = `/${estudiantes}/${tipo}/${proyecto}`;
        }
        return (
          <article key={title}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={url}>
                  [{generacion}] {proyecto} {reto || ''} - {tipo}
                </Link>
              </h3>
              <small>{fecha.substr(0, 10)} - {estudiantesArr.map((e) => (<strong>{e}, </strong>))}</small>
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
    allGoogleSpreadsheetSourceEntries {
      edges {
        node {
          id
          fecha
          tipo
          generacion
          estudiantes
          proyecto
          video
          endpoint
          repo
          reto
          jedi
        }
      }
    }
  }
`
