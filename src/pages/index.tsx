import { Layout } from "components/Layout";
import { Player } from "components/Player";
import { Sidebar } from "components/Sidebar";
import { TopBar } from "components/TopBar";

export default function Home() {
  return (
    <Layout>
      <TopBar />
      <Player />
      <Sidebar />
    </Layout>
  );
}
