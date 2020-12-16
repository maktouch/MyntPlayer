import { Layout } from "components/Layout";
import { Player } from "components/Player";
import { Sidebar } from "components/Sidebar";
import { TopBar } from "components/TopBar";
import Head from "next/head";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>MyntPlayer v2</title>
      </Head>
      <TopBar />
      <Player />
      <Sidebar />
    </Layout>
  );
}
