import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup"; // add yup resolver: faz o vinculo do yup schema com o formulário para fazer a validação
import { Trash } from "phosphor-react";
import * as yup from "yup"; // add yup
import Card from "../../components/Card";
import InputGroup from "../../components/InputGroup";
import Button, { BUTTON_VARIANT } from "../../components/Button";
import useCourseRegister from "../../hooks/useCourseRegister";
import "./CourseRegisterPage.css";
// o register passar uma propriedade ref, mas não podemos usar ref em componentes funcionais 
const schema = yup.object().shape({ // schema de validadores do formulário
  name: yup.string().required("Campo obrigatório"),
  imageUrl: yup.string().url("Deve ser uma url").required("Campo obrigatório"),
  category: yup.string().required("Campo obrigatório"),
  description: yup.string().required("Campo obrigatório"),
  duration: yup.number("Deve ser um número").required("Campo obrigatório"),
  targetMarket: yup.string().required("Campo obrigatório"),
});

function CourseRegisterPage() {
  const [content, setContent] = useState({ value: "", error: "" });
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }, // para fazer a validação
    control,
  } = useForm({
    defaultValues: {
      name: "",
      imageUrl: "",
      category: "",
      description: "",
      duration: "",
      targetMarket: "",
    },
    resolver: yupResolver(schema), // add o schema no resolver
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contents",
  });

  const { isSubmitting, registerCourse } = useCourseRegister(); // usa o hook

  const onSubmit = (data) => {
    registerCourse(data);
  };

  const handleAddContent = () => {
    if (content.value) {
      append({ id: new Date().getTime(), text: content.value });
      setContent({ value: "", error: "" });
      return;
    }

    setContent((prev) => ({ ...prev, error: "Campo obrigatório" }));
  };

  const handleChangeContent = (event) => {
    setContent({
      value: event.target.value,
      error: event.target.value ? "" : "Campo obrigatório",
    });
  };

  const handleDeleteContent = (index) => {
    remove(index);
  };

  return (
    <div className="register-page-container">
      <section className="register-page-section">
        <Card>
          <div className="register-page-section-card">
            <h1 className="register-page-section-title">Cadastrar Curso</h1>

            <form
              className="register-page-section-form"
              onSubmit={handleSubmit(onSubmit)} 
            >
              <div className="register-page-section-form-row">
                <div className="register-page-section-form-column">
                  <InputGroup
                    labelText="Nome"
                    placeholder="Nome do curso"
                    helperText={errors?.name?.message} // msg de erro configurada
                    {...register("name")} // colocar em todos os inputs conforme o nome do "defaultValues"
                  />
                  <InputGroup
                    labelText="Duração"
                    placeholder="Duração do curso"
                    helperText={errors?.duration?.message}
                    {...register("duration")}
                  />
                  <InputGroup
                    labelText="Descrição"
                    placeholder="Descrição do curso"
                    helperText={errors?.description?.message}
                    {...register("description")}
                  />
                </div>

                <div className="register-page-section-form-column">
                  <InputGroup
                    labelText="Url ícone"
                    placeholder="Url contendo ícone"
                    helperText={errors?.imageUrl?.message}
                    {...register("imageUrl")}
                  />
                  <InputGroup
                    labelText="Categoria"
                    placeholder="Categoria do curso"
                    helperText={errors?.category?.message}
                    {...register("category")}
                  />
                  <InputGroup
                    labelText="Público alvo"
                    placeholder="Público alvo do curso"
                    helperText={errors?.targetMarket?.message}
                    {...register("targetMarket")}
                  />
                </div>
              </div>

              <div className="register-page-section-form-group">
                <InputGroup
                  labelText="Conteúdo"
                  placeholder="Conteúdo do curso"
                  value={content.value}
                  helperText={content.error}
                  onChange={handleChangeContent}
                />

                <div>
                  <Button
                    type="button" // coloca type="button" pra não submeter o formulário
                    variant={BUTTON_VARIANT.SECONDARY_OUTLINED}
                    onClick={handleAddContent}
                  >
                    Adicionar
                  </Button>
                </div>
              </div>

              <ul className="register-page-section-form-group-content">
                {fields.map((field, index) => (
                  <li
                    key={field.id}
                    className="register-page-section-form-group-content-item"
                  >
                    <p>{field.text}</p>

                    <Button
                      isIconButton
                      type="button"
                      variant={BUTTON_VARIANT.SECONDARY_OUTLINED}
                      onClick={() => handleDeleteContent(index)}
                    >
                      <Trash size={16} />
                    </Button>
                  </li>
                ))}
              </ul>

              <div className="register-page-section-form-footer">
                <div>
                  <Button type="submit" disabled={isSubmitting}>
                    Cadastrar
                  </Button>
                </div>
                <div>
                  <Button
                    type="button"
                    variant={BUTTON_VARIANT.PRIMARY_LINK}
                    onClick={() => navigate("/")}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </Card>
      </section>
    </div>
  );
}

export default CourseRegisterPage;
