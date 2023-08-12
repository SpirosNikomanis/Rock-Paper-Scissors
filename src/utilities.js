export function addGlobalListener(parent, type, selector, callback, options) {
  parent.addEventListener(
    type,
    (e) => {
      if (e.target.matches(selector)) callback(e);
    },
    options
  );
}

export function Select(selector, parent = document) {
  return parent.querySelector(selector);
}

export function SelectAll(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}

export let itemByID = (id, arr) => arr.find((val) => val.id === id);

export let itemByRandomID = (id, arr) =>
  randomIndexItem(filteredArray(id, arr));

export let filteredArray = (id, arr) => arr.filter((val) => val.id !== id);

export let randomIndexItem = (arr) => arr[randomIndexNumber(arr)];

export let randomIndexNumber = (arr) => Math.floor(Math.random() * arr.length);
