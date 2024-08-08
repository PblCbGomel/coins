export async function GetFetch({ body, path, query }: { body?: any; path: string; query?: any }) {
  const response = await fetch(`${process.env.REACT_APP_BACK_URL}${path}?` + new URLSearchParams(query || ''), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  return response?.json();
}

export async function PostFetch({ body, path, query }: { body?: any; path: string; query?: any }) {
  const response = await fetch(`${process.env.REACT_APP_BACK_URL}${path}?` + new URLSearchParams(query || ''), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  return response?.json();
}

export async function PatchFetch({ body, path, query }: { body?: any; path: string; query?: any }) {
  const response = await fetch(`${process.env.REACT_APP_BACK_URL}${path}?` + new URLSearchParams(query || ''), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  return response?.json();
}
