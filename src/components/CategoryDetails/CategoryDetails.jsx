import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as categoryService from '../../services/categoryService.js'

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
        <strong>Description:</strong> {category.description}

        {user && user.is_admin && (
            <button onClick={() => handleDeleteCategory(categoryId)}>Delete</button>
        )}
        </>
    )
}

export default CategoryDetails;