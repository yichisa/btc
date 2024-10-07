import React from 'react';
import { Stack, DefaultButton, Text } from '@fluentui/react';
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
      {coins.map((coin) => (
        <Stack horizontal key={coin.id} horizontalAlign="space-between">
          <Text>{coin.name} - {formatPrice(coin.price)}</Text>
          {!coin.isAdded && (
            <DefaultButton
              text="Add to List"
              onClick={() => onAdd(coin.id)}
            />
          )}
        </Stack>
      ))}
    </Stack>
  );
};

export default CoinList;
