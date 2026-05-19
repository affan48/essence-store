import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useCart } from "@/components/site/CartProvider";
import type { Product } from "@/data/products";

export function ProductCard({
  product,
  large = false,
  badge,
}: {
  product: Product;
  large?: boolean;
  badge?: string;
}) {
  const { addToCart, toggleWish, wishlist } = useCart();
  const wished = wishlist.includes(product.id);

  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-card mb-4">
        <Link to="/products/$id" params={{ id: product.id }}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-0"
          />
          <img
            src={product.altImage}
            alt=""
            loading="lazy"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        </Link>

        {(badge || product.badge) && (
          <div className="absolute top-4 left-4 glass border border-border/60 px-3 py-1 rounded-full text-[9px] uppercase tracking-widest text-foreground">
            {badge ?? product.badge}
          </div>
        )}

        <button
          onClick={() => toggleWish(product.id)}
          aria-label="Wishlist"
          className="absolute top-4 right-4 glass border border-border/60 h-9 w-9 rounded-full flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
        >
          <Heart
            className={`h-3.5 w-3.5 ${wished ? "fill-current" : ""}`}
          />
        </button>

        <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <button
            onClick={() =>
              addToCart({
                productId: product.id,
                size: product.sizes[Math.floor(product.sizes.length / 2)],
                color: product.colors[0].name,
                qty: 1,
              })
            }
            className="w-full bg-background/80 backdrop-blur border border-border text-foreground py-3 text-[10px] uppercase tracking-[0.2em] rounded-full hover:bg-foreground hover:text-background transition-colors"
          >
            Quick Add
          </button>
        </div>
      </div>
      <div className="flex justify-between gap-3">
        <div className="min-w-0">
          <Link
            to="/products/$id"
            params={{ id: product.id }}
            className={`block ${large ? "text-base" : "text-sm"} font-medium truncate hover:underline underline-offset-4`}
          >
            {product.name}
          </Link>
          <p className="text-[10px] text-foreground/40 uppercase tracking-widest mt-1">
            {product.category}
          </p>
        </div>
        <span className={`${large ? "text-base" : "text-sm"} text-foreground/80`}>
          ${product.price.toLocaleString()}
        </span>
      </div>
    </div>
  );
}