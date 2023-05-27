const fetchData = async ( url, token, setDataCallback ) => {
  console.log('Fetching data...');
  console.log('url:', url);
  console.log('token:', token);
  console.log('setDataCallback:', setDataCallback);
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    const data = await response.json();
    setDataCallback(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export default fetchData;
