const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    format: 'mdx',
  },
})

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
})
