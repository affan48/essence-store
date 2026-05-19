import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";

import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CartProvider } from "@/components/site/CartProvider";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <span className="font-serif italic text-[14rem] leading-none text-foreground/10 tracking-tighter select-none">
        404
      </span>
      <p className="-mt-12 text-[10px] uppercase tracking-[0.3em] text-foreground/40">
        Off the archive map
      </p>
      <h1 className="mt-6 font-serif text-4xl text-balance text-center max-w-md">
        This piece has either sold out or never existed.
      </h1>
      <div className="mt-10 flex gap-4">
        <Link
          to="/"
          className="bg-foreground text-background px-8 py-3 text-[11px] uppercase tracking-[0.2em] rounded-full hover:bg-foreground/90"
        >
          Return Home
        </Link>
        <Link
          to="/shop"
          className="border border-border px-8 py-3 text-[11px] uppercase tracking-[0.2em] rounded-full hover:border-foreground"
        >
          Browse Shop
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">
            <Outlet />
          </main>
          <SiteFooter />
        </div>
      </CartProvider>
    </QueryClientProvider>
  );
}
