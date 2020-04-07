import React, { Component } from 'react'
import i18n from '../../i18n';
import './total_number.css';
import { fetchWorldTotalCases } from '../../redux/actions/countryActions';
import { connect } from 'react-redux';
import helper from '../../helpers/main';

class totalNumber extends Component {

    componentDidMount() {
        this.props.fetchWorldTotalCases();
    }
    render() {
        const { total } = this.props;
        return (
            <div className="row mt-4 main-massege" id="main-message-bg">
                <div className="py-3 py-md-4 py-lg-4 col-12 col-md-6 col-lg-4 text-center" >
                    <h1>{ helper._fn(total?.data.cases) }</h1>
                    { total?.data.country ? <p>{i18n.t('Confirmed cases in ')} {total?.data.country}</p> 
                    : (total?.data.cases ? <p>{i18n.t('Confirmed cases all over the world')}</p>
                         : <p>{i18n.t('Confirmed cases in ')}.....</p>) } 
                </div>
                <div className="py-3 py-md-4 py-lg-4 col-12 col-md-6 col-lg-4 text-center" >
                    <h1>{ helper._fn(total?.data.recovered) }</h1>
                    { total?.data.country ? <p>{i18n.t('Recovered cases in ')} {total?.data.country}</p> 
                    : (total?.data.cases ?  <p>{i18n.t('Recovered  cases all over the world')}</p> 
                                             :  <p>{i18n.t('Recovered cases in ')}.....</p>) }
                </div>
                <div className="py-3 py-md-4 py-lg-4 col-12 col-md-12 text-center col-lg-4" >
                    <h1>{ helper._fn(total?.data.deaths) }</h1>
                    { total?.data.country ? <p>{i18n.t('Total deaths in ')} {total?.data.country}</p> 
                    : (total?.data.cases ? <p>{i18n.t('Total deaths  all over the world')}</p>
                                        :  <p>{i18n.t('Total deaths in ')}.....</p>) } 
                   
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ countryReducer }) => {
    const { total } = countryReducer;
    return { total };
}
export default connect(mapStateToProps, { fetchWorldTotalCases })(totalNumber);
