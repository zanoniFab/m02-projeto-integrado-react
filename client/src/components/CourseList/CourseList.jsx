import PropTypes from 'prop-types';
import CourseCard from '../CourseCard';
import './CourseList.css';
function CourseList({ list }) {
  return (
    <ul className='courseListContainer'>
      {list.map((course) => (
        <li key={course.id}>
          <CourseCard
            id={course.id}
            imageUrl={course.imageUrl}
            name={course.name}
            category={course.category}
@@ -17,8 +18,8 @@ function CourseList({ list }) {
        </li>
      ))}
    </ul>
  )
};

CourseList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired,
      imageUrl: PropTypes.string,
    }),
  ),
};
CourseList.defaultProps = {
  list: [],
};
export default CourseList;