export const fetchPOST = async (url, data) => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
      method: "POST",
      headers: {
        "API-Key": process.env.NEXT_PUBLIC_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    return json;
  } catch (error) {
    throw error;
  }
};
