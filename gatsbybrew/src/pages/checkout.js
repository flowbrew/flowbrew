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
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import {
  discountCouponIO,
  storePromocodeIO,
  lastEnteredPromocodeIO,
} from "../discount"
import { parseLocation } from "../common"

/* TODO: Do not let apply coupons twice */

/* TODO: contact section */
/* TODO: add buy and back buttons */
/* TODO: Add image with caption and set caption to product */
/* TODO: fix margins and paddings */

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
  const shipping = getShipping(product, city)

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

function ccyFormat(num) {
  return `${num.toFixed(0)}`
}

const allOrderPrices = R.map(R.path(["price"]))
const totalOrderPrice = R.compose(R.sum, allOrderPrices)

const CrossedBox = styled(Box)({
  textDecoration: "line-through",
})

const RedBox = styled(Box)({
  color: "red",
})

const formatOrderDesc = (desc, discount_desc) =>
  !discount_desc ? (
    <>{desc}</>
  ) : (
    <>
      {desc}
      <RedBox>{discount_desc}</RedBox>
    </>
  )

const formatOrderPrice = (price, orig_price) =>
  !orig_price || price === orig_price ? (
    <>{ccyFormat(price)}</>
  ) : (
    <>
      <CrossedBox>{ccyFormat(orig_price)}</CrossedBox>
      <RedBox>{ccyFormat(price)}</RedBox>
    </>
  )

const PriceInfo = ({ order }) => (
  <Container>
    <TableContainer component={Paper}>
      <Table aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>Наименование</TableCell>
            <TableCell align="right">Цена</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {R.map(
            ({ desc, discount_desc, price, orig_price }) => (
              <TableRow key={desc}>
                <TableCell>{formatOrderDesc(desc, discount_desc)}</TableCell>
                <TableCell align="right">
                  {formatOrderPrice(price, orig_price)}
                </TableCell>
              </TableRow>
            ),
            order
          )}
          <TableRow>
            <TableCell>Итого</TableCell>
            <TableCell align="right">
              {ccyFormat(totalOrderPrice(order))}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    <Panel>
      <SRegularParagraph>
        Вы можете оплатить заказ после получения. Оплата банковским переводом на
        карту Сбербанка или Тинькофф.
      </SRegularParagraph>
    </Panel>
  </Container>
)

const getShipping = (product, city) =>
  R.find(R.pathEq(["destination"], city), product.shipping)

const CheckoutForm = ({ data, query }) => {
  const product = data.product

  const [state, setState] = React.useState({
    shipping_city: product.shipping[0].destination,
    shipping_address: "",
    promocode: (
      query.code ||
      lastEnteredPromocodeIO(product) ||
      ""
    ).toUpperCase(),
    comment: "",
  })

  const shipping = getShipping(product, state.shipping_city)

  const coupon = discountCouponIO(product, state.promocode)
  if (coupon.discount) {
    storePromocodeIO(product, state.promocode)
  }

  const order = [
    {
      desc: `${product.name} ${product.weight} г`,
      discount_desc: coupon.coupon_description || ``,
      price: product.price * (1.0 - coupon.discount || 0.0),
      orig_price: product.price,
    },
    { desc: "Доставка", price: shipping ? shipping.cost : 0.0 },
  ]

  const handleInputChange = event => {
    const target = event.target
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name

    const value2 = name === "promocode" ? value.toUpperCase() : value

    setState({ ...state, [name]: value2 })
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
      <PriceInfo order={order} />
      <Container>
        <MyTextField
          name="promocode"
          field="promocode"
          value={state.promocode}
          onChange={handleInputChange}
        />
        <MyTextField
          name="comment"
          field="comment"
          value={state.comment}
          onChange={handleInputChange}
        />
      </Container>
    </>
  )
}

export default ({ data, location }) => {
  const query = parseLocation(location)

  return (
    <ImageContext.Provider
      value={{
        images_sharp: data.images_sharp,
        images_data: data.images_data,
      }}
    >
      <PageLayout pageContext={pageContext}>
        <CheckoutForm data={data} query={query} />
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
      weight
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
