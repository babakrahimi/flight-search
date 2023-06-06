interface Price {
  amount: number;
  currency: string;
}

export function formatPrice(price: Price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
  }).format(price.amount);
}
