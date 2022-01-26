export const getRedirectUrl = (invoice = {}) => {
  try {
    return JSON.parse(invoice.description).redirectUrl;
  } catch (e) {
    return null;
  }
};

export const getTitle = (invoice = {}) => {
  try {
    return JSON.parse(invoice.description).title;
  } catch (e) {
    return null;
  }
};
