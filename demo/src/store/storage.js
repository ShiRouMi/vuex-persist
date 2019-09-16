export function getStorage(key) {
  if (!key) return false;
  return JSON.parse(localStorage.getItem(key));
}

export function setStorage(key, value) {
  if (!key) return false;
  value = JSON.stringify(value);
  localStorage.setItem(key, value);
}

export function removeStorage(key) {
  if (!key) return false;
  localStorage.removeItem(key);
}

export const CART_STORAGE = 'cart_storage'
export const IS_CHECKOUT = 'is_checkout'