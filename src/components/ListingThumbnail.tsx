import image1 from "../imports/image10.webp";
import image2 from "../imports/image12.webp";
import image3 from "../imports/image11.webp";
import image4 from "../imports/image13.webp";
import image5 from "../imports/image7.webp";
import image6 from "../imports/image9.webp";

const listingImages = [image1, image2, image3, image4, image5, image6];

type ListingThumbnailProps = {
  index: number;
};

export default function ListingThumbnail({ index }: ListingThumbnailProps) {
  const image = listingImages[index % listingImages.length];

  return (
    <div className="w-full aspect-[4/3] overflow-hidden">
      <img src={image} alt={`Property listing ${index + 1}`} className="h-full w-full object-cover" />
    </div>
  );
}
