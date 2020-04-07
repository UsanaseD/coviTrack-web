import React, { Component } from 'react';
import i18n from '../../i18n';
import { searchCountry, loadingPage } from '../../redux/actions/countryActions';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import './trending.css';

class trending extends Component {
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state ={
            query: '',
            loading: false,
        }
    }
    onChange(e){
        const query = e.target.value;
         this.setState({ query, loading: true});
    }
    onSubmit(e){
        e.preventDefault();  
        this.props.searchCountry(this.state.query);   
        this.props.loadingPage(this.state.loading);
        }
    render() {
        const { query } = this.state;
        return (  
            <div className="container-fluid">
                <div className="tranding-container row" >
                    <div className="trending-left col-6">
                        <h5> <FontAwesomeIcon icon={faAngleRight}/> {i18n.t('Recent cases')}</h5>
                    </div>
                    <div className="trending-right col-6 w-100">
                        <form className="main-search" onSubmit={this.onSubmit}>  
                            <input type="text"
                             value={query}
                             placeholder={i18n.t('Search country')}
                             name="searchText"
                             onChange ={this.onChange}
                             />
                            <button type="submit"><FontAwesomeIcon icon={faSearch}/></button>  
                        </form>
                    </div>
                </div>                
            </div>
        )
    }
}

const mapStateToProps = ({ countryReducer }) => {
	const { searched, loading } = countryReducer;
	return { searched, loading };
}

export default connect(mapStateToProps, { searchCountry, loadingPage })(trending);