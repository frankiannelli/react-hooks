import nock from 'nock';
import validateAddress from '../validate-address';
import mockValidResponse from './mocks/valid-response';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-type': 'application/json',
  'Access-Control-Allow-Headers': 'auth-key'
};

describe('Validate address service', () => {
  it('Gives a success message for valid address', async () => {
    nock('https://digitalapi.auspost.com.au')
      .options('/postcode/search.json?q=cooma&state=nsw')
      .reply(200, {}, headers);

    nock('https://digitalapi.auspost.com.au')
      .get('/postcode/search.json?q=cooma&state=nsw')
      .reply(200, mockValidResponse, headers);

    const formMessage = await validateAddress('cooma', 'nsw', '2630');
    expect(formMessage).toBe('The postcode, suburb and state entered are valid');
  });
  it('Gives a failed message if address does not match state', async () => {
    nock('https://digitalapi.auspost.com.au')
      .options('/postcode/search.json?q=coo&state=nsw')
      .reply(200, {}, headers);
    nock('https://digitalapi.auspost.com.au')
      .get('/postcode/search.json?q=coo&state=nsw')
      .reply(200, mockValidResponse, headers);

    const formMessage = await validateAddress('coo', 'nsw', '2630');
    expect(formMessage).toBe('The suburb coo does not exist in the state nsw');
  });

  it('Gives a failed message postcode does not match suburb', async () => {
    nock('https://digitalapi.auspost.com.au')
      .options('/postcode/search.json?q=cooma&state=vic')
      .reply(200, {}, headers);
    nock('https://digitalapi.auspost.com.au')
      .get('/postcode/search.json?q=cooma&state=vic')
      .reply(200, mockValidResponse, headers);

    const formMessage = await validateAddress('cooma', 'vic', '3030');
    expect(formMessage).toBe('The postcode 3030 does not match cooma in vic');
  });

  it('Gives a failed message if suburb does not exist', async () => {
    nock('https://digitalapi.auspost.com.au')
      .options('/postcode/search.json?q=badSuburb&state=nsw')
      .reply(200, {}, headers);
    nock('https://digitalapi.auspost.com.au')
      .get('/postcode/search.json?q=badSuburb&state=nsw')
      .reply(200, { localities: '' }, headers);
    const formMessage = await validateAddress('badSuburb', 'nsw', '2630');
    expect(formMessage).toBe('The Suburb badSuburb does not exist in the state nsw');
  });
});
