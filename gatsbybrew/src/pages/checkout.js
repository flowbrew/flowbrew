import Box from "@material-ui/core/Box"
import { graphql } from "gatsby"
import PageLayout from "../layouts/PageLayout"
import Img from "gatsby-image"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import RegularParagraph from "../components/RegularParagraph"
import { Container, Paper, Typography } from "@material-ui/core"
import { styled } from "@material-ui/styles"
import theme from "../theme"
import React, { Component } from "react"
import * as R from "ramda"
import { ImageContext } from "../components/ImageDataWrapper"

/* HARD: promocode support */

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

const STextField = styled(TextField)({
  marginBottom: theme.spacing(2),
  width: "100%",
})

const SRegularParagraph = styled(({ children }) => (
  <Box style={{ marginBottom: theme.spacing(3) }}>
    <RegularParagraph>{children}</RegularParagraph>
  </Box>
))({
  marginBottom: theme.spacing(3),
})

const MyTextField = ({ name, field, ...props }) => (
  <STextField
    name={name}
    id={name}
    label={field}
    variant="outlined"
    {...props}
  />
)

// TODO: how to apply styles?

const Panel = styled(Paper)({
  paddingTop: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  marginBottom: theme.spacing(2),
})

const ContactInfo = () => (
  <Container>
    <Panel>
      <SRegularParagraph>
        Если это ваш первый заказ, то вы получите бесплатный набор для заварки.
      </SRegularParagraph>
      <MyTextField field="name" />
      <MyTextField field="phone" />
    </Panel>
  </Container>
)

const ShippingInfo = ({ product, address, city, onChange }) => {
  const shipping = R.find(R.pathEq(["destination"], city), product.shipping)

  return (
    <Container>
      <Panel>
        <RadioGroup
          aria-label="gender"
          value={city}
          name="shipping_city"
          onChange={onChange}
        >
          {R.map(
            ({ destination, cost, description }) => (
              <FormControlLabel
                value={destination}
                control={<Radio />}
                label={destination}
                key={destination}
              />
            ),
            product.shipping
          )}
        </RadioGroup>
        <MyTextField
          value={address}
          name="shipping_address"
          field="address"
          onChange={onChange}
        />
        <SRegularParagraph>
          {shipping && shipping.description}
        </SRegularParagraph>
      </Panel>
    </Container>
  )
}

const PriceInfo = () => (
  <Container>
    <Panel>
      <SRegularParagraph>
        Вы можете оплатить заказ после получения. Оплата банковским переводом на
        карту Сбербанка или Тинькофф.
      </SRegularParagraph>
    </Panel>
  </Container>
)

const CheckoutForm = ({ data }) => {
  const product = data.product

  const [state, setState] = React.useState({
    shipping_city: product.shipping[0].destination,
    shipping_address: "",
  })

  const handleInputChange = event => {
    const target = event.target
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name

    setState({ ...state, [name]: value })
  }

  return (
    <>
      <Product data={data} />
      <ContactInfo />
      <ShippingInfo
        product={product}
        address={state.shipping_address}
        city={state.shipping_city}
        onChange={handleInputChange}
      />
      <PriceInfo />
    </>
  )
}

export default ({ data }) => {
  return (
    <ImageContext.Provider
      value={{
        images_sharp: data.images_sharp,
        images_data: data.images_data,
      }}
    >
      <PageLayout pageContext={pageContext}>
        <CheckoutForm data={data} />
      </PageLayout>
    </ImageContext.Provider>
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
      shipping {
        destination
        cost
        description
      }
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
