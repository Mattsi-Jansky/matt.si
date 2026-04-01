const convertToKebabCase = (string: string): string => {
  return string.replace(/\s+/g, '-').toLowerCase();
};

export default (tag: string): string => `/tags/${convertToKebabCase(tag)}/`;
