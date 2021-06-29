import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache({
    typePolicies: {
      Pokemons: {
        fields: {
          results: {
            merge: (
              existing: unknown[] | undefined = [],
              incoming: unknown[]
            ) => {
              console.log("existing", existing);
              console.log("incoming", incoming);
              const merged = [...existing, ...incoming];
              return merged;
            },
          },
        },
      },
      Query: {
        fields: {
          getPokemons: {
            keyArgs: ["limit"],
          },
        },
      },
    },
  }),
  // TODO Turn this off in prod
  connectToDevTools: true,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
