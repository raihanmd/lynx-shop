export const fetchPOST = async (url, data, options) => {
  try {
    return await (
      await fetch(options?.component === "client" ? url : process.env.NEXT_PUBLIC_MAIN_URL + url, {
        method: "POST",
        headers: {
          "API-Key": process.env.NEXT_PUBLIC_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
    ).json();
  } catch (error) {
    throw error;
  }
};
