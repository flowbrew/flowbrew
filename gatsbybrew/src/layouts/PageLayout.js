import React from "react"
import Typography from "@material-ui/core/Typography"
import MainLayout from "../layouts/MainLayout"

/* TODO: fix empty frontmatter in MDX files */

export default ({ children, pageContext, ...other }) => {
  return (
    <MainLayout {...other}>
      <Typography variant="h3" component="h1" gutterBottom>
        {pageContext.frontmatter.title}
      </Typography>
      {children}
    </MainLayout>
  )
}
