import React from "react";
import AwesomeSlider from "react-awesome-slider";
import Product from "./Product";

import "../Styles/Home.css";
import "react-awesome-slider/dist/styles.css";

const Home = () => {
  return (
    <div className="home">
      <div className="home__container">
        <AwesomeSlider
          bullets={false}
          className="home__image"
          transitionDelay={450}
          startup={true}
        >
          <div data-src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/BAU_Hero_Xbiz2022/BrowniePC2xBlutoothvoice._CB632422863_.jpg" />
          <div data-src="https://images-eu.ssl-images-amazon.com/images/G/31/prime/Pay/CBCC/Mar22/June22/CBCC_CARDED_3000x1200._CB636201961_.jpg" />
          <div data-src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/Samsung/SamsungM/M13/Inspire/GW/Battery/D50328974_IN_WLME_SamsungGalaxy_M13_series_Tall_Hero_3000x1200._CB630343738_.jpg" />
        </AwesomeSlider>
        <div className="home__row">
          <Product
            id={132546}
            title="The Lean Startup: How Constant Innovation Creates Radically Successful
          Businesses"
            rating={5}
            price={526.0}
            image="https://images-na.ssl-images-amazon.com/images/I/51CTIr1bJxL._SX325_BO1,204,203,200_.jpg"
          />
          <Product
            id={178954}
            title="Redgear Pro Series Wired Gamepad with Integrated Force Feedback, Illuminated ABXY Keys, Ergonomically Design, 1.8m USB Cable for PC"
            rating={4}
            price={949.0}
            image="https://m.media-amazon.com/images/I/51300qVfYmL._SX679_.jpg"
          />
        </div>
        <div className="home__row">
          <Product
            id={165732}
            title="2020 Apple Mac Mini (Apple M1 chip with 8‑core CPU and 8‑core GPU, 8GB RAM, 512GB SSD) -Silver"
            rating={4}
            image="https://m.media-amazon.com/images/I/71pcTYT+ICL._SX679_.jpg"
            price={76990.0}
          />
          <Product
            id={354795}
            title="Mivi Roam 2 Bluetooth 5W Portable Speaker,24 Hours Playtime,Powerful Bass, Wireless Stereo Speaker with Studio Quality Sound,Waterproof, Bluetooth 5.0 and in-Built Mic with Voice Assistance-Black"
            image="https://m.media-amazon.com/images/I/81QP3C+rTbL._SX679_.jpg"
            rating={3}
            price={799.0}
          />
          <Product
            id={325687}
            title="Prestige IRIS Plus 750 watt mixer grinder"
            image="https://m.media-amazon.com/images/I/51HfqyUaHyL._SX679_.jpg"
            rating={4}
            price={3249.0}
          />
        </div>
        <div className="home__row">
          <Product
            id={463269}
            title='ASUS ROG Zephyrus Duo 16, 16" (40.64 cm) UHD+/FHD+ 16:10 120Hz/240Hz/3ms, AMD Ryzen 9 6900HX, 16GB RTX 3080 Ti, Dual-Screen Gaming Laptop (32GB/2TB SSD/Win 11/Office/Black/2.55 Kg), GX650RXZ-LB226WS'
            price={396990.0}
            image="https://m.media-amazon.com/images/I/71JFMDI0tOL._SX679_.jpg"
            rating={4}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
