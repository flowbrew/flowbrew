import React from "react"

import MainLayout from "../layouts/MainLayout"

const InfoSection = () => null
const OfferSection = () => null
const Reviews = () => null
const FAQ = () => null
const SignatureSection = () => null
const BuyButtonSection = () => null

const Index = ({location}) => {
  return (
    <MainLayout location={location}>
      <InfoSection />
      <InfoSection />
      <OfferSection />
      <Reviews />
      <FAQ />
      <BuyButtonSection />
      <SignatureSection />
    </MainLayout>
  )
}

export default Index
