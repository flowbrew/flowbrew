import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import Rating from "@material-ui/lab/Rating"
import { graphql } from "gatsby"
import _ from "lodash"
import * as R from "ramda"
import React, { Component } from "react"
import {
  Hero,
  ImageContext,
  MagnifierImage,
  RichImage,
} from "../components/ImageDataWrapper"
import {
  Column1,
  Column2,
  Column4,
  RegularGrid,
} from "../components/RegularGrid"
import RegularHeader from "../components/RegularHeader"
import RegularParagraph from "../components/RegularParagraph"
import MainLayout from "../layouts/MainLayout"
import lorem from "../lorem"
import {
  discountCouponIO,
  lastEnteredPromocodeIO,
  applyCoupon,
} from "../discount"

/* TODO: add ability to display discount */
/* TODO: load coupon from cookies */

/* TODO: Features sections */
/* TODO: quantity and headless ecommerce*/
/* TODO: faq section*/
/* TODO: reviews section */
/* TODO: GTM */
/* HARD: Add discount on the second visit */
/* TODO: fonts and colors */

const PageContext = React.createContext({})

const Section = ({ children }) => <Container>{children}</Container>

const TextBlock = ({ header, text }) => (
  <Box>
    <RegularHeader>{header}</RegularHeader>
    <RegularParagraph>{text}</RegularParagraph>
  </Box>
)

const PlaceholderTextBlock = () => (
  <TextBlock
    header={_.capitalize(lorem.generateWords(3))}
    text={lorem.generateParagraphs(1)}
  />
)

class OfferImages extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedImage: null,
    }
  }

  render() {
    const product = this.props.product
    const selected_image = this.state.selectedImage || product.images[0]

    const click = image_name => {
      this.setState({ selectedImage: image_name })
    }

    return (
      <RegularGrid>
        <Column1>
          <MagnifierImage image_name={selected_image} />
        </Column1>
        {R.map(
          x => (
            <Column4 key={x}>
              <RichImage image_name={x} onClick={() => click(x)} />
            </Column4>
          ),
          product.images
        )}
      </RegularGrid>
    )
  }
}

/* TODO: fancy font*/
/* TODO: and display weight and cups*/

const OfferHeader = ({ product }) => {
  const promocode = lastEnteredPromocodeIO(product)
  const coupon = discountCouponIO(product, promocode)

  const orig_price = product.price
  const price = applyCoupon(product, coupon)

  // discount_desc: coupon.coupon_description || ``,
  // price: product.price * (1.0 - coupon.discount || 0.0),

  return (
    <Box>
      <RegularHeader>{lorem.generateWords(2)}</RegularHeader>
      <Rating name="size-medium" defaultValue={5} readOnly />
      <RegularParagraph>{price}</RegularParagraph>
    </Box>
  )
}

const OfferFeatures = () => (
  <ul>
    <li>Coffee</li>
    <li>Tea</li>
    <li>Milk</li>
  </ul>
)

const WorkWithRejections = () => (
  <ul>
    <li>Rejection 1</li>
    <li>Rejection 2</li>
    <li>Rejection 3</li>
  </ul>
)

const Promotion = () => <RegularParagraph>Осталось 3</RegularParagraph>

/* TODO: buy button design*/
const BuyButton = () => (
  <Button variant="contained" color="primary" href="/checkout">
    Buy
  </Button>
)

const MyExpansionPanel = () => (
  <ExpansionPanel expanded={false}>
    <ExpansionPanelSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1bh-content"
      id="panel1bh-header"
    >
      <Typography variant="h5">General settings</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <Typography>
        Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
        Aliquam eget maximus est, id dignissim quam.
      </Typography>
    </ExpansionPanelDetails>
  </ExpansionPanel>
)

const Review = () => (
  <Typography gutterBottom>
    {_.capitalize(lorem.generateSentences(1))}
  </Typography>
)

const InfoSection = ({ left, right }) => (
  <Section>
    <RegularGrid>
      <Column2>{left}</Column2>
      <Column2>{right}</Column2>
    </RegularGrid>
  </Section>
)

const OfferSection = ({ data }) => {
  const product = data.product
  return (
    <Section>
      <OfferHeader product={product} />
      <OfferImages product={product} />
      <OfferFeatures />
      <Promotion />
      <BuyButton />
      <WorkWithRejections />
    </Section>
  )
}

const SectionWithHeader = ({ header, children }) => (
  <Section>
    <RegularHeader>{header}</RegularHeader>
    {children}
  </Section>
)

const ReviewsSection = () => (
  <SectionWithHeader header="Reviews">
    <Review />
    <Review />
    <Review />
    <Review />
  </SectionWithHeader>
)

const FAQSection = () => (
  <SectionWithHeader header="FAQ">
    <MyExpansionPanel />
    <MyExpansionPanel />
    <MyExpansionPanel />
    <MyExpansionPanel />
  </SectionWithHeader>
)

const BuyButtonSection = () => (
  <Section>
    <BuyButton />
  </Section>
)

const SignatureSection = () => (
  <Section>
    <PlaceholderTextBlock />
    <RegularGrid>
      <Grid item xs={12}>
        Photo
      </Grid>
      <Grid item xs={12}>
        Signature
      </Grid>
    </RegularGrid>
  </Section>
)

export default ({ data, location }) => {
  const Context = ({ children }) => (
    <PageContext.Provider value={data}>
      <ImageContext.Provider
        value={{
          images_sharp: data.images_sharp,
          images_data: data.images_data,
        }}
      >
        {children}
      </ImageContext.Provider>
    </PageContext.Provider>
  )

  return (
    <Context>
      <MainLayout location={location}>
        <Hero />
        {/*<PlaceholderSection />
        <PlaceholderSection /> */}
        <OfferSection data={data} />
        {/* <ReviewsSection />
        <FAQSection />
        <BuyButtonSection />
        <SignatureSection /> */}
      </MainLayout>
    </Context>
  )
}

export const query = graphql`
  query {
    images_data: allImagesYaml {
      nodes {
        image
        name
        alt
      }
    }

    images_sharp: allImageSharp {
      nodes {
        fluid {
          ...GatsbyImageSharpFluid
          originalName
        }
      }
    }

    product: productsYaml(pid: { eq: "flowbrew60" }) {
      name
      pid
      price
      quantity
      images
      features {
        icon
        text
      }
      in_depth_features {
        header
        image
        text
      }
    }
  }
`
