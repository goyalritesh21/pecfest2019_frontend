import React, { Component } from "react";
import img1 from "../../../assets/images/Aboutus/2.jpg";
import img2 from "../../../assets/images/Aboutus/1.jpg";

class About extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={"aboutUsLayout"}>
        <div>
          <h1 className={"headTitle"}>About Us</h1>
          <main className="tm-container masonry">
            <div
              className={"item tm-block tm-block-left"}
              data-desktop-seq-no="1"
              data-mobile-seq-no="1"
            >
              <header className={"tm-block-brand"}>
                <div
                  className={
                    "tm-bg-primary-dark tm-text-white tm-block-brand-inner"
                  }
                >
                  <p>
                    <h1 className={"tm-brand-name"}>PECFEST 19</h1>
                  </p>

                  <p>
                    <h3>The largest fest in North India</h3>
                  </p>
                </div>
              </header>
            </div>
            <div
              className={"item"}
              data-desktop-seq-no="2"
              data-mobile-seq-no="4"
            >
              <img
                className={"imgAbout tm-img-left"}
                src={img2}
                alt={"Image"}
              />
            </div>
            <div
              className={"item"}
              data-desktop-seq-no="6"
              data-mobile-seq-no="2"
            >
              <img className={"imgAbout"} src={img1} alt="Image" />
            </div>
            <div
              className={"item tm-block-right"}
              data-desktop-seq-no="7"
              data-mobile-seq-no="3"
            >
              <div
                className={
                  "tm-block-right-inner tm-bg-primary-light tm-text-white tm-block tm-block-wider tm-block-pad"
                }
              >
                <h4>
                  This is what drives us into our 49th edition this year!
                  Embrace yourself for another cultural extravaganza: join us
                  this year from 8th November - 10th November at Pecfest!
                </h4>
              </div>
            </div>

            <div
              className={"item tm-bg-white tm-block tm-form-section"}
              data-desktop-seq-no="9"
              data-mobile-seq-no="7"
            ></div>
          </main>
        </div>
      </div>
    );
  }
}
About.propTypes = {};

export default About;
