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
    headers: {
      "Content-Type": "application/json",
      ...(requiredAuth && setAuthorizationToken()),
    },
  }).then((res) => {
    if (res.status === 401 || res.status === 409) {
      throw new Error(res.status.toString());
    }
    return res.json();
  });
};

function setAuthorizationToken() {
  const storedUserData = localStorage.getItem("userData");

  if (!storedUserData) {
    return {};
  }

  const { jwt } = JSON.parse(storedUserData) as { jwt: string };

  return {
    Authorization: `Bearer ${jwt}`,
  };
}

export default fetcher;
