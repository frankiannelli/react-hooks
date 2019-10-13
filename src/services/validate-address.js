import convertStringToInt from '../helpers/convert-string-to-int';

export default async (suburb, state, postCode) => {
  try {
    const response = await fetch(
      `https://digitalapi.auspost.com.au/postcode/search.json?q=${suburb}&state=${state}`,
      {
        headers: new Headers({
          'auth-key': '872608e3-4530-4c6a-a369-052accb03ca8',
          'Content-type': 'application/json'
        })
      }
    );
    const data = await response.json();

    if (data.localities === '') {
      return `The Suburb ${suburb} does not exist in the state ${state}`;
    }
    let localities;
    if (!Array.isArray(data.localities.locality)) {
      localities = [data.localities.locality];
    } else {
      localities = data.localities.locality;
    }
    const validSuburb = localities.find(
      (element) => element.location.toUpperCase() === suburb.toUpperCase()
    );

    const validPostCode = localities.find(
      (element) => element.postcode === convertStringToInt(postCode)
    );

    if (!validSuburb) {
      return `The suburb ${suburb} does not exist in the state ${state}`;
    } else if (validSuburb && !validPostCode) {
      return `The postcode ${postCode} does not match ${suburb} in ${state}`;
    } else {
      return 'The postcode, suburb and state entered are valid';
    }
  } catch (error) {
    console.log(error);
    return 'Sorry something went wrong';
  }
};
