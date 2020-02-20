import Cookies from "universal-cookie"

/* TODO: add e2e discount test */

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

const default_cookie_params = {
  maxAge: 30 * 24 * 60 * 60,
}

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
      cookies.set(cookie_name, coupon, default_cookie_params)
    }
    return coupon
  }

  return { ...cookie, ...{ expiration: new Date(cookie.expiration) } }
}

const expirePromocodeIO = (product, code) => {
  const cookies = new Cookies()

  const cookie_name = couponCookie(product, code)
  const cookie = cookies.get(cookie_name) || { discount: 0 }

  const coupon = { ...cookie, ...{ expiration: new Date(1980, 1, 1) } }

  storePromocodeIO(product, "")
  cookies.set(cookie_name, coupon, default_cookie_params)
}

const couponCookie = (product, code) => `${product.pid}_${code}`
const couponLastCookie = product => `Last_promocode_of_${product.pid}`

const discountCouponIO = (product, code) => {
  const code2 = code ? code.toUpperCase() : ""
  const currentTime = new Date()
  const coupon = loadCouponIO(product, code2, currentTime)

  if (coupon.expiration < currentTime) {
    return { discount: 0.0 }
  }

  if (coupon.discount) {
    storePromocodeIO(product, code2)
  }

  return {
    product: product,
    code: code2,
    discount: coupon.discount,
    coupon_description: couponDescription(coupon, currentTime),
  }
}

const lastEnteredPromocodeIO = product => {
  const cookies = new Cookies()
  return cookies.get(couponLastCookie(product))
}

const storePromocodeIO = (product, code) => {
  const code2 = code ? code.toUpperCase() : ""
  const cookies = new Cookies()
  cookies.set(couponLastCookie(product), code2, default_cookie_params)
}

const applyCoupon = (product, coupon) =>
  product.price * (1.0 - coupon.discount || 0.0)

const updateVisitHistoryIO = location => {
  const cookies = new Cookies()
  const cookie_name = `visit_history`

  const visit_history = cookies.get(cookie_name) || {}

  const new_history = {
    ...visit_history,
    ...{ [location.pathname]: (visit_history[location.pathname] || 0) + 1 },
  }

  cookies.set(cookie_name, new_history, default_cookie_params)

  return new_history
}

const autoPromotionIO = (product, location) => {
  var history = updateVisitHistoryIO(location)

  const code = lastEnteredPromocodeIO(product)

  if (location.pathname == encodeURI(`/спасибо`)) {
    if (code) {
      expirePromocodeIO(product, code)
    }
  } else if (!code) {
    const promotion1 = (history["/matcha"] || 0) == 2
    const promotion2 = (history["/checkout"] || 0) == 1

    if (promotion1 || promotion2) {
      storePromocodeIO(product, "GIFT10")
    }
  }
}

export {
  discountCouponIO,
  storePromocodeIO,
  lastEnteredPromocodeIO,
  applyCoupon,
  autoPromotionIO,
}
