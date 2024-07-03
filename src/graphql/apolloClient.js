// apolloClient.js
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

// const client = new ApolloClient({
//     uri: 'http://localhost:4000/graphql', // Example URL, replace with your actual GraphQL server URL
//     cache: new InMemoryCache(),
//   });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  // console.log("token from Authlink", token);
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;
