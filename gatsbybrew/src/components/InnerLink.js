import React from "react"
import { useStaticQuery, Link } from "gatsby"
import { styled } from "@material-ui/core/styles"

const SLink = styled(Link)({
  textDecoration: "none",
})

export default ({ children, ...props }) => {
  return <SLink {...props}>{children}</SLink>
}
