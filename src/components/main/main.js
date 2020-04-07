import React, { Component } from 'react';
import i18n from '../../i18n';
import TotalNumber from '../total_numbers/total_number';
import './main.css';
import { Link } from 'react-router-dom';

class main extends Component {
    render() {
        return (
            <div>
                <div className ="mainBackground container-fluid"> 
                    <div id="welcome-text-bg">
                        <div className="container main-content-pasition" >
                            <TotalNumber/>
                            <div className="pt-5 w-100 text-center">
                            <Link className="btn btn-danger btn-sm main-button px-5 py-2 mt-0 mt-lg-4 mt-md-4" to="/all-cases/1">
                                {i18n.t('Discover more')} <i className="fas fa-angle-double-right"></i>
                            </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default main;
