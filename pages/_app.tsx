import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Session } from 'next-auth'
import Sidebar from "../components/Sidebar";
import client from "../apollo-client";
import { Toaster } from "react-hot-toast";
import { ApolloProvider } from "@apollo/client";
import Widget from "../components/Widget";


function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={pageProps.session}>
      <div className="mx-auto max-h-screen lg:max-w-6xl">
      <Toaster />
        <main className="grid grid-cols-9">
          <Sidebar />
        <Component {...pageProps} />
        <Widget />
        </main>
      </div>
    </SessionProvider>
    </ApolloProvider>
    
  );
}

export default MyApp;
