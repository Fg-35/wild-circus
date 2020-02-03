import React from "react";

import "./welcome.css";

class Welcome extends React.Component {
    render() {
        return (
            <div className="container-welcome">
                <div className="shadow radius main-content menu bgcolor2">
                    <h2 className="biggest">Welcome!</h2>

                    <p className="large lineh1 bold">
                        In the largest circus in the world of the WildCodeSchool, 
                        you will discover, young and old, a space filled with wonders, 
                        where all our greatest acrobats, actor artists and animals 
                        will amaze you and fill your eyes with joy and happiness. 
                        Do not hesitate, come and meet us, to enjoy the most magical 
                        moments of your life !!!
                    </p>
                </div>
            </div>

        );
    }
}

export default Welcome;