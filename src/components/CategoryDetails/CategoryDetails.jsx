import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as categoryService from '../../services/categoryService.js'
import SessionList from '../SessionList/SessionList.jsx';
const CategoryDetails = ({ user, handleDeleteCategory }) => {
    const { categoryId } = useParams()
    
    const [category, setCategory] = useState(null)

    useEffect(() => {
    const fetchCategory = async () => {
      const categoryData = await categoryService.show(categoryId)
      setCategory(categoryData)
    }
    fetchCategory()
  }, [categoryId])

    if (!category) return <h2>Loading...</h2>;
 
    return (
        <>
        <strong>Category:</strong> {category.name}<br />
        <strong>Description:</strong> {category.description}<br />
        <strong>Instructor:</strong> {category.instructor?.name || "No instructor"}


        {user && user.is_admin && (
          <div>
            <Link to={`/categories/${categoryId}/edit`}>Edit</Link>
            <button onClick={() => handleDeleteCategory(categoryId)}>Delete</button>
 </div>
        )}   
         <SessionList user={user} /> 
        </>
    )
  }

export default CategoryDetails;