import React from 'react';
import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="footer-container mob-12 tab-12 dsk-12">
            <div className="footer-header mob-12 tab-12 dsk-12 mx-auto bgcolor1 sm">
                <a href="https://fr-fr.facebook.com/" target="_blank"><i class="fa fa-facebook"></i></a>
                <a href="https://twitter.com/login" target="_blank"><i className="fa fa-twitter"></i></a>
                <a href="https://www.youtube.com/?hl=fr&gl=FR" target="_blank"><i className="fa fa-youtube"></i></a>
            </div >
            <div className="mention bgcolor1">
                <button type="button" className="mention bgcolor1 color2 bold medium">Mentions légals</button>
            </div>
        </div>
    )
};

export default Footer;