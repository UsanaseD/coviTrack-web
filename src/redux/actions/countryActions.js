import {
	FETCH_COUNTRIES_CASES,
	FETCH_WORLD_TOTAL,
	HTTP_ERROR,
	FETCH_COUNTRY_HISTORY,
	FETCH_CURRENT_PAGE,
	FETCH_FOLLOWED_COUNTRIES,
	FOLLOW_COUNTRY,
	UNFOLLOW_COUNTRY,
	SEARCH_COUNTRY,
	LOADING_PAGE
} from './types';
import Axios from 'axios';

const baseUrl = 'https://corona.lmao.ninja';

export const fetchCountryCases = () => async (dispatch) => { 
	try {
		const countries = await Axios.get(`${baseUrl}/countries`);

		return dispatch({
			type: FETCH_COUNTRIES_CASES,
			payload: countries.data
		});
	}
	catch(error) {
		return dispatch({
			type: HTTP_ERROR,
			payload: error 
		});
	}
};

export const fetchWorldTotalCases = () => async (dispatch) => { 
	try {
		const userLocation = await Axios.get("http://api.ipstack.com/check?access_key=4ea1e21d8dee0802d1fbd7124cd45c9e");
		let payload;
        if(userLocation?.data?.country_name){
			const userCountry = userLocation?.data?.country_name.toLowerCase();
		     payload = await Axios.get(`${baseUrl}/countries/${userCountry}`);
		} else {
			payload = await Axios.get(`${baseUrl}/all`);
		}
		return dispatch({
			type: FETCH_WORLD_TOTAL,
			payload
		});
	}
	catch(error) {
		return dispatch({
			type: HTTP_ERROR,
			payload: error 
		});
	}
};

export const fetchCountryHistory = (country) => async (dispatch) => { 
	try {
		const historical = await Axios.get(`${baseUrl}/v2/historical/${country}`);
		return dispatch({
			type: FETCH_COUNTRY_HISTORY,
			payload: historical
		});
	}
	catch(error) {
		return dispatch({
			type: HTTP_ERROR,
			payload: error 
		});
	}
};
	
/**
 * fetch a given page on a given array of elements (Pagination)
 * @param  {Number} page  is the target page
 * @param  {Array}   elements [description]
 * @param  {Number} limit    the limit number of items per page
 * @return {Array}  items    the items to be displayed
 */
export const fetchPage = (page, limit = 6) => async (dispatch) => {
	try {
		let countries = await Axios.get(`${baseUrl}/countries`);
		const pages = Math.ceil(countries.data.length / limit);
		page = page > pages ? 1 : page;
		const firstItem = page === 1 ? (page - 1) : (page * limit) - limit;
		const lastItem = page * limit;
		countries = countries.data.slice(firstItem, lastItem);

		return dispatch({
			type: FETCH_CURRENT_PAGE,
			payload: { paginated: countries, pages }
		});
	}
	catch(error) {
		return dispatch({
			type: HTTP_ERROR,
			payload: error 
		});
	}
};

export const fetchFollowedCountries = () => (dispatch) => {
	try {
		const followedCountries = JSON.parse(localStorage.followedCountries || "[]");

		return dispatch({
			type: FETCH_FOLLOWED_COUNTRIES,
			payload: followedCountries
		});
	}
	catch(error) {
		return dispatch({
			type: HTTP_ERROR,
			payload: error 
		});
	}
}

export const followCountry = country => dispatch => {
	try {

		let followedCountries = localStorage.followedCountries;

		if(!followedCountries) localStorage.setItem('followedCountries', "[]");

		followedCountries = JSON.parse(localStorage.followedCountries);
		followedCountries.push(country);

		localStorage.setItem('followedCountries', JSON.stringify(followedCountries));

		return dispatch({
			type: FOLLOW_COUNTRY,
			payload: followedCountries
		});
	}
	catch(error) {
		return dispatch({
			type: HTTP_ERROR,
			payload: error 
		});
	}
}

export const unfollowCountry = countryName => dispatch => {
	try {

		let followedCountries = localStorage.followedCountries;

		if(!followedCountries) localStorage.setItem('followedCountries', "[]");

		followedCountries = JSON.parse(localStorage.followedCountries);
		followedCountries = followedCountries.filter(country => country.country !== countryName);

		localStorage.setItem('followedCountries', JSON.stringify(followedCountries));

		return dispatch({
			type: UNFOLLOW_COUNTRY,
			payload: followedCountries
		});
	}
	catch(error) {
		return dispatch({
			type: HTTP_ERROR,
			payload: error 
		});
	}
}

export const searchCountry = (country) => async (dispatch) => {
	try {
		const allCountry = await Axios.get(`${baseUrl}/countries`);
		var pattern = country.toLowerCase().split("").map((x, index)=>{
			console.log(index);
			return `(?=.*${x})`
		}).slice(0, 4).join("");

		const regex = new RegExp(`${pattern}`, 'g');
		const searched = allCountry?.data.filter((reg) => {
		  return reg?.country.toLowerCase().match(regex);
		}).slice(0, 6);
		 
		return dispatch({
			type: SEARCH_COUNTRY,
			payload: searched
		});
	}
	catch(error) {
		return dispatch({
			type: HTTP_ERROR,
			payload: error 
		});
	}
}

export const loadingPage = (loading) => async (dispatch) => {
	try {
		return dispatch({
			type: LOADING_PAGE,
			payload: loading
		});
	}
	catch(error) {
		return dispatch({
			type: HTTP_ERROR,
			payload: error 
		});
	}
}