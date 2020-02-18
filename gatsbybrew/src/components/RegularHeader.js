import React from "react"
import _ from "lodash"
import Typography from "@material-ui/core/Typography"

export default ({ children }) => {
  return (
    <Typography variant="h2" component="h2" gutterBottom>
      {_.capitalize(children)}
    </Typography>
  )
}
