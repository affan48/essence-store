import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Link } from "@tanstack/react-router";
import { X, Plus, Minus } from "lucide-react";
import { products, type Product } from "@/data/products";

type CartItem = {
  productId: string;
  size: string;
  color: string;
  qty: number;
};

type WishItem = string;

type CartContextValue = {
  items: CartItem[];
  wishlist: WishItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQty: (productId: string, size: string, qty: number) => void;
  toggleWish: (productId: string) => void;
  openCart: () => void;
  closeCart: () => void;
  isOpen: boolean;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([
    { productId: "sculpted-wool-overcoat", size: "M", color: "Onyx", qty: 1 },
    { productId: "cirrus-cashmere-knit", size: "S", color: "Ivory", qty: 1 },
  ]);
  const [wishlist, setWishlist] = useState<WishItem[]>([
    "atrium-leather-tote",
    "mono-lens-frame",
  ]);
  const [isOpen, setOpen] = useState(false);

  const addToCart = useCallback((item: CartItem) => {
    setItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.productId === item.productId && i.size === item.size,
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + item.qty };
        return next;
      }
      return [...prev, item];
    });
    setOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: string, size: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.size === size)),
    );
  }, []);

  const updateQty = useCallback(
    (productId: string, size: string, qty: number) => {
      setItems((prev) =>
        prev.map((i) =>
          i.productId === productId && i.size === size
            ? { ...i, qty: Math.max(1, qty) }
            : i,
        ),
      );
    },
    [],
  );

  const toggleWish = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((p) => p !== productId)
        : [...prev, productId],
    );
  }, []);

  const subtotal = useMemo(
    () =>
      items.reduce((sum, i) => {
        const p = products.find((x) => x.id === i.productId);
        return sum + (p ? p.price * i.qty : 0);
      }, 0),
    [items],
  );

  const value: CartContextValue = {
    items,
    wishlist,
    addToCart,
    removeFromCart,
    updateQty,
    toggleWish,
    openCart: () => setOpen(true),
    closeCart: () => setOpen(false),
    isOpen,
    subtotal,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

function CartDrawer() {
  const { isOpen, closeCart, items, removeFromCart, updateQty, subtotal } =
    useCart();

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeCart}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-background border-l border-border flex flex-col transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <span className="font-serif text-2xl">Your Bag</span>
          <button onClick={closeCart} aria-label="Close" className="p-2">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="text-center py-24 text-foreground/50 text-sm">
              Your bag is empty.
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((i) => {
                const p = products.find((x) => x.id === i.productId) as Product;
                return (
                  <li key={`${i.productId}-${i.size}`} className="flex gap-4 py-5">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-28 w-20 object-cover rounded-md"
                    />
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between">
                        <Link
                          to="/products/$id"
                          params={{ id: p.id }}
                          onClick={closeCart}
                          className="text-sm hover:underline"
                        >
                          {p.name}
                        </Link>
                        <span className="text-sm">${p.price.toLocaleString()}</span>
                      </div>
                      <p className="text-[10px] uppercase tracking-widest text-foreground/40 mt-1">
                        {i.color} · Size {i.size}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="inline-flex items-center border border-border rounded-full">
                          <button
                            onClick={() => updateQty(i.productId, i.size, i.qty - 1)}
                            className="p-2"
                            aria-label="Decrease"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-2 text-xs w-6 text-center">{i.qty}</span>
                          <button
                            onClick={() => updateQty(i.productId, i.size, i.qty + 1)}
                            className="p-2"
                            aria-label="Increase"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(i.productId, i.size)}
                          className="text-[10px] uppercase tracking-widest text-foreground/40 hover:text-foreground"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="border-t border-border p-6 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-foreground/60">Subtotal</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-foreground/40">
            Shipping & taxes calculated at checkout
          </p>
          <Link
            to="/checkout"
            onClick={closeCart}
            className="block w-full text-center bg-foreground text-background py-4 text-[11px] uppercase tracking-[0.2em] font-semibold rounded-full hover:bg-foreground/90 transition-colors"
          >
            Checkout — ${subtotal.toLocaleString()}
          </Link>
          <Link
            to="/cart"
            onClick={closeCart}
            className="block w-full text-center border border-border py-3 text-[11px] uppercase tracking-[0.2em] rounded-full hover:border-foreground transition-colors"
          >
            View Bag
          </Link>
        </div>
      </aside>
    </div>
  );
}