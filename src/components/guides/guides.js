import React, { Component } from 'react';
import i18n from '../../i18n';
import Navigation from '../navigation/Nav';
import data from '../../assets/guides/data';
import './guides.css';
import Footer from '../footer/footer'

export default class guides extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
        }
    }
    componentWillMount() {
        let current = [];
        Object.values(data).forEach((value) => {
            current.push(value)
        });
        this.setState({ notes: current })
    }
    render() {
        
        return (
            <div>
                <Navigation />
                <div className="container-fluid guides">
                    {
                        this.state.notes.map((note) => {
                            return (
                                <div className="container guides-container mb-4">
                                    <div className="guides-text pt-3"><img src={note.picture} alt="prevention pic"/></div>
                                    <div className="guides-text pt-3 pl-0 pl-lg-4 pl-md-4"><p>{i18n.t(`${note.text}`)}</p></div>
                                </div>
                            )
                        })
                    }
                </div>
                <Footer/>
            </div>
        )
    }
}
