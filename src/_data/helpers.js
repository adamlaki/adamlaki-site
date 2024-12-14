export const getLinkActiveState = (itemUrl, pageUrl) => {
  let response = '';

  if (itemUrl === pageUrl) {
    response = ' aria-current="page"';
  }

  if (itemUrl.length > 1 && pageUrl.indexOf(itemUrl) === 0) {
    response += ' data-state="active"';
  }

  return response;
};

export const getActiveLang = (currentLang, lang) => {
  let response = '';

  if (currentLang === lang) {
    response = ' data-state="active"';
  }

  return response;
};

export const getHomeUrl = (lang) => {
  let response = '';

  if (lang === 'en') {
    response = '/';
  } else {
    response = `/${lang}/`;
  }

  return response;
};

export const getSiblingContent = (collection, item, limit = 3, random = true) => {
  let filteredItems = collection.filter(x => x.url !== item.url);

  if (random) {
    let counter = filteredItems.length;

    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

      counter--;

      let temp = filteredItems[counter];

      // Swap the last element with the random one
      filteredItems[counter] = filteredItems[index];
      filteredItems[index] = temp;
    }
  }

  // Lastly, trim to length
  if (limit > 0) {
    filteredItems = filteredItems.slice(0, limit);
  }

  return filteredItems;
};

export const currentYear = () => {
  const today = new Date();
  return today.getFullYear();
};
