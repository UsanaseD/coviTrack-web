import React, { Component } from 'react';
import i18n from '../../i18n';
import { fetchCountryCases, searchCountry, loadingPage } from '../../redux/actions/countryActions';
import { connect } from 'react-redux';
import Navigation from '../navigation/Nav';
import Main from '../main/main';
import Trending from '../trending_case/trending';
import Card from '../cardInfo/country_info';
import Footer from '../footer/footer';
import Spinner from 'react-bootstrap/Spinner'
import './index.css';

class LandingPage extends Component {
	constructor(props){
		super(props);
		this.state ={
			loading: false
		}
	}

	componentWillMount() {
		this.props.fetchCountryCases();
	}

	render() {  
		let changeLoad = this.props.loading;
		if(this.props.searched !== undefined){
			changeLoad = false
		}
		return (
			<div className ="bg-white"> 
				<Navigation active ="home"/>
                <Main/>
				<Trending/>
				<div className="container container-card">
					{(!this.props.recents|| changeLoad === true)? 
					<>
					 <div className="text-center loader">
					    <Spinner animation="grow" size="sm" variant="danger"/>
			            <Spinner animation="grow" size="sm" variant="danger"/>
			            <Spinner animation="grow" size="sm" variant="danger"/>
					 </div>
				  	</>
					 : ((this.props.searched)?  this.props.searched.map((country, index) => (
						<div key={index}><Card country={country} /></div>
						))
					 : this.props.recents && this.props.recents.map((country, index) => (
							<div key={index}><Card country={country} /></div>
						))
					)
				}   
				</div>
				<div className="w-100 text-center">
					<button type="button" className="btn btn-danger btn-sm px-4 py-2 mt-4 main-button mx-auto" onClick={() => this.props.history.push(`/all-cases/${2}`)}>
						{i18n.t('View more')} <i className="fas fa-angle-double-right"></i>
					</button>
				</div>
				<Footer/>
			</div>
		)
	}
}

const mapStateToProps = ({ countryReducer }) => {
	const { countries, recents,  searched, loading } = countryReducer;
	return { countries, recents,  searched, loading  };
}

export default connect(mapStateToProps, { fetchCountryCases,  searchCountry, loadingPage })(LandingPage)
