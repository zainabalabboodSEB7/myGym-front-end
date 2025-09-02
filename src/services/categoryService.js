const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/categories`

const index = async () => {
    try {
        const res = await fetch(BASE_URL)
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

const show = async (categoryId) => {
  try {
    const res = await fetch(`${BASE_URL}/${categoryId}`)
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

const create = async (formData) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error("No token found. Please log in.");
    }

    const payload = {
      ...formData,
      instructor_id: Number(formData.instructor_id) || null,
    };

    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Backend error:", errorText);
      throw new Error(`Error creating category: ${res.status} - ${errorText}`);
    }

    const data = await res.json();
    return data;

  } catch (err) {
    console.error("Create category failed:", err);
  }
};



const update = async (formData, categoryId) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error("No token found. Please log in.");
    }

    const payload = {
      ...formData,
      instructor_id: Number(formData.instructor_id) || null,
    };

    const res = await fetch(`${BASE_URL}/${categoryId}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Backend error:", errorText);
      throw new Error(`Error updating category: ${res.status} - ${errorText}`);
    }

    const data = await res.json();

    return {
      id: data.id,
      name: data.name,
      description: data.description || "",
      instructor: data.instructor || null,
    };
  } catch (err) {
    console.error("Update category failed:", err);
    throw err;
  }
};


const deleteCategory = async (categoryId) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`${BASE_URL}/${categoryId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await res.json()
    return data
  } catch(err) {
    console.log(err)
  }
}

// const indexByAdmin = async () => {
//   try {
//     const token = localStorage.getSession('token');
//     const res = await fetch(`${BASE_URL}/mine`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const data = await res.json();
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };
export{
    index,
    show,
    create,
    update,
    deleteCategory,
    // indexByAdmin,
}