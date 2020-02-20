import AppBar from "@material-ui/core/AppBar"
import Box from "@material-ui/core/Box"
import Container from "@material-ui/core/Container"
import CssBaseline from "@material-ui/core/CssBaseline"
import Divider from "@material-ui/core/Divider"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import { styled, ThemeProvider, makeStyles } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import MenuIcon from "@material-ui/icons/Menu"
import React from "react"
import Helmet from "react-helmet"
import theme from "../theme"
import LogoText from "../images/logo_text.svg"
import Drawer from "@material-ui/core/Drawer"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import List from "@material-ui/core/List"
import InnerLink from "../components/InnerLink"

import ShoppingCart from "@material-ui/icons/ShoppingCart"

import { useStaticQuery, Link } from "gatsby"
import * as R from "ramda"

const Seo = () => <Helmet></Helmet>

const LogoTextH = styled(LogoText)({
  maxHeight: "40px",
  margin: "auto",
})

const useStyles = makeStyles({
  list: {
    width: 300,
  },
})

const Header = ({ data }) => {
  const classes = useStyles()

  const [state, setState] = React.useState({
    drawer: false,
  })

  const toggleDrawer = () => {
    setState({ ...state, drawer: !state.drawer })
  }

  const listIcon = x => {
    switch (x) {
      case "blog":
        return <></>
      case "shop":
        return <ShoppingCart />
      default:
        return <></>
    }
  }

  // TODO: link color
  // TODO: icons
  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        {R.map(
          ({ link, title, icon }) => (
            <InnerLink to={link} key={link}>
              <ListItem button>
                <ListItemIcon>{listIcon(icon)}</ListItemIcon>
                <ListItemText primary={title} />
              </ListItem>
            </InnerLink>
          ),
          data.navigation.nodes
        )}
      </List>
    </div>
  )

  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <LogoTextH />
        </Toolbar>
      </AppBar>
      <Drawer open={state.drawer} onClose={toggleDrawer}>
        {sideList()}
      </Drawer>
    </>
  )
}

const Main = ({ children }) => <Box component="main">{children}</Box>

const StickyFooter = styled("footer")({
  textAlign: "center",
  backgroundColor: theme.palette.primary.main,
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

const Footer = ({ data }) => {
  return (
    <StickyFooter>
      <Container>
        <Grid container spacing={2} style={{ paddingTop: theme.spacing(2) }}>
          {R.map(
            ({ link, title, icon }) => (
              <Grid item xs={12} sm={3} key={link} >
                <InnerLink to={link} >
                  <Typography variant="button" color="textSecondary">
                    {title}
                  </Typography>
                </InnerLink>
              </Grid>
            ),
            data.navigation.nodes
          )}
        </Grid>
        <ShortDivider />
        <Copyright />
      </Container>
    </StickyFooter>
  )
}

const FlbTheme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

const FullScreenBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
})

/* --------- */

/* TODO: apply promocode from url param from any website page */

const MainLayout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      navigation: allNavigationYaml {
        nodes {
          link
          title
          icon
        }
      }
    }
  `)

  return (
    <FlbTheme>
      <Seo />
      <CssBaseline />
      <FullScreenBox>
        <Header data={data} />
        <Main>{children}</Main>
        <Footer data={data} />
      </FullScreenBox>
    </FlbTheme>
  )
}

export default MainLayout
