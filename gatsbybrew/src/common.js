import queryString from "query-string"

const parseLocation = location =>
  location.search ? queryString.parse(location.search) : {}

export { parseLocation }
