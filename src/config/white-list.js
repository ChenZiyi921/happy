const isWhiteList = (to) => {
  return whiteListByPath.indexOf(to.path) !== -1
}

export default isWhiteList
