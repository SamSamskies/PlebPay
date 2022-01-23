/***** THIS SCRIPT IS DEPRECATED. *****/
// See new plebpay-utils module on npm https://www.npmjs.com/package/plebpay-utils.
function redirectIfNecessary(plebPayUrl) {
  if (
    document.referrer !== "https://www.plebpay.com/" &&
    localStorage.getItem(plebPayUrl) === null
  ) {
    window.location = plebPayUrl;
  } else {
    localStorage.setItem(plebPayUrl, true);
  }
}
