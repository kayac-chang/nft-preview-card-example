import clsx from "clsx";
import { NFTCard } from "@/components/molecules";

function App() {
  return (
    <main
      className={clsx(
        "bg-dark-blue-900",
        "w-screen h-screen p-6",
        "flex flex-col justify-center items-center"
      )}
    >
      <NFTCard />
    </main>
  );
}

export default App;
