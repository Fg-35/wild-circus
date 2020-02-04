import React, { Component } from 'react';
import './presentation.css';


class Presentation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choice: false
        };
    }
    onClickHandler = () => {
        this.setState({ choice: true })
    };

    render() {
        return (
            <div className="shadow radius main-content menu bgcolor2">
                <div className="container-btn mob-12 tab-12 dsk-12">
                    <div className="tog">
                        <button type="button" className="btn btn-danger button"><a className="link big color2 bold" href="/performance">Performance</a></button>
                        <img className="imgpre" src="./chapeau.jpeg" alt=""/>
                    </div>
                    <div className="tog">
                        <button type="button" className="btn btn-primary button"><a className="link big color2 bold" href="#">About Us</a></button>
                        <img className="imgpre" src="./danseuses.jpeg" alt=""/>
                    </div>

                </div>
                <div className="container-btn mob-12 tab-12 dsk-12">
                    <div className="tog">
                        <button type="button" className="btn btn-success button"><a className="link big color2 bold" href="#">Prices</a></button>
                        <img className="imgpre" src="./manchot.jpeg" alt=""/>
                    </div>
                    <div className="tog">
                        <button type="button" className="btn btn-warning button"><a className="link big color2 bold" href="#">Contact Us</a></button>
                        <img className="imgpre" src="./chapito2.jpeg" alt=""/>
                    </div>

                </div>
            </div>
        )
    }


}
export default Presentation;