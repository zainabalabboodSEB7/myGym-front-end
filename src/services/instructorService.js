const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/instructors`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Failed to fetch instructors");
    return await res.json();
  } catch (err) {
    console.error("Error fetching instructors:", err);
    return [];
  }
};

export { index };
