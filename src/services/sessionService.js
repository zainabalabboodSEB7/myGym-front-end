const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/categories`

const index = async (categoryId) => {
  try {
    const res = await fetch(`${BASE_URL}/${categoryId}/sessions`)
    if (!res.ok) throw new Error('Failed to fetch sessions')
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
    return []
  }
}

const show = async (categoryId, sessionId) => {
  try {
    const res = await fetch(`${BASE_URL}/${categoryId}/sessions/${sessionId}`)
    if (!res.ok) throw new Error('Failed to fetch session')
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

const create = async (categoryId, formData) => {
  try {
    const token = localStorage.getItem('token')

    const res = await fetch(`${BASE_URL}/${categoryId}/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    })

    if (!res.ok) throw new Error('Failed to create session')
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

const update = async (categoryId, sessionId, formData) => {
  try {
    const token = localStorage.getItem('token')

    const res = await fetch(`${BASE_URL}/${categoryId}/sessions/${sessionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    })

    if (!res.ok) throw new Error('Failed to update session')
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

const deleteSession = async (categoryId, sessionId) => {
  try {
    const token = localStorage.getItem('token')

    const res = await fetch(`${BASE_URL}/${categoryId}/sessions/${sessionId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!res.ok) throw new Error('Failed to delete session')
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export {
  index,
  show,
  create,
  update,
  deleteSession,
}
