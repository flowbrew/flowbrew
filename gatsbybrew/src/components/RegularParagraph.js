import React from "react"
import Typography from "@material-ui/core/Typography"

export default ({ children }) => {
  return (
    <Typography variant="body1" component="p" gutterBottom>
      {children}
    </Typography>
  )
}
