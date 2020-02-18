import React from "react"
import { graphql } from "gatsby"
import ImageWithCaption from "../components/ImageWithCaption"

export const query = graphql`
  query($name: String) {
    imagesYaml(name: { eq: $name }) {
      alt
      image
      name
    }
  }
`

export default ({ children, data }) => {
  return (
    <>
      <ImageWithCaption image={data.imagesYaml.image}>
        {children}
      </ImageWithCaption>
    </>
  )
}
