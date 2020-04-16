const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
    `
      {
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
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const demos = result.data.allGoogleSpreadsheetSourceDemos.edges

  demos.forEach(({ node: demo }, index) => {
    const previous = index === demos.length - 1 ? null : demos[index + 1].node
    const next = index === 0 ? null : demos[index - 1].node

    console.log(`/${demo.estudiante}/${demo.proyecto}`)

    createPage({
      path: `/${demo.estudiante}/${demo.proyecto}`,
      component: blogPost,
      context: {
        ...demo,
        previous,
        next,
      },
    })
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
