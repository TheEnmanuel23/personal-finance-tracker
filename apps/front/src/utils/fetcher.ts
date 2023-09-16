const fetcher = async ({
  data,
  type = "GET",
  endpoint,
  authorized: requiredAuth = true,
}: {
  endpoint: string;
  type: "PUT" | "DELETE" | "POST" | "GET";
  data?: unknown;
  authorized: boolean;
}) => {
  const url = `${import.meta.env.VITE_API}${endpoint}`;

  return await fetch(url, {
    method: type,
    ...(["PUT", "POST"].includes(type) && { body: JSON.stringify(data) }),
    ...(requiredAuth && setAuthorizationToken()),
  }).then((res) => res.json());
};

function setAuthorizationToken() {
  const storedUserData = localStorage.getItem("userData");

  if (!storedUserData) {
    return {};
  }

  const { jwt } = JSON.parse(storedUserData) as { jwt: string };

  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
}

export default fetcher;
