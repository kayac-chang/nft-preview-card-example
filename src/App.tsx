import clsx from "clsx";
import { NFTCard } from "@/components/molecules";
import { Suspense, useEffect, useState, useTransition } from "react";
import { Asset } from "@/models";

function getAssetBy({ tokenID, address }: Pick<Asset, "tokenID" | "address">) {
  return fetch(
    `https://api.opensea.io/api/v1/asset/${address}/${tokenID}/`
  ).then((res) => res.json());
}

type Fn<T> = (value: T) => void;

function tap<T>(fn: Fn<T>) {
  return (value: T) => (fn(value), value);
}

function App() {
  const [asset, setAsset] = useState<Asset>();
  const [, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      getAssetBy({
        address: "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
        tokenID: "8712",
      })
        .then(tap(console.log))
        .then(
          ({
            token_id,
            asset_contract,
            name,
            description,
            image_preview_url,
            creator,
          }) =>
            setAsset({
              name,
              description: description || "",
              tokenID: token_id,
              address: asset_contract.address,
              image: image_preview_url,
              creator: {
                name: creator.user || "anonymous",
                image: creator.profile_img_url,
              },
            })
        );
    });
  }, [startTransition]);

  return (
    <main
      className={clsx(
        "bg-dark-blue-900 text-white",
        "w-screen h-screen p-6",
        "flex flex-col justify-center items-center"
      )}
    >
      <Suspense fallback={"loading"}>
        {asset && <NFTCard {...asset} />}
      </Suspense>
    </main>
  );
}

export default App;
