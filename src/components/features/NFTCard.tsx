import {
  cloneElement,
  isValidElement,
  PropsWithChildren,
  ReactNode,
} from "react";
import { Style } from "@/components/utils";
import { Asset, Creator } from "@/models";
import { FaEthereum } from "react-icons/fa";
import { IoTimeSharp } from "react-icons/io5";
import clsx from "clsx";

type Props = PropsWithChildren<{}>;
type HasClassName = { className?: string };

const Card = ({ children, className }: Props & HasClassName) => (
  <Style className={clsx("rounded-xl overflow-hidden", className)}>
    {children}
  </Style>
);

const Title = ({ children }: Props) => (
  <strong className="text-white text-xl font-semibold">{children}</strong>
);

type PictureProps = {
  src: string;
  alt: string;
};
const Picture = ({ src, alt }: PictureProps) => (
  <div className="rounded-lg overflow-hidden aspect-square">
    <img className="w-full h-full" src={src} alt={alt} />
  </div>
);

const Description = ({ children }: Props) => (
  <p className="text-soft-blue min-h-[1rem] text-lg font-light leading-7">
    {children}
  </p>
);

type WithIconProps = Props & HasClassName & { icon: ReactNode };
const WithIcon = ({ className, children, icon }: WithIconProps) => (
  <div className={clsx("flex items-center ", className)}>
    {isValidElement(icon) && cloneElement(icon, { size: "100%" })}

    {children}
  </div>
);

const Price = () => (
  <WithIcon className="text-cyan gap-2" icon={<FaEthereum className="w-3" />}>
    <span>0.041 ETH</span>
  </WithIcon>
);

const LatestUpdate = () => (
  <WithIcon
    className="text-soft-blue gap-2"
    icon={<IoTimeSharp className="w-4" />}
  >
    <span>3 days left</span>
  </WithIcon>
);

const Avatar = ({ className, src, alt }: HasClassName & PictureProps) => (
  <div className={clsx("rounded-full overflow-hidden border", className)}>
    <img className="w-full h-full" src={src} alt={alt} />
  </div>
);

const Creator = ({ name, image }: Creator) => (
  <WithIcon
    className="text-soft-blue gap-4"
    icon={
      <Avatar
        className="w-10 aspect-square"
        src={image}
        alt={`${name}'s profile image`}
      />
    }
  >
    <p>
      Creation of <span className="text-white">{name}</span>
    </p>
  </WithIcon>
);

export default function NFTCard({ image, name, description, creator }: Asset) {
  return (
    <Card className="bg-dark-blue-800 p-6">
      <div className="w-full max-w-sm">
        <header>
          <Picture src={image} alt="NFT card picture" />
        </header>

        <div className="mt-6 mb-4 space-y-4">
          <Title>{name}</Title>

          <Description>{description}</Description>

          <div className="flex justify-between">
            <Price />

            <LatestUpdate />
          </div>
        </div>

        <footer
          className={clsx(
            "border-t-2 border-dark-blue-700 pt-4",
            "flex items-center gap-4"
          )}
        >
          <Creator {...creator} />
        </footer>
      </div>
    </Card>
  );
}
