import { useQuery, gql } from "@apollo/client";

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

interface Rates {
  currency: string;
  rate: string;
}

interface RatesData {
  rates: Rates[];
}

interface RatesVar {
  currency: string;
}

export const ExchangeRates = () => {
  const { loading, error, data } = useQuery<RatesData, RatesVar>(
    EXCHANGE_RATES
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (!data?.rates) return <div>none</div>;

  return (
    <>
      {data.rates.map(({ currency, rate }) => (
        <div key={currency}>
          <p>
            {currency}: {rate}
          </p>
        </div>
      ))}
    </>
  );
};
