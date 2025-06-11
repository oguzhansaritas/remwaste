const BASE_URL = 'https://app.wewantwaste.co.uk/api';

export interface SkipOption {
  id: string;
  size: string;
  price: number;
  description?: string;
  imageUrl?: string;
}

export async function fetchSkips(postcode: string, area: string): Promise<SkipOption[]> {
  const url = 
    BASE_URL +
    '/skips/by-location?postcode=' + encodeURIComponent(postcode) +
    '&area=' + encodeURIComponent(area);
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to load skip data');
  const data = await res.json();
  console.log('Fetched skips raw:', data);
  return data.map((o: any) => ({
    id: String(o.id),
    size: String(o.size) + 'm³',
    price: o.price_before_vat,
    description: o.allows_heavy_waste ? 'Allows heavy waste' : 'No heavy waste',
    imageUrl: '/skips/skip-' + o.size + '.png'
  }));
}