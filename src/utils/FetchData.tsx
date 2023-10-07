const fetchData = async (
  url: string,
  token: string,
  setDataCallback: (data: any) => void
): Promise<void> => {
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
