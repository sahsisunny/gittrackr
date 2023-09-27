const FetchIssuePr = async (url, token, setDataCallback, setCountCallback) => {
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

export default FetchIssuePr;
