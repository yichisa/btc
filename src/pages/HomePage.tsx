import React from 'react';
import { Stack, Text, Spinner, MessageBar, MessageBarType } from '@fluentui/react';
import CoinList from '../components/CoinList';
import ShoppingList from '../components/ShoppingList';
import useCoins from '../hooks/useCoins';

const HomePage: React.FC = () => {
  const { coins, addCoin, removeCoin, incrementQuantity, decrementQuantity, loading, error } = useCoins();

  return (
    <Stack tokens={{ childrenGap: 20, padding: 20 }}>
      <Text variant="xxLarge" block>
        Crypto Coin Shop
      </Text>
      {loading && <Spinner label="Loading coins..." />}
      {error && (
        <MessageBar messageBarType={MessageBarType.error}>
          {error}
        </MessageBar>
      )}
      {!loading && !error && (
        <>
          <ShoppingList
            coins={coins}
            onRemove={removeCoin}
            onIncrement={incrementQuantity}
            onDecrement={decrementQuantity}
        />
          <CoinList coins={coins} onAdd={addCoin} />
        </>
      )}
    </Stack>
  );
};

export default HomePage;
