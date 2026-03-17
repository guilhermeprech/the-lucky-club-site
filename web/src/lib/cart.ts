export type CartItem = {
    id: number;
    name: string;
    brand: string;
    price: number;
    quantity: number;
  };
  
  const CART_KEY = "the-lucky-club-bag";
  
  export function getCart(): CartItem[] {
    if (typeof window === "undefined") return [];
  
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  }
  
  export function saveCart(cart: CartItem[]) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
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

  export function getCartCount() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }