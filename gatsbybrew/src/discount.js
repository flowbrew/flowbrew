const extractCodeFromUrl = () => null

const int_to_ = (d_, a, b, c) => {
  var word = ""
  var d = d_ % 10
  if (d == 0 || d >= 5 || (d_ >= 11 && d_ <= 14)) {
    word = a
  } else if (d == 1) {
    word = b
  } else {
    word = c
  }
  return d_ + " " + word
}

const int_to_days = d => {
  return int_to_(d, "дней", "день", "дня")
}

const int_to_hours = d => {
  return int_to_(d, "часов", "час", "часа")
}

const couponDescription = (coupon, currentTime) => {
  if (!coupon.discount) {
    return ``
  }

  return (
    `Скидка ${(coupon.discount * 100).toFixed(0)}%` +
    (coupon.expiration
      ? ` действительна ${int_to_hours(coupon.expiration - currentTime)}`
      : ``)
  )
}

const couponBase = (product, code) => {
  switch (product.pid) {
    case "flowbrew60":
      switch (code) {
        case "FLB10":
        case "FB10":
        case "GIFT10":
          return { discount: 0.1, expiration: 2 }

        case "FLOW15":
          return { discount: 0.15 }
      }
  }
  return { discount: 0 }
}

const discountCoupon = (product, code, currentTime) => {
  const coupon = couponBase(product, code)
  return {
    ...coupon,
    ...{ coupon_description: couponDescription(coupon, currentTime) },
  }
}

export { discountCoupon }
