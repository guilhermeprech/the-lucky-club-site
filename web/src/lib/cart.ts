export type CartItem = {
  id: number;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

const CART_KEY = "the-lucky-club-bag";
const CART_EVENT = "cart-updated";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  const cart = localStorage.getItem(CART_KEY);
  const items: CartItem[] = cart ? JSON.parse(cart) : [];

  return items.map((item) =>
    item.imageUrl.startsWith("/") ? item : { ...item, imageUrl: "" }
  );
}

export function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event(CART_EVENT));
}

export function addToCart(item: Omit<CartItem, "quantity">) {
  const cart = getCart();
  const existingItem = cart.find((product) => product.id === item.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  saveCart(cart);
}

export function removeFromCart(id: number) {
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
}

export function updateQuantity(id: number, quantity: number) {
  const cart = getCart().map((item) =>
    item.id === id ? { ...item, quantity } : item
  );
  saveCart(cart);
}

export function clearCart() {
  saveCart([]);
}

export function getCartCount() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

export const cartUpdatedEvent = CART_EVENT;
