import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Card from "@material-ui/core/Card"

export default ({ children, aspectRatio, data }) => {
  return (
    <Card>
      <Img
        fluid={{
          ...data.matcha.childImageSharp.fluid,
          aspectRatio: aspectRatio || 1,
        }}
      />
    </Card>
  )
}
