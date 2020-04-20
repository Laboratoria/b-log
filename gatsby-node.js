const path = require(`path`)
// const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const entryTmpl = path.resolve(`./src/templates/entry.js`)
  const result = await graphql(
    `
      {
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
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const demos = result.data.allGoogleSpreadsheetSourceEntries.edges

  demos.forEach(({ node }) => {
    const estudiantes = node.estudiantes.split('\n');
    const { tipo, proyecto, generacion, reto } = node;
    
    estudiantes.forEach((estudiante) => {
      createPage({
        path: `/${estudiante}/${tipo}/${proyecto}`,
        component: entryTmpl,
        context: {
          ...node,
        },
      })
    });

    if (estudiantes.length > 1) {
      createPage({
        path: `/${generacion}/${proyecto}/${reto}/${tipo}`,
        component: entryTmpl,
        context: {
          ...node,
        },
      })
    }
  })
}

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions

//   if (node.internal.type === `MarkdownRemark`) {
//     const value = createFilePath({ node, getNode })
//     createNodeField({
//       name: `slug`,
//       node,
//       value,
//     })
//   }
// }
