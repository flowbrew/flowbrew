import Cookies from "universal-cookie"

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
  return d_.toFixed(0) + " " + word
}

const int_to_days = d => {
  return int_to_(d, "дней", "день", "дня")
}

const int_to_hours = d => {
  return int_to_(d, "часов", "час", "часа")
}

const toHours = timedelta => parseInt(Math.round(timedelta / (60 * 60 * 1000)))

const couponDescription = (coupon, currentTime) => {
  if (!coupon.discount) {
    return ``
  }

  return (
    `Скидка ${(coupon.discount * 100).toFixed(0)}%` +
    (coupon.expiration
      ? ` действительна ${int_to_hours(
          toHours(coupon.expiration - currentTime)
        )}`
      : ``)
  )
}

function addDays(date, days) {
  var result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

const couponBase = (product, code, currentTime) => {
  switch (product.pid) {
    case "flowbrew60":
      switch (code) {
        case "FLB10":
        case "FB10":
        case "GIFT10":
          return { discount: 0.1, expiration: addDays(currentTime, 2) }

        case "FLOW15":
          return { discount: 0.15 }
      }
  }
  return { discount: 0 }
}

const loadCouponIO = (product, code, currentTime) => {
  const cookies = new Cookies()

  const cookie_name = couponCookie(product, code)
  const cookie = cookies.get(cookie_name)

  if (cookie == undefined) {
    const coupon = couponBase(product, code, currentTime)
    if (coupon.discount) {
      cookies.set(cookie_name, coupon, {
        maxAge: 30 * 24 * 60 * 60,
      })
      cookies.set(couponLastCookie(product), code, {
        maxAge: 30 * 24 * 60 * 60,
      })
    }
    return coupon
  }

  return { ...cookie, ...{ expiration: new Date(cookie.expiration) } }
}

const couponCookie = (product, code) => `${product.pid}_${code}`
const couponLastCookie = (product) => `Last_promocode_of_${product.pid}`

const discountCouponIO = (product, code) => {
  const currentTime = new Date()
  const coupon = loadCouponIO(product, code, currentTime)

  if (coupon.expiration < currentTime) {
    return { discount: 0.0 }
  }

  return {
    product: product,
    code: code,
    discount: coupon.discount,
    coupon_description: couponDescription(coupon, currentTime),
  }
}

export { discountCouponIO }
