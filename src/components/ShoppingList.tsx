import React from 'react';
import { Stack, IconButton, Text, DefaultButton } from '@fluentui/react';
import { Coin } from '../types/coinTypes';
import { formatPrice } from '../utils/formatPrice';

interface ShoppingListProps {
  coins: Coin[];
  onRemove: (coinId: string) => void;
  onReset: () => void;
  onIncrement: (coinId: string) => void;
  onDecrement: (coinId: string) => void;

}
const getTotalPrice = (coins: Coin[]): number => {
    return coins
      .filter((coin) => coin.isAdded)
      .reduce((total, coin) => total + coin.price * coin.quantity, 0);
  };
  
const ShoppingList: React.FC<ShoppingListProps> = ({ coins, onRemove, onIncrement, onDecrement, onReset }) => {
  const addedCoins = coins.filter((coin) => coin.isAdded);
  const totalPrice = getTotalPrice(addedCoins);


  return (
    <Stack tokens={{ childrenGap: 10 }}>
      <Text variant="xxLarge">Shopping List</Text>
      {addedCoins.length > 0 ? (
        <Stack
          horizontal
          wrap
          tokens={{ childrenGap: 20 }}
          styles={{ root: { justifyContent: 'center' } }}
        >
          {addedCoins.map((coin) => (
            <Stack
              key={coin.id}
              tokens={{ childrenGap: 10 }}
              styles={{ root: { width: '200px', textAlign: 'center', border: '1px solid #ccc', padding: '10px', borderRadius: '8px' } }}
            >
              <img src={coin.image} alt={coin.name} height={50} width={50} />
  
              <Text variant="large">{coin.name}</Text>
  
              <Stack
                horizontal
                tokens={{ childrenGap: 10 }}
                verticalAlign="center"
                horizontalAlign="center"
              >
                <IconButton
                  iconProps={{ iconName: 'Remove' }}
                  onClick={() => onDecrement(coin.id)}
                  disabled={coin.quantity === 1}
                />
                <Text variant="medium">{coin.quantity}</Text>
                <IconButton
                  iconProps={{ iconName: 'Add' }}
                  title="Add"
                  ariaLabel="Add"
                  onClick={() => onIncrement(coin.id)}
                />
              </Stack>
  
              <Text variant="medium">
                Total: {formatPrice(coin.quantity * coin.price)}
              </Text>
  
              <DefaultButton
                text="Remove"
                onClick={() => onRemove(coin.id)}
              />
            </Stack>
          ))}
        </Stack>
      ) : (
        <Text>No coins added yet!</Text>
      )}
  
      {addedCoins.length > 0 && (
        <Stack tokens={{ childrenGap: 10 }} styles={{ root: { marginTop: '20px' } }}>
          <Text variant="xxLarge">Grand Total</Text>
  
          <Stack horizontal tokens={{ childrenGap: 10 }} wrap>
            {addedCoins.map((coin) => (
              <Stack key={coin.id} horizontal verticalAlign="center">
                {Array.from({ length: coin.quantity }).map((_, index) => (
                  <img
                    key={index}
                    src={coin.image}
                    alt={coin.name}
                    height={30}
                    width={30}
                    style={{ marginRight: '5px' }}
                  />
                ))}
              </Stack>
            ))}
          </Stack>
  
          <Text variant="large">
            {formatPrice(totalPrice)}
          </Text>
  
=          <Stack horizontalAlign="end" styles={{ root: { marginTop: '20px' } }}>
            <DefaultButton 
              text="Empty Shopping List" 
              onClick={onReset}
            />
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}  

export default ShoppingList;