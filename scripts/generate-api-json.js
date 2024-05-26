const fs = require('fs');
const axios = require('axios');

const baseURL = 'https://backend.koueider.com/MitchAPI';
const dir = './app/api/json-generated';

const endpoints = [
  // { endpoint: 'pages/home.php', filename: 'home.json' },
  { endpoint: 'nav.php', filename: 'nav.json' },
  { endpoint: 'cats.php', filename: 'cats.json' },
  { endpoint: 'pages/get-page-by-slug.php', filename: 'opinion.json', method: 'post', requestBody: { slug: 'give-your-opinion' } },
  { endpoint: 'pages/get-page-by-slug.php', filename: 'home.json', method: 'post', requestBody: { slug: 'home' } },
  { endpoint: 'pages/get-page-by-slug.php', filename: 'about.json', method: 'post', requestBody: { slug: 'about' } },
  { endpoint: 'pages/get-page-by-slug.php', filename: 'terms.json', method: 'post', requestBody: { slug: 'terms' } },
  { endpoint: 'pages/get-page-by-slug.php', filename: 'privacy-policy.json', method: 'post', requestBody: { slug: 'privacy-policy' } },
  { endpoint: 'pages/get-page-by-slug.php', filename: 'return-policy.json', method: 'post', requestBody: { slug: 'return-policy' } },
  { endpoint: 'pages/get-page-by-slug.php', filename: 'contact-us.json', method: 'post', requestBody: { slug: 'contact-us' } },
  // Add more endpoints as needed
  
];
const sendRequest = async (endpoint) => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  try {
    const apiUrl = `${baseURL}/${endpoint.endpoint}`;
    
    // Set the 'Origin' header manually (replace 'YOUR_ORIGIN' with the actual origin)
    const headers = {
      'Origin': 'http://localhost:3000/',
    };

    const axiosConfig = {
      method: endpoint.method || 'get', // Default to 'get' if not specified
      url: apiUrl,
      headers, // Include the headers object here
    };

    if (endpoint.method === 'post') {
      axiosConfig.data = endpoint.requestBody;
    }

    const response = await axios(axiosConfig);

    if (response.status === 200) {
      return response.data;
    } else {
      console.error(`Request to ${apiUrl} failed with status ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error(`An error occurred while fetching data from ${endpoint.endpoint}: ${error.message}`);
    return null;
  }
};

const fetchDataAndSaveToFile = async (endpoint) => {
  try {
    const data = await sendRequest(endpoint);
    if (data) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      fs.writeFileSync(`${dir}/${endpoint.filename}`, JSON.stringify(data, null, 2));
      console.log(`Data from ${endpoint.endpoint} saved to ${endpoint.filename}`);
    }
  } catch (error) {
    console.error(`Error fetching and saving data for ${endpoint.endpoint}: ${error.message}`);
  }
};

const main = async () => {
  for (const endpoint of endpoints) {
    await fetchDataAndSaveToFile(endpoint);
  }
};

main()
  .then(() => {
    console.log('Data fetching and saving completed.');
  })
  .catch((error) => {
    console.error(`An error occurred: ${error.message}`);
  });
