const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const generatePathToTag = require('./src/shared/pathToTagGenerator.js')

const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`)
const blogListTemplate = path.resolve("./src/templates/blog-list.js")
const tagTemplate = path.resolve(`src/templates/tag.js`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { frontmatter: { date: DESC } }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                tags
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const posts = result.data.allMarkdownRemark.edges
    CreateBlogPostPages(posts, createPage)
    CreateBlogPostListPages(posts, createPage)

    let tags = CompileTags(posts)
    CreateTagsPages(tags, createPage)
  })
}

function CreateBlogPostPages(posts, createPage) {
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPostTemplate,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

function CreateBlogPostListPages(posts, createPage) {
  createPage({
    path: `/`,
    component: blogListTemplate,
    context: {
      limit: 1000,
      skip: 0,
    },
  })
}

function CompileTags(posts,) {
  let tags = new Set()

  posts.forEach(({ node }) => {
    if(node.frontmatter.tags) {
      node.frontmatter.tags.forEach((tag) => 
        tags.add(tag)
      )
    }
  })

  return tags
}

function CreateTagsPages(tags, createPage) {
  tags.forEach( tag => {
    createPage({
      path: generatePathToTag(tag),
      component: tagTemplate,
      context: {
        tag
      }
    })
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type MarkdownRemarkFrontmatter {
      img: File @fileByRelativePath
    }
    type MarkdownRemark implements Node {
      frontmatter: MarkdownRemarkFrontmatter
    }
  `)
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
