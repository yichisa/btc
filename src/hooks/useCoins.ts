import { useState, useEffect } from 'react';
import { Coin } from '../types/coinTypes';
import { initializeIcons } from '@fluentui/react/lib/Icons';

initializeIcons();

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
          quantity: coin.quantity,
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
        coin.id === coinId ? { ...coin, isAdded: true, quantity: 1 } : coin
      )
    );
  };

  const removeCoin = (coinId: string) => {
    setCoins((prevCoins) =>
      prevCoins.map((coin) =>
        coin.id === coinId ? { ...coin, isAdded: false, quantity: 0 } : coin
      )
    );
  };


  const incrementQuantity = (coinId: string) => {
    setCoins((prevCoins) =>
      prevCoins.map((coin) =>
        coin.id === coinId ? { ...coin, quantity: coin.quantity + 1 } : coin
      )
    );
  };

  const decrementQuantity = (coinId: string) => {
    setCoins((prevCoins) =>
      prevCoins.map((coin) =>
        coin.id === coinId && coin.quantity > 1
          ? { ...coin, quantity: coin.quantity - 1 }
          : coin
      )
    );
  };

  return { coins, addCoin, removeCoin, incrementQuantity, decrementQuantity, loading, error };
};

export default useCoins;
