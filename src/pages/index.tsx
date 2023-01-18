import { type NextPage } from "next";
import Head from "next/head";
import LogContainer from "../components/LogContainer";
import { api } from "../utils/api";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const deleteAllMutation = api.logs.deleteLogs.useMutation();

  return (
    <>
      <Head>
        <title>Teacher Monitor Prototype</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="fixed bottom-4 right-4 flex bg-gray-400 p-3">
        <button onClick={() => deleteAllMutation.mutate()}>
          (Delete all logs)
        </button>
      </div>
      <LogContainer />
    </>
  );
};

export default Home;
