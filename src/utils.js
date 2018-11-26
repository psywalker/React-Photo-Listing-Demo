export function getPageNumbers (page, perPage, totalCards) {
  return (1 + (Math.ceil(totalCards / perPage)));
}

export function generateNavItems(page, perPage, totalCards, itemNumbers) {
  let navigationItems = [];
  const i = getPageNumbers(page, perPage, totalCards);
  
  if(i < 2) {
    navigationItems = [];
  } else if (i === 2) {
    navigationItems.push(1);
  }
  else if (page < (itemNumbers + 1)) {
   navigationItems = Array.from({ length: i - 1 }, (_, k) => k + 1);
  }
  else {
    for (let k = page - (itemNumbers - 1); k < i; k += 1) {
      navigationItems.push(k);
    }
  }
  return navigationItems;
}