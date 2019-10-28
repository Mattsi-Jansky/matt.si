const convertToKebabCase = string => {
  return string.replace(/\s+/g, '-').toLowerCase()
}

module.exports = tag => `/tags/${convertToKebabCase(tag)}/`
