import { 
	FETCH_COUNTRIES_CASES,
	FETCH_WORLD_TOTAL,
	FETCH_COUNTRY_HISTORY,
	FETCH_CURRENT_PAGE,
	HTTP_ERROR,
	FOLLOW_COUNTRY,
	FETCH_FOLLOWED_COUNTRIES,
	UNFOLLOW_COUNTRY,
	SEARCH_COUNTRY,
	LOADING_PAGE
} from '../actions/types';

export default (state = {}, action) => {

 switch(action.type) {
 	case FETCH_COUNTRIES_CASES:
		const countries = action.payload.sort((a, b) => new Date(a.updated) - new Date(b.updated));
 		const recents = countries.slice(0, 6);
 		return { ...state, countries, recents };

 	case FETCH_WORLD_TOTAL:
 		return { ...state, total: action.payload };

 	case FETCH_CURRENT_PAGE:
 		return { ...state, countries: action.payload }
 		
 	case HTTP_ERROR:
		return { ...state, error: action.payload };
		 
    case FETCH_COUNTRY_HISTORY:
		return { ...state, historical: action.payload.data };

	case FETCH_FOLLOWED_COUNTRIES:
		return { ...state, followedCountries: action.payload };

	case FOLLOW_COUNTRY:
		return { ...state, followedCountries: action.payload };

	case UNFOLLOW_COUNTRY:
		return { ...state, followedCountries: action.payload };

	case SEARCH_COUNTRY:
		return { ...state, searched: action.payload };
	
	case LOADING_PAGE:
		return { ...state, loading: action.payload };

 	default:
 		return state;
 }

};
