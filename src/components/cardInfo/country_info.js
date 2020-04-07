import React, { Component } from 'react'
import i18n from '../../i18n';
import './country_info.css';
import flag from '../../assets/flag.png';
import helper from '../../helpers/main';
import { 
    fetchCountryHistory, 
    followCountry, 
    fetchFollowedCountries, 
    unfollowCountry
} from '../../redux/actions/countryActions';
import { connect } from 'react-redux';
import Chart from '../graph/graph';

class country_info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addModelShow: false,
        };
        this.getGraph = this.getGraph.bind(this);
    }
    getGraph(countryName){
            this.props.fetchCountryHistory(countryName);
            this.setState({ addModelShow: true })
    }

    componentWillMount() {
        this.props.fetchFollowedCountries();
    }

    handleFollow(country, e) {
        e.preventDefault();

        if(! helper._isFollowed(country.country))
            this.props.followCountry(country);
        else
            this.props.unfollowCountry(country.country);
    }

    render() {
        const { country, followedCountries } = this.props;
        
        let addModelClose = () => this.setState({ addModelShow: false });
        return (
            <div className="card-contant mb-3 px-2">
                <div className="container-card-content p-4 mt-3">
                    <div >
                        <p>{i18n.t('Total cases')}</p>
                        <p>{i18n.t('New cases')}</p>
                        <p>{i18n.t('Today deaths')}</p>
                        <p>{i18n.t('Total recovered')}</p>
                        <p>{i18n.t('Total deaths')}</p>
                    </div>
                    <div>
                        <p>{helper._fn(country?.active)}</p>
                        <p className="font-weight-bold">{helper._fn(country.todayCases)}</p>
                        <p className="text-danger">{helper._fn(country?.todayDeaths)}</p>
                        <p className="text-success">{helper._fn(country?.recovered)}</p>
                        <p className="text-danger">{helper._fn(country?.deaths)}</p>
                    </div>
                    <div>
                        <div className="w-100 text-right px-5">
                            <img src={country?.countryInfo.flag || flag} alt="flag imag" className="country-flag mb-3" />
                            <strong>{country?.country}</strong>
                        </div>
                    </div>
                </div>
                <div className="line"></div>
                <div className="container-icon">
                    <div className="text-right py-2 px-4">
                        <a href="#" className="custom-link mr-3" onClick={this.getGraph.bind(this, country?.country)}>
                            <i className="fas fa-eye"></i> {i18n.t('Graph')}
                        </a>
                        
                        { 
                            (followedCountries?.find(fcountry => fcountry.country === country.country))
                                ? <a className="custom-link" href="#" onClick={this.handleFollow.bind(this, country)} key="followHandler">
                                    <i className="fas fa-thumbs-down"></i> {i18n.t("unfollow")}
                                </a>
                                : <a className="custom-link" href="#" onClick={this.handleFollow.bind(this, country)} key="unfollowHandler">
                                    <i className="fas fa-thumbs-up"></i> {i18n.t("follow")}
                                </a>
                        }
                    </div> 
                    <Chart
                        show={this.state.addModelShow}
                        onHide={addModelClose}
                        history={this.props.historical?.timeline}
                        countryName = {this.props.historical?.country}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ countryReducer }) => {
    const { historical, followedCountries } = countryReducer;
	return { historical, followedCountries };
}

export default connect(mapStateToProps, { fetchCountryHistory, followCountry, fetchFollowedCountries, unfollowCountry })(country_info)