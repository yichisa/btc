import React from 'react';
import { Stack, DefaultButton, Text, Image } from '@fluentui/react';
import { Coin } from '../types/coinTypes';
import { formatPrice } from '../utils/formatPrice';

interface CoinListProps {
  coins: Coin[];
  onAdd: (coinId: string) => void;
}

const CoinList: React.FC<CoinListProps> = ({ coins, onAdd }) => {
  return (
    <Stack tokens={{ childrenGap: 10 }}>
        <Text variant="xxLarge">Available Coins</Text>
        <Stack
        horizontal
        wrap
        tokens={{ childrenGap: 20 }}
        styles={{ root: { justifyContent: 'center' } }}
        >
        {coins.map((coin) => (
            <Stack
            key={coin.id}
            tokens={{ childrenGap: 10 }}
            styles={{ root: { width: '200px', textAlign: 'center', border: '1px solid #ccc', padding: '10px', borderRadius: '8px' } }}
            >
            <Image
                src={coin.image}
                alt={coin.name}
                height={50}
                width={50}
            />
            
            <Text variant="large">{coin.name}</Text>
            
            <Text>{formatPrice(coin.price)}</Text>
            
            {!coin.isAdded && (
                <DefaultButton
                text="Add to List"
                onClick={() => onAdd(coin.id)}
                />
            )}
            </Stack>
        ))}
        </Stack>
    </Stack>
  );
};

export default CoinList;
