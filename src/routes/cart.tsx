import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/components/site/CartProvider";
import { products } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Bag · Avant-Garde" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, removeFromCart, updateQty, subtotal } = useCart();
  return (
    <div className="px-6 md:px-10 py-16 max-w-6xl mx-auto">
      <h1 className="font-serif text-5xl md:text-6xl mb-12">Your Bag</h1>
      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12">
        <div className="divide-y divide-border border-y border-border">
          {items.length === 0 && <p className="py-12 text-foreground/50">Your bag is empty.</p>}
          {items.map((i) => {
            const p = products.find((x) => x.id === i.productId)!;
            return (
              <div key={`${i.productId}-${i.size}`} className="flex gap-6 py-6">
                <img src={p.image} alt={p.name} className="h-32 w-24 object-cover rounded-md" />
                <div className="flex-1">
                  <div className="flex justify-between"><h3 className="font-serif text-xl">{p.name}</h3><span>${p.price.toLocaleString()}</span></div>
                  <p className="text-[10px] uppercase tracking-widest text-foreground/40 mt-2">{i.color} · {i.size}</p>
                  <div className="mt-6 flex items-center gap-6">
                    <div className="inline-flex items-center border border-border rounded-full">
                      <button onClick={() => updateQty(i.productId, i.size, i.qty - 1)} className="p-2"><Minus className="h-3 w-3" /></button>
                      <span className="w-8 text-center text-xs">{i.qty}</span>
                      <button onClick={() => updateQty(i.productId, i.size, i.qty + 1)} className="p-2"><Plus className="h-3 w-3" /></button>
                    </div>
                    <button onClick={() => removeFromCart(i.productId, i.size)} className="text-[10px] uppercase tracking-widest text-foreground/40 hover:text-foreground inline-flex items-center gap-1"><X className="h-3 w-3" /> Remove</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <aside className="lg:sticky lg:top-28 lg:self-start border border-border rounded-xl p-8 bg-card space-y-6">
          <h2 className="font-serif text-2xl">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-foreground/60">Subtotal</span><span>${subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-foreground/60">Shipping</span><span>Free</span></div>
            <div className="flex justify-between text-base pt-3 border-t border-border"><span>Total</span><span>${subtotal.toLocaleString()}</span></div>
          </div>
          <input placeholder="Promo code" className="w-full bg-background border border-border rounded-full px-4 py-3 text-sm outline-none" />
          <Link to="/checkout" className="block text-center bg-foreground text-background py-4 text-[11px] uppercase tracking-[0.2em] font-semibold rounded-full">Secure Checkout</Link>
        </aside>
      </div>
      <section className="mt-24">
        <h2 className="font-serif text-3xl mb-8">You may also like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{products.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </section>
    </div>
  );
}