export default function Sidebar({ categories, onCategorySelect }) {
  return (
    <div className="sidebar">
      <h3>Categories</h3>
      <ul>
        {Object.keys(categories).map((category, index) => (
          <li key={index} onClick={() => onCategorySelect(category)} className="category">
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
  