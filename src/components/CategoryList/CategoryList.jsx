const CategoryList = (props) => {
  return (
    <main>
      <h1>Category List</h1>
      {props.categories.map((category) => (
        <div key={category.id}>
          <h3>{category.name}</h3>
          {category.description && <p>{category.description}</p>}
        </div>
      ))}
    </main>
  )
}

export default CategoryList
