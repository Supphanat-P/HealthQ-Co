import React, { useState, useEffect, useContext } from "react";
import ItemsCarousel from "react-items-carousel";
import PackageCard from "../etc/PackageCard";
import DataContext from "../../Context/DataContext";

const PackageCarousel = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [numberOfCards, setNumberOfCards] = useState(4);
  const { packages = [] } = useContext(DataContext);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 576) setNumberOfCards(1);
      else if (w < 768) setNumberOfCards(2);
      else if (w < 992) setNumberOfCards(3);
      else setNumberOfCards(4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (activeItemIndex > Math.max(0, packages.length - numberOfCards)) {
      setActiveItemIndex(0);
    }
  }, [packages.length, numberOfCards]);

  const items =
    packages && packages.length > 0
      ? packages.map((pkg, i) => (
          <div
            key={pkg.package_id || i}
            style={{ padding: "0 8px", height: "100%" }}
          >
            <PackageCard packageData={pkg} />
          </div>
        ))
      : Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{ padding: "0 8px", height: "100%" }}>
            <PackageCard />
          </div>
        ));

  return (
    <div style={{ padding: "0 8px" }}>
      <ItemsCarousel
        className="overflow-hidden"
        gutter={16}
        numberOfCards={numberOfCards}
        showSlither={false}
        firstAndLastGutter={true}
        freeScroll={false}
        activeItemIndex={activeItemIndex}
        requestToChangeActive={setActiveItemIndex}
        rightChevron={
          <button
            className="btn bg-navy d-flex align-items-center justify-content-center"
            style={{ width: 40, height: 40, padding: 0, borderRadius: "50%" }}
            aria-label="Next packages"
          >
            <i className="bi bi-chevron-right text-white fw-bold" />
          </button>
        }
        leftChevron={
          <button
            className="btn bg-navy d-flex align-items-center justify-content-center"
            style={{ width: 40, height: 40, padding: 0, borderRadius: "50%" }}
            aria-label="Previous packages"
          >
            <i className="bi bi-chevron-left text-white fw-bold" />
          </button>
        }
        chevronWidth={40}
        outsideChevron
      >
        {items}
      </ItemsCarousel>
    </div>
  );
};

export default PackageCarousel;
