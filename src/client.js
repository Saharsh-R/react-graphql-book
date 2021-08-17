import { ApolloClient , InMemoryCache} from '@apollo/client';
// import { HttpLink } from 'apollo-link-http'

const cache = new InMemoryCache()
// const link = new HttpLink({
//   uri: 'http://localhost:4000/'
// })

const client = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/',
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
})

export default client