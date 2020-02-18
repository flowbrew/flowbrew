import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import Container from "@material-ui/core/Container"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import Paper from "@material-ui/core/Paper"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import Rating from "@material-ui/lab/Rating"
import { graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import Img from "gatsby-image"
import _ from "lodash"
import React from "react"
import { RegularGrid, Column2 } from "../components/RegularGrid"
import RegularHeader from "../components/RegularHeader"
import RegularParagraph from "../components/RegularParagraph"
import MainLayout from "../layouts/MainLayout"
import ImageDataWrapper from "../components/ImageDataWrapper"
import lorem from "../lorem"

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

const PlaceholderBackgroundImage = ({ children, data }) => {
  const aspectRatio = 1 / 1
  return (
    <Card>
      <Img
        fluid={{
          ...data.matcha.childImageSharp.fluid,
          aspectRatio: aspectRatio,
        }}
      />
    </Card>
  )
}

const OfferImagePreview = () => (
  <Grid item xs={12}>
    ImagePreview
  </Grid>
)

const OfferImages = () => (
  <Box>
    <RegularGrid>
      <Grid item xs={12}>
        Image
      </Grid>
      <OfferImagePreview />
      <OfferImagePreview />
      <OfferImagePreview />
      <OfferImagePreview />
    </RegularGrid>
  </Box>
)

const OfferHeader = () => (
  <Box>
    <RegularHeader>{lorem.generateWords(2)}</RegularHeader>
    <Rating name="size-medium" defaultValue={5} readOnly />
    <RegularParagraph>3380 rub</RegularParagraph>
  </Box>
)

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

const Hero = ({ children, data }) => {
  return (
    <BackgroundImage fluid={data.plantation.childImageSharp.fluid}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          Hello World!
        </Grid>
      </Grid>
    </BackgroundImage>
  )
}

const InfoSection = ({ left, right }) => (
  <Section>
    <RegularGrid>
      <Column2>{left}</Column2>
      <Column2>{right}</Column2>
    </RegularGrid>
  </Section>
)

const OfferSection = () => (
  <Section>
    <OfferHeader />
    <OfferImages />
    <OfferFeatures />
    <Promotion />
    <BuyButton />
    <WorkWithRejections />
  </Section>
)

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

const Matcha = ({ data }) => {
  const img = <PlaceholderBackgroundImage data={data} />
  const PlaceholderSection = () => (
    <InfoSection left={img} right={<PlaceholderTextBlock />} />
  )

  return (
    <MainLayout>
      <Hero data={data} />
      <PlaceholderSection />
      <PlaceholderSection />
      <OfferSection />
      <ReviewsSection />
      <FAQSection />
      <BuyButtonSection />
      <SignatureSection />
    </MainLayout>
  )
}

export const query = graphql`
  query MyQuery {
    plantation: file(relativePath: { eq: "japan_tea_plantation.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    matcha: file(relativePath: { eq: "gift_matcha_tea_box_from_top_ex.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
export default Matcha
