import React, { Component } from "react"
import queryString from "query-string"
import Box from "@material-ui/core/Box"
import { styled } from "@material-ui/styles"
import * as R from "ramda"

const parseLocation = location =>
  location.search ? queryString.parse(location.search) : {}

const SBox = ({ children, ...other }) => (
  <Box component="span" {...other}>
    {children}
  </Box>
)

const RedBox = styled(SBox)({
  color: "red",
})

const CrossedBox = styled(SBox)({
  textDecoration: "line-through",
})

const mapIndexed = R.addIndex(R.map)

export { parseLocation, RedBox, CrossedBox, mapIndexed }
