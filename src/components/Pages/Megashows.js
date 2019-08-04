import React, { Component } from 'react';

class Megashows extends Component {
	constructor(props) {
		super(props);
		this.scrollToOffset.bind(this);
	}

  startAnimation = (sectionID) => {
        let className = "bg__" + sectionID;
        let element = document.getElementsByClassName(className)[0];
        element.style.webkitAnimation = 'none';
        
        let classNameForTypeWriter = "typewriter-" + sectionID;
        let elementTypewriter = document.getElementsByClassName(classNameForTypeWriter)[0].childNodes[0];
        elementTypewriter.style.webkitAnimation = 'none';

        setTimeout(function() {
          element.style.webkitAnimation = '';
          elementTypewriter.style.webkitAnimation = '';
        }, 10);
    }

  scrollToOffset = (finalPos, section, e) => {
  	// console.log(finalPos);
    document.getElementById('page-wrap').scrollTo(0, finalPos.offsetTop);
    this.startAnimation(section);
  }

  changeScrollss = () => { 
    let style = document.body.style.overflow 
    document.body.style.overflow = (style === 'hidden') ? 'auto':'hidden'
} 


	render () {
		return (
      <div id="megashow-main" className="parallax">
      <script> {window.onwheel = function(){ return false; }}	</script>
        <div className="bg__first run-animate" ref={(div) => {this.firstSection = div}}>
        <div className="arrow-up text-center" style={{visibility: 'hidden'}}>
            <a className="scroll-top btn btn-dark" data-id="first-section"><i className="fa fa-angle-up"></i></a>
          </div>
        <div id="first-section">
          <div className="container">
            <div className="templatemo-flexbox">              
              <div className="typewriter-first typewriter">
                <h1>Groov<br />
                Day 1, Main Arena</h1>
              </div>
              <img  className ="image" src={require(`../megashows/images/first-bg.jpg`)} alt="Groovz"/>
              </div>            
            </div>          
          </div>
        
        <div className="arrow text-center">
          <a href="#" onClick = {() => this.scrollToOffset(this.secondSection, 'second')} className="scroll-link btn btn-dark">
          <i className="fa fa-angle-down"></i>
          </a>
        </div>
        </div>

      <div className="bg__second run-animate" ref = {(div) => {this.secondSection = div}}>
        <div className="arrow-up text-center">
          <a href="#" onClick = {() => this.scrollToOffset(this.firstSection, 'first')} className="scroll-link btn btn-dark">
     	     <i className="fa fa-angle-up"></i>
          </a>
         </div>
        <div id="second-section">
          <div className="container">
            <div className="templatemo-flexbox">
              <div className="typewriter-second typewriter">
                <h1>Star Night<br />
                Day 2, main Arena</h1>
              </div>
              <img  className ="image" src={require(`../megashows/images/second-bg.jpg`)} alt="Groovz"/>
            </div>
          </div>
        </div>
        <div className="arrow text-center">
          <a href="#" onClick = {() => this.scrollToOffset(this.thirdSection, 'third')} className="scroll-link btn btn-dark">
          <i className="fa fa-angle-down"></i>
          </a>
        </div>
      </div>

      <div className="bg__third run-animate" ref={(div)=> {this.thirdSection = div}}>
        <div className="arrow-up text-center">
          <a href="#" onClick={() => this.scrollToOffset(this.secondSection, 'second')} className="scroll-link btn btn-dark">
            <i className="fa fa-angle-up"></i>
          </a>
        </div>
        <div id="third-section">
          <div className="container">
            <div className="templatemo-flexbox">              
              <div className="typewriter-third typewriter">
                <h1>DJ Night<br />
                Day 3, Main Arena</h1>
              </div>
              <img  className ="image" src={require(`../megashows/images/third-bg.jpg`)} alt="Groovz"/>
              </div>            
            </div> 
        </div>
        <div className="arrow text-center">
          <a href="#" onClick = {() => this.scrollToOffset(this.fourthSection, 'fourth')} className="scroll-link btn btn-dark">
            <i className="fa fa-angle-down"></i>
          </a>
        </div>
        </div>

      <div className="bg__fourth run-animate" ref={(div) => {this.fourthSection = div}}>
        <div className="arrow-up text-center">
          <a href="#" onClick = {() => this.scrollToOffset(this.thirdSection, 'third')} className="scroll-link btn btn-dark">
            <i className="fa fa-angle-up"></i>
          </a>
        </div>
        <div id="fourth-section">
          <div className="container">
            <div className="templatemo-flexbox">              
              <div className="typewriter-fourth typewriter">
                <h1>Bhangra Theque<br/>
                Day 4, Main Arena</h1>
              </div>
              <img  className ="image" src={require(`../megashows/images/fourth-bg.jpg`)} alt="Groovz"/>
              </div>            
            </div> 
          </div>
          <div className="arrow text-center">
          <a href="#" onClick = {() => this.scrollToOffset(this.fifthSection, 'fifth')} className="scroll-link btn btn-dark">
            <i className="fa fa-angle-down"></i>
          </a>
          </div>
        </div>

      <div className="bg__fifth run-animate" ref = {(div) => {this.fifthSection = div}}>
        <div className="arrow-up text-center">
          <a href="#" onClick = {() => this.scrollToOffset(this.fourthSection, 'fourth')} className="scroll-link btn btn-dark">
            <i className="fa fa-angle-up"></i>
          </a>
        </div>
        <div id="fifth-section">
          <div className="container">
            <div className="templatemo-flexbox">              
              <div className="typewriter-fifth typewriter">
                <h1>Glitterati<br/>
                  Day 5, Main Arena</h1>
              </div>
              <img  className ="image" src={require(`../megashows/images/fifth-bg.jpg`)} alt="Groovz"/>
              </div>            
            </div> 
        </div>
        <div className="arrow text-center" style={{visibility:'hidden'}}>
          <a href="#" onClick = {() => this.scrollToOffset(this.fifthSection, 'fifth')} className="scroll-link btn btn-dark">
            <i className="fa fa-angle-up"></i>
          </a>
        </div>
      </div>

      </div>    
			);
	}
}

export default Megashows;