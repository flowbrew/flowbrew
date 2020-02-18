import React from "react"
import Grid from "@material-ui/core/Grid"

const RegularGrid = ({ children }) => {
  return (
    <Grid container spacing={2}>
      {children}
    </Grid>
  )
}

const Column2 = ({ children }) => (
  <Grid item xs={12} sm={6}>
    {children}
  </Grid>
)

export { RegularGrid, Column2 }
