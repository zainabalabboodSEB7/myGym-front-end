import { Link, useParams } from 'react-router-dom';

const CategoryList = (props) => {
  return (
    <main>
      <h1>Category List</h1>
      {props.categories?.map(category => category && (
        <Link to={`/categories/${category.id}`} key={category.id}>
          <div key={category.id}>
            <h3>{category.name}</h3>
            {category.description && <p>{category.description} </p>}
            {category.instructor && (
              <p><strong>{category.instructor.name} </strong> </p>
            )}
          </div>

        </Link>
      ))}
    </main>
  )
}

export default CategoryList
