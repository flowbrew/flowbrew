import React from "react"
import Grid from "@material-ui/core/Grid"

const RegularGrid = ({ children }) => {
  return (
    <Grid container spacing={2}>
      {children}
    </Grid>
  )
}

const Column1 = ({ children }) => (
  <Grid item xs={12}>
    {children}
  </Grid>
)

const Column2 = ({ children }) => (
  <Grid item xs={12} sm={6}>
    {children}
  </Grid>
)

const Column4 = ({ children }) => (
  <Grid item xs={3}>
    {children}
  </Grid>
)

export { RegularGrid, Column1, Column2, Column4 }
