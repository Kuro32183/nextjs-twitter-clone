import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	//自分のURL
    uri: "https://hanauammain.stepzen.net/api/esteemed-maltese/__graphql",
	headers: {
        Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_KEY}`,
    },
    cache: new InMemoryCache(),
});

export default client;