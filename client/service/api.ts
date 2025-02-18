const API_END_POINT =
  process.env.API_END_POINT || `${process.env.BASE_URL_API}`;

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error: ${errorData.message || response.statusText}`);
  }
  return response.json();
};

export const getRequest = async (url: string) => {
  const response = await fetch(`${API_END_POINT}${url}`, {
    cache: "no-store",
    credentials: "include", // Include credentials for secure requests
  });
  return handleResponse(response);
};

export const postRequest = async (
  url: string,
  data: Record<string, unknown>
) => {
  const response = await fetch(`${API_END_POINT}${url}`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include", // Include credentials for secure requests
  });
  return handleResponse(response);
};
