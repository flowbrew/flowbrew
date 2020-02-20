const extractCodeFromUrl = () => null

const discountCoupon = (product, code) => {
  switch (product.pid) {
    case "flowbrew60":
      switch (code) {
        case "FLB10":
        case "FB10":
        case "GIFT10":
          return { discount: 0.1, expiration_in_days: 2 }

        case "FLOW15":
            return { discount: 0.15 }
      }
  }
  return { discount: 0 }
}

export { discountCoupon }
