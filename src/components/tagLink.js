import React from 'react'
import { Link } from 'gatsby'
import generatePathToTag from '../shared/pathToTagGenerator'

const TagLink = ({ tag, children }) => (
  <Link to={generatePathToTag(tag)}>{children}</Link>
)

export default TagLink
