import React from "react";
import "./Slider.css";
import WhatsNew from "../../ProductSection/CategorySection/SubCateogry/WhatsNew";

const Sliderr = () => {
  
  const whatsNewslist = [
    {
      id: 1,
      imageUrl:
        "https://pk.sapphireonline.pk/cdn/shop/files/Daily-Unstitched-Intermix.jpg?v=1723717371&width=200",
      CategoryNamefirst: "Daily",
      CategoryNameScnd: "Unstitched Intermix",
    },
    {
      id: 2,
      imageUrl:
        "https://pk.sapphireonline.pk/cdn/shop/files/Tie-_-Dye-Ready-to-Wear-Intermix.jpg?v=1723717413&width=200",
      CategoryNamefirst: "TIE & DYE",
      CategoryNameScnd: "RTW Intermix",
    },

    {
      id: 3,
      imageUrl:
        "https://pk.sapphireonline.pk/cdn/shop/files/Kids-New-Arrivals.jpg?v=1723717506&width=200",
      CategoryNamefirst: "KIDS",
      CategoryNameScnd: "NEW Arrivals",
    },
    {
      id: 4,
      imageUrl:
        "https://pk.sapphireonline.pk/cdn/shop/files/whats-new-_-west-new-arrivals.jpg?v=1724304199&width=200",
      CategoryNamefirst: "WEST",
      CategoryNameScnd: "New Arrivals",
    },
    {
      id: 5,
      imageUrl:
        "https://pk.sapphireonline.pk/cdn/shop/files/Ready-to-Wear-Summer-_24.jpg?v=1723717815&width=200",
      CategoryNamefirst: "Ready To Wear",
      CategoryNameScnd: "Summer '24 ",
    },
    {
      id: 6,
      imageUrl:
        "https://pk.sapphireonline.pk/cdn/shop/files/mens-outfits.jpg?v=1723718485&width=200",
      CategoryNamefirst: "Men's Outfits",
      CategoryNameScnd: "Intermix",
    },
    {
      id: 7,
      imageUrl:
        "https://pk.sapphireonline.pk/cdn/shop/files/fragrance-what_s-new.jpg?v=1719828912&width=200",
      CategoryNamefirst: "Fragrances",
    },
  ];
  return (
    <>
      <div className="slider">
        <div className="slides">
          <div className="slide">
            <a href="#">
              <img src="https://pk.sapphireonline.pk/cdn/shop/files/Slider_Banner_d2bdc370-ce3b-4f45-a42e-fcfd64592178.jpg?v=1723202255&width=2000" />
            </a>
          </div>

          <div className="slide">
            <a href="#">
              <img src="https://pk.sapphireonline.pk/cdn/shop/files/intermix-banner-without-text.jpg?v=1723113801&width=2000" />
            </a>
          </div>

          <div className="slide">
            <a href="#">
              <img src="https://pk.sapphireonline.pk/cdn/shop/files/D2D-V-slider-banner.jpg?v=1723113801&width=2000" />
            </a>
          </div>
          <div className="slide">
            <a href="#">
              <img src="https://pk.sapphireonline.pk/cdn/shop/files/kids-slider-banner_27fcf88e-52be-4380-91ae-12f782e21cee.jpg?v=1723113801&width=2000" />
            </a>
          </div>
        </div>
        <div class="dots">
          <span class="dot active"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>

      <WhatsNew Data={whatsNewslist} firstText="WHAT'S" scndText="NEW" />
    </>
  );
};

export default Sliderr;
