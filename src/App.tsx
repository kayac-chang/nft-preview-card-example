import clsx from "clsx";
import { lazy, Suspense, useEffect, useState, useTransition } from "react";
import { Asset } from "@/models";
import API from "@/services";

const NFTCard = lazy(() => import("@/components/features/NFTCard"));

function useAsset({ address, tokenID }: Pick<Asset, "address" | "tokenID">) {
  const [asset, setAsset] = useState<Asset>();
  const [, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      API.OpenSea.getAssetBy({ address, tokenID }).then(setAsset);
    });
  }, [startTransition, address, tokenID]);

  return { data: asset };
}

function App() {
  const { data } = useAsset({
    address: "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
    tokenID: "8712",
  });

  return (
    <main
      className={clsx(
        "bg-dark-blue-900 text-white",
        "w-screen h-screen p-6",
        "flex flex-col justify-center items-center"
      )}
    >
      <Suspense fallback={"loading"}>{data && <NFTCard {...data} />}</Suspense>
    </main>
  );
}

export default App;
