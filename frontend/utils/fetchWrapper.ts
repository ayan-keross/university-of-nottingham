const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchWrapper = async (endpoint:string, options = {}) => {
  const res = await fetch(`${BASE_URL}/${endpoint}`, options);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "API request failed");
  }

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  }
  return res.text();
};
