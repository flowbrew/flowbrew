import AppBar from "@material-ui/core/AppBar"
import Box from "@material-ui/core/Box"
import Container from "@material-ui/core/Container"
import CssBaseline from "@material-ui/core/CssBaseline"
import Divider from "@material-ui/core/Divider"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import { styled, ThemeProvider } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import MenuIcon from "@material-ui/icons/Menu"
import React from "react"
import Helmet from "react-helmet"
import theme from "../theme"

const Seo = () => <Helmet></Helmet>

const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Typography variant="h6">Flow Brew</Typography>
    </Toolbar>
  </AppBar>
)

const Main = ({ children }) => <Box component="main">{children}</Box>

const StickyFooter = styled("footer")({
  textAlign: "center",
  backgroundColor: theme.palette.secondary.main,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
})

const Copyright = () => (
  <Typography variant="caption">© 2019, Flow Brew</Typography>
)

const ShortDivider = styled(Divider)({
  margin: "24px auto",
  width: 60,
})

const FooterItem = ({ text }) => (
  <Grid item xs={12}>
    <Typography gutterBottom color="textSecondary">
      {text}
    </Typography>
  </Grid>
)

const Footer = () => (
  <StickyFooter>
    <Container>
      <Grid container spacing={2}>
        <FooterItem text="about" />
        <FooterItem text="blog" />
        <FooterItem text="something" />
        <FooterItem text="other" />
      </Grid>
      <ShortDivider />
      <Copyright />
    </Container>
  </StickyFooter>
)

const FlbTheme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

const FullScreenBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
})

/* --------- */

const MainLayout = ({ children }) => (
  <FlbTheme>
    <Seo />
    <CssBaseline />
    <FullScreenBox>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </FullScreenBox>
  </FlbTheme>
)

export default MainLayout
