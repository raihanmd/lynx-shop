export const fetchGET = async (url, options) => {
  try {
    return await (await fetch(options?.component === "client" ? url : process.env.NEXT_PUBLIC_MAIN_URL + url, { next: { revalidate: 10 } })).json();
  } catch (error) {
    throw error;
  }
};
