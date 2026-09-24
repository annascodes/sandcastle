type ApiOptions = Omit<RequestInit, "body"> & {
  body?: unknown
}

export async function api<T>(
  url: string,
  options: ApiOptions = {}
): Promise<T> {
  const { body, headers, ...rest } = options

  const response = await fetch(url, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong")
  }

  return data
}