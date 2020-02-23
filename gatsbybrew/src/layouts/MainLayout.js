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
import React, {useEffect} from "react"
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
import { discountCouponIO, autoPromotionIO } from "../discount"
import { useStaticQuery, Link } from "gatsby"
import PropTypes from "prop-types"
import * as R from "ramda"
import Amplify, { API } from "aws-amplify"
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

const Seo = () => <Helmet></Helmet>

const HEADER_CONTENT_HEIGHT = "40px"

const LogoTextH = styled(LogoText)({
  maxHeight: HEADER_CONTENT_HEIGHT,
  margin: "auto",
})

const useStyles = makeStyles({
  list: {
    width: 300,
  },
})

/* TODO: hide on scroll down */
/* TODO: add night theme */
/* TODO: add link to home */

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
              <Grid item xs={12} sm={3} key={link}>
                <InnerLink to={link}>
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

const Skipper = styled(Box)({
  height: HEADER_CONTENT_HEIGHT,
})

/* --------- */

const MainLayout = ({ children, location }) => {
  const data = useStaticQuery(graphql`
    query {
      navigation: allNavigationYaml {
        nodes {
          link
          title
          icon
        }
      }

      product: productsYaml(pid: { eq: "flowbrew60" }) {
        name
        pid
      }
    }
  `)

  autoPromotionIO(data.product, location)
  
  useEffect(() => {
    async function sideEffect() {
      const data = await API.get('flowbrew', '/flowbrew')
      console.info('----->', data)
    }

    sideEffect();
  });

  return (
    <FlbTheme>
      <Seo />
      <CssBaseline />
      <FullScreenBox>
        <Header data={data} />
        <Skipper />
        <Main>{children}</Main>
        <Footer data={data} />
      </FullScreenBox>
    </FlbTheme>
  )
}

MainLayout.propTypes = {
  location: PropTypes.any.isRequired,
}

export default MainLayout
