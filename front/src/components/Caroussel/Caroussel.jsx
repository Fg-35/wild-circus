
import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './caroussel.css';


class Caroussel extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="shadow radius main-content menu bgcolor2">
            <Carousel className="slide-container dsk-12">
                <div className="great">
                    <img src="./chapito.jpeg" alt=""/>
                    <p className="legend">Our tent on a summer evening</p>
                </div>
                <div>
                    <img src="./clowns.jpeg" alt="" />
                    <p className="legend">Humorous shows</p>
                </div>
                <div>
                    <img src="./dresseur.jpeg" alt=""/>
                    <p className="legend">Shows with wild animals</p>
                </div>
            </Carousel>
            </div>
        )
    }
}

export default Caroussel;