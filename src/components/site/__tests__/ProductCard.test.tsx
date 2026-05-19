import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductCard } from '../ProductCard';
import { CartProvider } from '@/components/site/CartProvider';

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, to }: any) => <a href={to}>{children}</a>,
  useRouter: () => ({}),
}));

import { products } from '@/data/products';

// Use the first product from our actual data so CartProvider can find it
const mockProduct = products[0];

describe('ProductCard Component', () => {
  it('renders product details correctly', () => {
    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    );

    expect(screen.getAllByText('Sculpted Wool Overcoat').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Outerwear').length).toBeGreaterThan(0);
    expect(screen.getAllByText('$1,240').length).toBeGreaterThan(0);
  });

  it('can trigger quick add', () => {
    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    );
    
    const btn = screen.getByText('Quick Add');
    expect(btn).toBeDefined();
    fireEvent.click(btn);
  });
});
