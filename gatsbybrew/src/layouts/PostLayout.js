import React from "react"
import MainLayout from "../layouts/MainLayout"

export default ({ children, ...other }) => (
  <MainLayout {...other}>
    {children}
  </MainLayout>
)
