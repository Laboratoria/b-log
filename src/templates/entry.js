import React from "react"
import { graphql } from "gatsby"
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'

import Layout from "../components/layout"
import { rhythm, scale } from "../utils/typography"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const { estudiantes, proyecto, fecha, tipo, video, generacion, repo, endpoint, reto } = pageContext

  let videoId;
  if (video) {
    [,,,,videoId] = video.split('/');
  }

  const estudiantesArr = estudiantes.split('\n');

  let discussIdentifier;
  let title;
  if (estudiantesArr.lengtrh > 0) {
    discussIdentifier=  `${generacion}-${proyecto}-${reto}`;
    title = `${generacion} - ${proyecto} - ${reto}`;
  } else {
    discussIdentifier = `${estudiantes}-${proyecto}`;
    title = `${estudiantes} - ${proyecto} - (${generacion})`;
  }

  let disqusConfig = {
    url: `${data.site.siteMetadata.siteUrl+location.pathname}`,
    identifier: discussIdentifier,
    title,
  }

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
            [{generacion}] {tipo} {proyecto}
          </h1>
          <h3
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {estudiantesArr.map((e) => (<span>{e}, </span>))}
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
        {videoId && (
          <section>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe
                title="videoEmbed"
                src={`https://www.loom.com/embed/${videoId}`}
                frameBorder="0"
                webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen
                style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'
                }}
              />
            </div>
          </section>
        )}
        <section>
          {endpoint && (<h5>Endpoint: <a href={repo} target="_blank" rel="noopener noreferrer">{endpoint}</a></h5>)}
          {repo && (<h5>Repo: <a href={repo} target="_blank" rel="noopener noreferrer">{repo}</a></h5>)}
        </section>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <CommentCount config={disqusConfig} placeholder={'...'} />
          <Disqus config={disqusConfig} />
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
        siteUrl
      }
    }
  }
`
