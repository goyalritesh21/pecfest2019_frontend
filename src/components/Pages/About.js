import React, { Component } from 'react';
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask/*##TO DO##, MDBContainer*/ } from
    "mdbreact";
import Sukh from '../../images/sukhwinder.jpg';
import Farhan from '../../images/Farhan.jpg';
import Amit from '../../images/Amit.jpg';
import Pecmap from '../../images/pecmap.jpg';
import islandHula from '../../images/island_hula.gif';

import Fluid from './Fluid';

class About extends Component {
    
    render() {
        
        return (
              
            <div className={"row overlay-2"}>
                <div className={"indicators"} >
                   <Fluid />
                      
                </div>
                <div className={"aboutus"}>
                    {/* <MDBContainer className={"aboutus"}> */}
                    
                    <MDBCarousel
                        activeItem={1}
                        length={2}
                        showControls={true}
                        showIndicators={true}
                        className="z-depth-1"
                        onHoverStop={true}
                    >
                        <MDBCarouselInner>
                            
                            <MDBCarouselItem itemId="1">
                                <MDBView className="d-block w-101">

                                    <MDBMask overlay="black-strong" />
                                </MDBView>
                                <MDBCarouselCaption>
                                    <h2 className={"title"}>STAR NIGHT</h2>
                                    <div className="container">

                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="main-timeline5">
                                                    <div className="timeline">
                                                        <div className="timeline-icon"><span className="year" style={{ backgroundImage: `url(${Sukh})`, backgroundPosition: '50% 30%' }}>2018</span></div>
                                                        <div className="timeline-content">
                                                            <h3 className="title">Sukhwinder Singh</h3>
                                                            {/* <p className="description">
                                    Sukhwinder Singh
                                </p> */}
                                                        </div>
                                                    </div>
                                                    <div className="timeline">
                                                        <div className="timeline-icon"><span className="year" style={{ backgroundImage: `url(${Farhan})`, backgroundPosition: '50% 40%', backgroundSize: '300px 200px' }}>2017</span></div>
                                                        <div className="timeline-content">
                                                            <h3 className="title">Farhan Akhtar</h3>
                                                            {/* <p className="description">
                                   Farhan Akhtar
                                </p> */}
                                                        </div>
                                                    </div>
                                                    <div className="timeline">
                                                        <div className="timeline-icon"><span className="year" style={{ backgroundImage: `url(${Amit})`, backgroundPosition: '40% 40%', backgroundSize: '300px 200px' }}>2016</span></div>
                                                        <div className="timeline-content">
                                                            <h3 className="title">Amit Trivedi</h3>
                                                            {/* <p className="description">
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
                            <MDBCarouselItem itemId="2">
                                <MDBView className="d-block w-100">

                                    <MDBMask overlay="black-light" />
                                </MDBView>
                                <MDBCarouselCaption>
                                    <h2 className={"title"}>STATISTICS</h2>
                                    {/* //   <img src={Pecfest} style={{width:'150px',filter:'brightness(200%)'}}></img> */}
                                    <div className="row" id="ads" >

                                        <div className="col-md-12" >

                                            <div className="card-image">
                                                <span className="card-notify-badge">Because Its Good To Feel</span>
                                                <span className="card-notify-year">2019</span>
                                                <img className="img-fluid" src={`${islandHula}`} alt="Island_Hula" />
                                            </div>
                                            <div className="card-image-overlay m-auto">
                                                <div className="counter">
                                                    <div className="row">
                                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                            <div className="employees">
                                                                <p className="counter-count">879</p>
                                                                <p className="employee-p">Employee</p>
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                            <div className="customer">
                                                                <p className="counter-count">954</p>
                                                                <p className="customer-p">Customer</p>
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                            <div className="design">
                                                                <p className="counter-count">1050</p>
                                                                <p className="design-p">Design</p>
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                            <div className="order">
                                                                <p className="counter-count">652</p>
                                                                <p className="order-p">Orders</p>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    </div>


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