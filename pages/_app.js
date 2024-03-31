import { AuthProvider } from '../AuthContext';

import { ApolloProvider } from '@apollo/client';

 import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

//const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' }); // Replace with your backend GraphQL endpoint

const httpLink = new HttpLink({ uri: 'http://localhost:3001/api/graphql' });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
    <AuthProvider  >
      <Component {...pageProps} />
    </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
