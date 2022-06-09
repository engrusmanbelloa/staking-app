import React, {Component} from "react";
import eNaira from "../eNaira.png";
import "./nav.css";

class Navbar extends Component {
    render(){
        return(
            <div>
            <nav className="navbg navbar navbar-dark fixed-top">
                <a href="index.js" className="navbar-brand col-sm-3 col-md-2 mr-0">
                <img src={eNaira} className="d-inline-block align-top" width="40" height="30" alt="bank"/> eNaira Staking App</a>
            
                <ul className="navbar-nav px-3">
                    <li className="">Account Number: {this.props.account}</li>
                </ul>
            </nav>
            </div>
        );
    }
}

export default Navbar;