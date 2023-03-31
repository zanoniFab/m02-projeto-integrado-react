
import "./CourseDetailsPage.css";
import { useParams } from "react-router-dom";
import useCourseDetails from "../../hooks/useCourseDetails";

function CourseDetailsPage() {
  const {id} = useParams();
  const { course } = useCourseDetails(id);
  return (
    <div className="courseDetailsPageContainer">
      <h2>Detalhes do Curso</h2>
      <img width={50} src={course?.imageUrl} alt={`Imagem do curso ${course?.name}`} />
      <p>
        <strong>Nome:</strong> <span>{course?.name}</span>
      </p>
      <p>
        <strong>Categoria:</strong> <span>{course?.category}</span>
      </p>
      <p>
        <strong>Descrição:</strong> <span>{course?.description}</span>
      </p>
      <p>
        <strong>Duração:</strong> <span>{course?.duration}h</span>
      </p>
    </div>
  );
}

export default CourseDetailsPage;