
export default class Helper {

	/**
	 * Formats a number 111230 => 112,230
	 * @param  {Number} number the number which needs to be converted
	 * @return {Number}        the already formatted
	 */
	static _fn = (number = 0) => number.toLocaleString();

	/**
	 * checks whether a given country is already followed
	 * @param  {String} countryName the name of the country to be checked
	 * @return {Object} the found country      
	 */
	static _isFollowed = (countryName) => {
		const followedCountries = JSON.parse(localStorage.followedCountries || "[]");

		return followedCountries.find(country => country.country === countryName) || false;
	}
}