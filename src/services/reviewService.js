const API_URL = "http://localhost:8000";

export async function getReviews(categoryId, sessionId) {
  const res = await fetch(`${API_URL}/categories/${categoryId}/sessions/${sessionId}/reviews`);
  return res.json();
}

export async function createReview(categoryId, sessionId, data, token) {
  const res = await fetch(`${API_URL}/categories/${categoryId}/sessions/${sessionId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateReview(categoryId, sessionId, reviewId, data, token) {
  const res = await fetch(`${API_URL}/categories/${categoryId}/sessions/${sessionId}/reviews/${reviewId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteReview(categoryId, sessionId, reviewId, token) {
  await fetch(`${API_URL}/categories/${categoryId}/sessions/${sessionId}/reviews/${reviewId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}
