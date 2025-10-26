import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import Map2 from "@/components/shared/map/Map2";

const LocationsMain = () => {
  return (
    <main>
      <HeroPrimary
        title={"Google Map Locations"}
        text="Locations"
        mb={"mb-0"}
      />
      <Map2 />
      {/* <LocationsPrimary /> */}
    </main>
  );
};

export default LocationsMain;
