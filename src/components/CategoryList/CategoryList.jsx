import { Link, useParams } from 'react-router-dom';

const CategoryList = (props) => {
  return (
    <main>
      <h1>Category List</h1>
      {props.categories.map((category) => (
        <Link to={`/categories/${category.id}`}>
        <div key={category.id}>
          <h3>{category.name}</h3>
          {category.description && <p>{category.description}</p>}
        </div>

        </Link>
      ))}
    </main>
  )
}

export default CategoryList
