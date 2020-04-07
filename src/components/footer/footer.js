import React, { Component } from 'react'
import i18n from '../../i18n';
import './footer.css';

export default class footer extends Component {
    render() {
        return (
            <div className="container-fluid footer text-center pt-3 mt-4">
                <p>
                	{i18n.t('Copyright')} &copy;2020 {i18n.t('All rights reserved')} | {i18n.t('this website is made with')} 
                	<i className="fas fa-heart"></i> {i18n.t('by')} TaskForce {i18n.t('powered by')} 
                	<a className="text-light font-weight-bold pl-2" target="_blank" href="https://awesomity.rw">Awesomity Lab</a>
                </p>
            </div>
        )
    }
}
