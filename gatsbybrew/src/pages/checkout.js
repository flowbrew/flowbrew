import React from "react"
import { graphql } from "gatsby"
import PageLayout from "../layouts/PageLayout"
import Img from "gatsby-image"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import RegularParagraph from "../components/RegularParagraph"
import { Container } from "@material-ui/core"

const pageContext = {
  frontmatter: {
    title: "Оформление заказа",
  },
}

const Product = ({ data }) => (
  <Container>
    <Img fluid={data.matcha.childImageSharp.fluid}></Img>
    <Typography variant="h2" component="h2" gutterBottom>
      Caption
    </Typography>
  </Container>
)

const MyTextField = ({ field }) => (
  <TextField id={field} label={field} variant="outlined" />
)

const ContactInfo = () => (
  <Container>
    <MyTextField field="name" />
    <MyTextField field="phone" />
    <RadioGroup aria-label="gender" value="female" name="gender1">
      <FormControlLabel value="female" control={<Radio />} label="SMS" />
      <FormControlLabel value="male" control={<Radio />} label="Telegram" />
      <FormControlLabel value="other" control={<Radio />} label="WhatsApp" />
      <FormControlLabel value="other2" control={<Radio />} label="Facebook" />
    </RadioGroup>
  </Container>
)

const ShippingInfo = () => (
  <Container>
    <RadioGroup aria-label="gender" value="female" name="gender1">
      <FormControlLabel value="female" control={<Radio />} label="Moscow" />
      <FormControlLabel
        value="male"
        control={<Radio />}
        label="Saint Petersburg"
      />
      <FormControlLabel value="other" control={<Radio />} label="Other" />
    </RadioGroup>
    <MyTextField field="address" />
    <RegularParagraph>Something about shipping</RegularParagraph>
  </Container>
)

const Checkout = ({ data }) => {
  return (
    <PageLayout pageContext={pageContext}>
      <Product data={data} />
      <ContactInfo />
      <ShippingInfo />
    </PageLayout>
  )
}

export const query = graphql`
  query CheckoutQuery {
    matcha: file(relativePath: { eq: "gift_matcha_tea_box_from_top_ex.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
export default Checkout
