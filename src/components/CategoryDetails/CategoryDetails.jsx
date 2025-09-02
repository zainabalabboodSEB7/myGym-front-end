import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as categoryService from '../../services/categoryService.js'
import SessionList from '../SessionList/SessionList.jsx';
import '../../App.css'

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
       <main className="category-detail-page">
        <section className="category-info">
        <h1>{category.name}</h1>
        <p>{category.description}</p>
        <p>{category.instructor?.name || "No instructor"}</p>


        {user && user.is_admin && (
          <div className="category-actions">
          <Link to={`/categories/${categoryId}/edit`} className="action-button">Edit</Link>
          <button onClick={() => handleDeleteCategory(categoryId)}>Delete</button>
             </div>
        )}   
           </section>
         <SessionList user={user} /> 
        </main>
    );
  };

export default CategoryDetails;