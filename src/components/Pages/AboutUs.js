import React, { Component } from "react";
import img1 from './../../assets/images/Events/1.jpg';
class About extends Component {
  render() {
    return (
      <div className={"aboutUsLayout"}>
        <div>
        <h1 className={"headTitle"}>About Us</h1>
    <main className="tm-container masonry">
        <div className={"item tm-bg-white tm-block tm-block-left"} data-desktop-seq-no="1" data-mobile-seq-no="1">
            <p className={"tm-hero-text"}>&ldquo;className aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                himenaeos. Maecenas vel lacinia ipsum, nec fermentum diam. Nulla nec gravida odio, eget vestibulum urna.&rdquo;</p>
            <header classNameName={"tm-block-brand"}>
                <div className={"tm-bg-primary-dark tm-text-white tm-block-brand-inner"}>
                    
                    <h1 className={"tm-brand-name"}>PECFEST 19</h1>
                </div>
            </header>
        </div>
        <div className={"item"} data-desktop-seq-no="2" data-mobile-seq-no="4">
            <img src={img1} alt="Image" className="tm-img-left" />
        </div>
        <div className={"item tm-bg-secondary tm-text-white tm-block tm-block-wider tm-block-pad tm-block-left-2"} data-desktop-seq-no="3"
            data-mobile-seq-no="5">
            
            <p>You can freely use this Character HTML Template for your site.You can freely use this Character HTML Template for your site.You can freely use this Character HTML Template for your site.</p>
            
        </div>
        <div className={"item"} data-desktop-seq-no="4" data-mobile-seq-no="8">
            <img src={img1} alt="Image" className="tm-img-left" />
        </div>
       
        <div className={"item"} data-desktop-seq-no="6" data-mobile-seq-no="2">
            <img src={img1} alt="Image" />
        </div>
        <div className={"item tm-block-right"} data-desktop-seq-no="7" data-mobile-seq-no="3">
            <div className={"tm-block-right-inner tm-bg-primary-light tm-text-white tm-block tm-block-wider tm-block-pad"}>
                <header>
                    <h2 className={"tm-text-uppercase"}>
                        PECFEST 19
                    </h2>
                </header>
                <p>You can freely use this Character HTML Template for your site.  on Facebook page for updates. Don't forget to tell your friends about Tooplate. Thank you. :)</p>
                <p className={"tm-mt tm-mb-small"}>
                You can freely use this Character HTML Template for your site.S
                </p>
                
            </div>
        </div>

        <div className={"item"} data-desktop-seq-no="8" data-mobile-seq-no="6">
            <img src={img1} alt="Image" />
        </div>

        <div className={"item tm-bg-white tm-block tm-form-section"} data-desktop-seq-no="9" data-mobile-seq-no="7">
            <div className={"tm-form-container tm-block-pad tm-pb-0"}>
                <header>
                    <h2 className={"tm-text-uppercase tm-text-gray-light tm-mb"}>
                        Contact Us
                    </h2>
                </header>
                
            
            </div>

            
        </div>

    </main>
    
   
</div>  
        
      </div>
    );
  }
}

export default About;
