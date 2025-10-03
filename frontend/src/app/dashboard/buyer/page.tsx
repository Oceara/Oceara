"use client";

import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/i18n/i18n";

type MarketItem = {
  id: string;
  name: string;
  region: string;
  tons: number;
  price: number; // USD per tCO2e
  verified: boolean;
};

export default function BuyerDashboard() {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sort, setSort] = useState("price.asc");
  const [items, setItems] = useState<MarketItem[]>([]);
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    // TODO: fetch from backend marketplace
    setItems(seed);
  }, []);

  const filtered = useMemo(() => {
    let r = items.filter(i => i.name.toLowerCase().includes(query.toLowerCase()) || i.region.toLowerCase().includes(query.toLowerCase()));
    if (verifiedOnly) r = r.filter(i => i.verified);
    const [field, dir] = sort.split(".");
    r.sort((a: any, b: any) => dir === 'asc' ? a[field] - b[field] : b[field] - a[field]);
    return r;
  }, [items, query, verifiedOnly, sort]);

  const connectWallet = async () => {
    if ((window as any).ethereum) {
      await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      setWalletConnected(true);
    } else {
      alert('No wallet found');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h1 className="text-3xl font-bold">{t('marketplace')}</h1>
        <div className="flex items-center gap-2">
          <input
            className="px-3 py-2 border rounded-lg"
            placeholder="Search by name or region"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select className="px-3 py-2 border rounded-lg" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="price.asc">Price ↑</option>
            <option value="price.desc">Price ↓</option>
            <option value="tons.desc">Tons ↓</option>
            <option value="tons.asc">Tons ↑</option>
          </select>
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={verifiedOnly} onChange={(e) => setVerifiedOnly(e.target.checked)} /> Verified only
          </label>
          <button onClick={connectWallet} className="px-4 py-2 rounded-lg border hover:bg-gray-50">
            {walletConnected ? 'Wallet Connected' : t('connectWallet')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow p-6 flex flex-col">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-500 text-sm">{item.region}</p>
              </div>
              {item.verified && (
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">Verified</span>
              )}
            </div>
            <div className="grid grid-cols-3 gap-3 my-4 text-center">
              <div>
                <div className="text-gray-500 text-xs">Price</div>
                <div className="text-lg font-semibold">${item.price.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-gray-500 text-xs">Tons</div>
                <div className="text-lg font-semibold">{item.tons.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-gray-500 text-xs">Total</div>
                <div className="text-lg font-semibold">${(item.price * item.tons).toLocaleString()}</div>
              </div>
            </div>
            <button className="mt-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">{t('buyNow')}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const seed: MarketItem[] = [
  { id: '1', name: 'Green Valley Farm', region: 'California, USA', tons: 500, price: 8.5, verified: true },
  { id: '2', name: 'Solar Ridge', region: 'Texas, USA', tons: 900, price: 7.2, verified: true },
  { id: '3', name: 'Forest East', region: 'Oregon, USA', tons: 350, price: 6.8, verified: false },
  { id: '4', name: 'Wetland West', region: 'Florida, USA', tons: 1200, price: 9.1, verified: true },
  { id: '5', name: 'Wind Plains', region: 'Iowa, USA', tons: 600, price: 7.9, verified: false },
];


