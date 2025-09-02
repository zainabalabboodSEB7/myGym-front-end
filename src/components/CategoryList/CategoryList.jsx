import { Link, useParams } from 'react-router-dom';

const CategoryList = (props) => {
  return (
    <>
      <div id="CategoryListTitle">
      <h1>Category List</h1>
      </div>
    <main>

<div id="CategoryListItem">
  {props.categories.map((category) => (
    <Link to={`/categories/${category.id}`} key={category.id}>
      <div className="category-item">
        <h3>{category.name}</h3>
        {category.description && <p>{category.description}</p>}
      </div>
    </Link>
  ))}
</div>


    </main>
    </>
  )
}

export default CategoryList
