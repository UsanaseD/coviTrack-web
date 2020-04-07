import { connect } from 'react-redux';
import i18n from '../../i18n';
import React, { Component } from 'react';
import { fetchFollowedCountries } from '../../redux/actions/countryActions';
import CardInfo from '../cardInfo/country_info';
import Navigation from '../navigation/Nav';
import Footer from '../footer/footer';
import '../allCases/allCases.css'; 
import './followed.css';

class FollowedCountries extends Component {

	componentWillMount() {
		this.props.fetchFollowedCountries();
	}
	render() {
		const countFollowed = this.props?.followedCountries?.length;
		return (
	        <div> 
	            <Navigation/>
		        <div className="mainContainer followed">
			        <div className="text-center font-weight-bold text-white">
			          	{i18n.t('You are following')} { countFollowed } { countFollowed > 1 ? `${i18n.t('countries')}` : `${i18n.t('country')}` }
			        </div>
			    </div>
			    <div className="container container-card">
				    { this.props?.followedCountries?.map(country => (
						<div key={country.country}><CardInfo country={country} /></div>
					)) }  
			    </div>
	            <Footer/>
	        </div>
	    );
	}
}

const mapStateToProps = ({ countryReducer }) => {
	const { followedCountries } = countryReducer;

	return { followedCountries };
};

export default connect(mapStateToProps, { fetchFollowedCountries })(FollowedCountries);
