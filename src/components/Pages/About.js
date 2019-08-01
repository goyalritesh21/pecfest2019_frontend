import React, {Component} from 'react';
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from
            "mdbreact";
import Sukh from '../../images/sukhwinder.jpg';
import Farhan from '../../images/Farhan.jpg';
import Amit from '../../images/Amit.jpg';
import Pecfest from '../../images/pecfest.jpg';
import Pecmap from '../../images/pecmap.jpg';

class About extends Component {
    render() {
        return (
            
            <div className={"row overlay-2"}>
                <div className={"indicators"}style={{backgroundImage: `url(${Pecmap})`,backgroundSize: '100% 100%'}}>
                </div>
                <div className={"aboutus"}>
                {/* <MDBContainer className={"aboutus"}> */}
                  <MDBCarousel
                  activeItem={1}
                  length={3}
                  showControls={true}
                  showIndicators={true}
                  className="z-depth-1"
                >
                  <MDBCarouselInner>
                    <MDBCarouselItem itemId="1">
                      <MDBView className="d-block w-100">
                        
                      <MDBMask overlay="black-light" />
                      </MDBView>
                      <MDBCarouselCaption style={{backgroundImage: `url(${Pecfest})`,height:'589px'}}>
                    {/* //   <img src={Pecfest} style={{width:'150px',filter:'brightness(200%)'}}></img> */}
                        <h2 className={"title1"}>
                            PECFEST 2019
                        </h2>
                         <p style={{fontSize: '20px'}}>The symbol of warm hospitality, unmeasured enthusiasm and vibrant colours of Punjab - PECFest, is known to sweep you off your feet, every single time. An undeniably unforgettable experience, it is the most anticipated event of the year.
                         </p>
                        <h4 className={"date"}>18th - 20th OCTOBER, 2019</h4>
                        {/* <p>First text</p> */}
                      </MDBCarouselCaption>
                    </MDBCarouselItem>
                    <MDBCarouselItem itemId="2">
                      <MDBView className="d-block w-101">
                        
                      <MDBMask overlay="black-strong" />
                      </MDBView>
                      <MDBCarouselCaption>
                        <h2 className={"title"}>STAR NIGHT</h2>
                        <div class="container">
            
            <div class="row">
                <div class="col-md-12">
                    <div class="main-timeline5">
                        <div class="timeline">
                            <div class="timeline-icon"><span class="year" style={{backgroundImage: `url(${Sukh})`,backgroundPosition: '50% 30%'}}>2018</span></div>
                            <div class="timeline-content">
                                <h3 class="title">Sukhwinder Singh</h3>
                                {/* <p class="description">
                                    Sukhwinder Singh
                                </p> */}
                            </div>
                        </div>
                        <div class="timeline">
                            <div class="timeline-icon"><span class="year" style={{backgroundImage: `url(${Farhan})`,backgroundPosition: '50% 40%',backgroundSize: '300px 200px'}}>2017</span></div>
                            <div class="timeline-content">
                                <h3 class="title">Farhan Akhtar</h3>
                                {/* <p class="description">
                                   Farhan Akhtar
                                </p> */}
                            </div>
                        </div>
                        <div class="timeline">
                            <div class="timeline-icon"><span class="year" style={{backgroundImage: `url(${Amit})`,backgroundPosition: '40% 40%',backgroundSize: '300px 200px'}}>2016</span></div>
                            <div class="timeline-content">
                                <h3 class="title">Amit Trivedi</h3>
                                {/* <p class="description">
                                   Amit Trivedi
                                </p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
                        


                      </MDBCarouselCaption>
                    </MDBCarouselItem>
                    <MDBCarouselItem itemId="3">
                      <MDBView className="d-block w-100">
                        
                      <MDBMask overlay="black-light" />
                      </MDBView>
                      <MDBCarouselCaption>
                    {/* //   <img src={Pecfest} style={{width:'150px',filter:'brightness(200%)'}}></img> */}
                        <h2 className={"title"}>
                            STATS
                        </h2>
                         
                        {/* <p>First text</p> */}
                      </MDBCarouselCaption>
                    </MDBCarouselItem>
                    
                  </MDBCarouselInner>
                </MDBCarousel>
                {/* </MDBContainer> */}
                </div>
                </div>
        );
    }
}

export default About;