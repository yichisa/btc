// src/components/ShoppingList/ShoppingList.tsx

import React from 'react';
import { Stack, PrimaryButton, Text } from '@fluentui/react';
import { Coin } from '../types/coinTypes';
import { formatPrice } from '../utils/formatPrice';

interface ShoppingListProps {
  coins: Coin[];
  onRemove: (coinId: string) => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({ coins, onRemove }) => {
  const addedCoins = coins.filter((coin) => coin.isAdded);

  return (
    <Stack tokens={{ childrenGap: 10 }}>
      <Text variant="xxLarge">Shopping List</Text>
      {addedCoins.length > 0 ? (
        addedCoins.map((coin) => (
          <Stack horizontal key={coin.id} horizontalAlign="space-between">
            <Text>{coin.name} - {formatPrice(coin.price)}</Text>
            <PrimaryButton
              text="Remove"
              onClick={() => onRemove(coin.id)}
            />
          </Stack>
        ))
      ) : (
        <Text>No coins added yet!</Text>
      )}
    </Stack>
  );
};

export default ShoppingList;
