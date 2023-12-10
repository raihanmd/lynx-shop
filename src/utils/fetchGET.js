export const fetchGET = async (url, options) => {
  try {
    const res = await fetch(
      options?.component === "client"
        ? url
        : process.env.NEXT_PUBLIC_API_URL + url,
      { next: { revalidate: 10 } }
    );

    const json = await res.json();
    return json;
  } catch (error) {
    throw error;
  }
};
