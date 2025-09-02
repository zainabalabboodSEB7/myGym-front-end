import './App.css'
import NavBar from './components/NavBar/NavBar'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import CategoryList from './components/CategoryList/CategoryList.jsx'
import CategoryDetails from './components/CategoryDetails/CategoryDetails.jsx'
import { useNavigate, Route, Routes, Navigate } from 'react-router-dom'
import * as authService from './services/authService.js'
import { useState, useEffect } from 'react'
import SessionList from './components/SessionList/SessionList.jsx'
import SessionDetails from './components/sessionDetails/sessionDetails.jsx'
import SessionForm from './components/SessionsForm/SessionForm.jsx'
import HomePage from './components/HomePage/HomePage.jsx'

import * as sessionService from './services/sessionService.js'

import * as categoryService from './services/categoryService.js'
import CategoryForm from './components/CategoryForm/CategoryForm.jsx'

const App = () => {

  const navigate = useNavigate()

  const initialState = authService.getUser()

  const [user, setUser] = useState(initialState)
  const [categories, setCategories] = useState([])
  const [sessions, setSessions] = useState([])

  useEffect(() => {
    const fetchAllCategories = async () => {
      const categoriesData = await categoryService.index()
      setCategories(categoriesData)
    }
    fetchAllCategories()
  }, [])

  const handleSignUp = async (formData) => {
    try {
      const res = await authService.signUp(formData)
      setUser(res)
      // return success
      return { success: true }
    } catch(err){
      // return failure flag (then signup form can display message)
      // add message?
      return { success: false, message: err.message }
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const handleSignIn = async (formData) => {
    const res = await authService.signIn(formData)
    setUser(res)
  }

 const handleAddCategory = async (formData)=>{
    try{
      const newCategory = await categoryService.create(formData)
    setCategories([...categories, newCategory])
    navigate('/categories')
    } catch (err){
      console.error('Error adding category:', err)

    }

}

  const handleUpdateCategory  = async (formData, categoryId)=>{
   try{
    const updatedCategory = await categoryService.update(formData, categoryId)
    const categoryIndex = categories.findIndex(category => category._id === categoryId)
    const newCategories = [...categories]
    newCategories[categoryIndex] = updatedCategory
    setCategories(newCategories)
    navigate(`/categories/${categoryId}`)
    } catch (err){
      console.error('Error editing category:', err)
    }
}

 const handleDeleteCategory = async (categoryId) => {
  try {
    await categoryService.deleteCategory(categoryId)
    setCategories(prev => prev.filter(category => category.id !== Number(categoryId)))
    navigate('/categories')
  } catch(err) {
    console.error('Error deleting category:', err)
  }
}

  const handleDeleteSession = async (categoryId, sessionId) => {
    try {
      await sessionService.deleteSession(categoryId, sessionId)
      // Remove deleted session from sessions state
      setSessions(prev => prev.filter(session => session._id !== sessionId))
      navigate(`/categories/${categoryId}/sessions`)
    } catch (err) {
      console.error('Error deleting session:', err)
    }
  }

const handleAddSession = async (categoryId, formData) => {
  try {
    const newSession = await sessionService.create(categoryId, formData);
    setSessions([...sessions, newSession]); 
    navigate(`/categories/${categoryId}`);
  } catch (err) {
    console.error('Error adding session:', err);
  }
};

const handleUpdateSession = async (categoryId, sessionId, payload) => {
  try {
    const updatedSession = await sessionService.update(categoryId, sessionId, payload)

    const sessionIndex = sessions.findIndex(s => s.id === sessionId);
    const newSessions = [...sessions];
    newSessions[sessionIndex] = updatedSession;
    setSessions(newSessions);
    navigate(`/categories/${categoryId}/sessions/${sessionId}`);
  } catch (err) {
    console.error('Error updating session:', err);
  }
};


  return (
    <>
      <NavBar user={user} handleSignOut={handleSignOut} />
      <Routes>
          <Route path='/' element={<HomePage HomePage={HomePage}/>} />
          <Route path='/categories' element={<CategoryList categories={categories}/>}/>

          <Route path='/categories/new' element={<CategoryForm handleAddCategory={handleAddCategory} user={user}  />} />
          <Route path='/categories/:categoryId/edit' element={<CategoryForm handleUpdateCategory={handleUpdateCategory} user={user}  />} />

          <Route path='/categories/:categoryId' element={<CategoryDetails user={user} handleDeleteCategory={handleDeleteCategory}/>}/>
          <Route path="/categories/:categoryId/sessions" element={<SessionList user={user}  />} />
          <Route path="/categories/:categoryId/sessions/:sessionId" element={<SessionDetails user={user} handleDeleteSession={handleDeleteSession} />} />

          <Route path="/categories/:categoryId/sessions/new" element={<SessionForm user={user} categories={categories} handleAddSession={handleAddSession} />} />
          <Route path="/categories/:categoryId/sessions/:sessionId/edit" element={<SessionForm user={user} categories={categories} handleUpdateSession={handleUpdateSession} />} />

          <Route path='/sign-up' element={<SignUp handleSignUp={handleSignUp} user={user} />} />
          <Route path='/sign-in' element={<SignIn handleSignIn={handleSignIn} user={user} />} />
          <Route path='*' element={<h1>404</h1>} />
    </Routes>
    </>

    // <>
    //   <NavBar user={user} handleSignOut={handleSignOut} />
    //   <Routes>
    //     <Route path="/" element={<h1>Hello World!</h1>} />
    //     {!user && (
    //       <>
    //         <Route
    //           path="/sign-up"
    //           element={<SignUp handleSignUp={handleSignUp} />}
    //         />
    //         <Route
    //           path="/sign-in"
    //           element={<SignIn handleSignIn={handleSignIn} />}
    //         />
    //       </>
    //     )}
    //     <Route path="*" element={<h1>404</h1>} />
    //   </Routes>
    // </>
  )
}

export default App

