import { useState, useEffect } from 'react';
import { Coin } from '../types/coinTypes';

const useCoins = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch coins');
        }
        const data = await response.json();
        const formattedCoins: Coin[] = data.map((coin: any) => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          image: coin.image,
          price: coin.current_price,
          isAdded: false,
        }));
        setCoins(formattedCoins);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  const addCoin = (coinId: string) => {
    setCoins((prevCoins) =>
      prevCoins.map((coin) =>
        coin.id === coinId ? { ...coin, isAdded: true } : coin
      )
    );
  };

  const removeCoin = (coinId: string) => {
    setCoins((prevCoins) =>
      prevCoins.map((coin) =>
        coin.id === coinId ? { ...coin, isAdded: false } : coin
      )
    );
  };

  return { coins, addCoin, removeCoin, loading, error };
};

export default useCoins;
