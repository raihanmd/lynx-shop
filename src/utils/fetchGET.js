export const fetchGET = async (url, options) => {
  try {
    const res = await fetch(
      options?.component === "client"
        ? url
        : process.env.NEXT_PUBLIC_MAIN_URL + url,
      { next: { revalidate: 10 } }
    );

    if (res.headers.get("Content-Type") !== "application/json")
      return { message: "Error" };

    const json = await res.json();
    return json;
  } catch (error) {
    throw error;
  }
};
