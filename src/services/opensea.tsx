import { Asset } from "@/models";

const API = (url: string) =>
  new URL(url, `https://api.opensea.io/api/v1/`).toString();

function getAssetBy({ tokenID, address }: Pick<Asset, "tokenID" | "address">) {
  return fetch(API(`asset/${address}/${tokenID}/`))
    .then((res) => res.json())
    .then(
      ({
        token_id,
        asset_contract,
        name,
        description,
        image_preview_url,
        creator,
      }) => ({
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
}

export default { getAssetBy };
