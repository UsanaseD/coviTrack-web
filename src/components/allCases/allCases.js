import React, { Component } from 'react';
import i18n from '../../i18n';
import { fetchPage, searchCountry, loadingPage } from '../../redux/actions/countryActions';
import { connect } from 'react-redux';
import SearchBox from '../searchBox/searchBox';
import Card from '../cardInfo/country_info';
import Navigation from '../navigation/Nav';
import Footer from '../footer/footer';
import { Pagination, Spinner } from 'react-bootstrap';

//CSS
import './allCases.css'; 

// AllCases Component
class AllCases extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      loading: false
    }
  }

  componentWillMount() {

    let { page } = this.props.match.params;
    
    page = parseInt(page);
    if((!page || page < 0)) this.props.history.push('/all-cases/1');
    
    this.props.fetchPage(page);

    this.setState({ currentPage: page });
  }

  componentDidUpdate() {
    const { countries } = this.props;
    const { page } = this.props.match.params;
    if(page > countries.pages)
      this.props.history.push('/all-cases/1');
  }

  alterPage(page) {
    this.props.history.push(`/all-cases/${page}`);
    this.setState({ currentPage: page });
    this.props.fetchPage(page);
  }

  render() {
    let changeLoad = this.props.loading;
		if(this.props.searched !== undefined){
			changeLoad = false
		}
    return (
        <div> 
          <Navigation/>
          <div className ="mainContainer"> 
            <div className="container main-content-position" >
              {/* Search input */}
              <SearchBox countries={this.props.countries}/>
            </div>
          </div>
          <div className="container">
            <div className="container-card">
                { (!this.props.countries?.paginated|| changeLoad === true)? 
					 <>
					 <div className="text-right mt-5">
					   <Spinner animation="grow" size="sm" variant="danger"/>
             <Spinner animation="grow" size="sm" variant="danger"/>
             <Spinner animation="grow" size="sm" variant="danger"/>
					 </div>
				  </>
					 : ((this.props.searched)?  this.props.searched.map((country, index) => (
						<div key={index}><Card country={country} /></div>
					))
					 :                
                this.props.countries?.paginated?.map((country, index) => (
                  <div key={index}><Card country={country} /></div>
                    ))
              )
               }    
            </div>
            <div className="container">
              <Pagination className="mx-auto mt-4">
                <Pagination.Item disabled={this.state.currentPage === 1} onClick={this.alterPage.bind(this, this.state.currentPage - 1)}>
                  <i className="fas fa-angle-double-left"></i> {i18n.t('Previous')}
                </Pagination.Item>
                <Pagination.Item disabled={this.state.currentPage === this.props.countries?.pages} onClick={this.alterPage.bind(this, this.state.currentPage + 1)}>
                  {i18n.t('Next')} <i className="fas fa-angle-double-right"></i> 
                </Pagination.Item>
              </Pagination>
            </div>
          </div>
          <Footer/>
       </div>
    );
  }
}

const mapStateToProps = ({ countryReducer }) => {
	const { countries, searched, loading} = countryReducer;
	return { countries,  searched, loading };
}

export default connect(mapStateToProps, { fetchPage, searchCountry, loadingPage  })(AllCases);
