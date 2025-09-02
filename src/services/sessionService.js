// const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/categories`

// const index = async (categoryId) => {
//   try {
//     const res = await fetch(`${BASE_URL}/${categoryId}/sessions`)
//     if (!res.ok) throw new Error('Failed to fetch sessions')
//     const data = await res.json()
//     return data
//   } catch (err) {
//     console.log(err)
//     return []
//   }
// }

// const show = async (categoryId, sessionId) => {
//   try {
//     const res = await fetch(`${BASE_URL}/categories/${categoryId}/sessions/${sessionId}`)
//     const data = await res.json()
//     return data
//   } catch (err) {
//     console.error('Failed to fetch session', err)
//   }
// }

// const create = async (categoryId, formData) => {
//   try {
//     const token = localStorage.getItem('token')

//     const res = await fetch(`${BASE_URL}/${categoryId}/sessions`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify(formData)
//     })

//     if (!res.ok) throw new Error('Failed to create session')
//     const data = await res.json()
//     return data
//   } catch (err) {
//     console.log(err)
//   }
// }

// const update = async (categoryId, sessionId, formData) => {
//   try {
//     const token = localStorage.getItem('token')

//     const res = await fetch(`${BASE_URL}/${categoryId}/sessions/${sessionId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify(formData)
//     })

//     if (!res.ok) throw new Error('Failed to update session')
//     const data = await res.json()
//     return data
//   } catch (err) {
//     console.log(err)
//   }
// }

// const deleteSession = async (categoryId, sessionId) => {
//   try {
//     const token = localStorage.getItem('token')

//     const res = await fetch(`${BASE_URL}/${categoryId}/sessions/${sessionId}`, {
//       method: 'DELETE',
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     })

//     if (!res.ok) throw new Error('Failed to delete session')
//     const data = await res.json()
//     return data
//   } catch (err) {
//     console.log(err)
//   }
// }


// export {
//   index,
//   show,
//   create,
//   update,
//   deleteSession,
// }

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/categories`

const index = async (categoryId) => {
  try {
    const res = await fetch(`${BASE_URL}/${categoryId}/sessions`)
    if (!res.ok) throw new Error('Failed to fetch sessions')
    return await res.json()
  } catch (err) {
    console.error(err)
    return []
  }
}

const show = async (categoryId, sessionId) => {
  try {
    const res = await fetch(`${BASE_URL}/${categoryId}/sessions/${sessionId}`)
    if (!res.ok) throw new Error('Failed to fetch session')
    return await res.json()
  } catch (err) {
    console.error('Failed to fetch session', err)
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
    return await res.json()
  } catch (err) {
    console.error(err)
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
    return await res.json()
  } catch (err) {
    console.error(err)
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
    return await res.json()
  } catch (err) {
    console.error('Failed to delete session', err)
  }
}

const createReview = async (categoryId, sessionId, formData) => {
    const token = localStorage.getItem('token')
    const res = await fetch(`${BASE_URL}/${categoryId}/sessions/${sessionId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    return data
}

export {
  index,
  show,
  create,
  update,
  deleteSession,
  createReview
}
