import Typography from "@material-ui/core/Typography"
import Img from "gatsby-image"
import * as R from "ramda"
import React from "react"
import { SideBySideMagnifier } from "react-image-magnifiers"
import LazyHero from "react-lazy-hero"

const ImageContext = React.createContext({})

const solve_image = ({ images_data, images_sharp }, image_name) => {
  const find_image_data = y => R.find(x => x.name === y, images_data.nodes)
  const find_image_sharp = y =>
    R.find(x => x.fluid.originalName === y, images_sharp.nodes)

  const image_data = find_image_data(image_name)
  const image_sharp = find_image_sharp(image_data.image)

  return {
    image_data: image_data,
    image_sharp: image_sharp,
  }
}

const RichImage = ({ image_name, aspectRatio, onClick }) => {
  const { image_data, image_sharp } = solve_image(
    React.useContext(ImageContext),
    image_name
  )

  return (
    <div onClick={onClick}>
      <Img fluid={{ ...image_sharp.fluid, aspectRatio: 1 }} />
    </div>
  )
}

const MagnifierImage = ({ image_name }) => {
  const { image_data, image_sharp } = solve_image(
    React.useContext(ImageContext),
    image_name
  )

  return (
    <SideBySideMagnifier
      imageSrc={image_sharp.fluid.src}
      imageAlt={image_data.alt}
      alwaysInPlace={true}
    />
  )
}

const Hero = () => {
  const { image_data, image_sharp } = solve_image(
    React.useContext(ImageContext),
    "japan_tea_plantation"
  )

  return (
    <LazyHero
      imageSrc={image_sharp.fluid.src}
      minHeight="75vh"
      opacity={0.5}
      color="#FFFFFF"
      parallaxOffset={10}
    >
      <Typography variant="h1" component="h1" gutterBottom>
        Чай Матча
      </Typography>
      <Typography variant="h5" component="p" gutterBottom>
        Ваша энергия и настроение
      </Typography>
    </LazyHero>
  )
}

// const BackgroundHeroImageGrid = ({ image_name, children }) => {
//   const { image_data, image_sharp } = solve_image(
//     React.useContext(PageContext),
//     image_name
//   )

//   return (
//     <Tint>
//       <BackgroundImage fluid={image_sharp.fluid}>
//         <Grid
//           container
//           spacing={0}
//           direction="column"
//           alignItems="center"
//           justify="center"
//           style={{ minHeight: "100vh" }}
//         >
//           {children}
//         </Grid>
//       </BackgroundImage>
//     </Tint>
//   )
// }

export { ImageContext, RichImage, MagnifierImage, Hero }
