import { Link, useParams } from 'react-router-dom';

const CategoryList = (props) => {
  return (
    <>
      <div id="CategoryListItem">
        {props.categories?.map((category, index) =>
          category ? (
            <Link to={`/categories/${category.id}`} key={category.id || index}>
              <div className="category-item">
                <h3>{category.name}</h3>
                {category.description && <p>{category.description}</p>}
                {category.instructor?.name && <p id="instructor">Instructor: {category.instructor.name}</p>}
              </div>
            </Link>
          ) : null
        )}

      </div>
    </>
  )
}

export default CategoryList
