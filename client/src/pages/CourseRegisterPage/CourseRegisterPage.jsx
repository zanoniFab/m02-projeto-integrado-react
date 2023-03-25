import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Card from '../../components/Card'
import InputGroup from '../../components/InputGroup'
import Button, { BUTTON_VARIANT } from '../../components/Button'
import useCourseRegister from '../../hooks/useCourseRegister'

import './CourseRegisterPage.css'

const schema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  imageUrl: yup.string().url('Deve ser uma url').required('Campo obrigatório'),
  category: yup.string().required('Campo obrigatório'),
  description: yup.string().required('Campo obrigatório'),
  duration: yup.number('Deve ser um número').required('Campo obrigatório'),
  targetMarket: yup.string().required('Campo obrigatório')
})

function CourseRegisterPage () {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      imageUrl: '',
      category: '',
      description: '',
      duration: '',
      targetMarket: ''
    },
    resolver: yupResolver(schema)
  })

  const { isSubmitting, registerCourse } = useCourseRegister()

  const onSubmit = (data) => {
    registerCourse(data)
  }

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
                    helperText={errors?.name?.message}
                    {...register('name')}
                  />
                  <InputGroup
                    labelText="Duração"
                    placeholder="Duração do curso"
                    helperText={errors?.duration?.message}
                    {...register('duration')}
                  />
                  <InputGroup
                    labelText="Descrição"
                    placeholder="Descrição do curso"
                    helperText={errors?.description?.message}
                    {...register('description')}
                  />
                </div>

                <div className="register-page-section-form-column">
                  <InputGroup
                    labelText="Url ícone"
                    placeholder="Url contendo ícone"
                    helperText={errors?.imageUrl?.message}
                    {...register('imageUrl')}
                  />
                  <InputGroup
                    labelText="Categoria"
                    placeholder="Categoria do curso"
                    helperText={errors?.category?.message}
                    {...register('category')}
                  />
                  <InputGroup
                    labelText="Público alvo"
                    placeholder="Público alvo do curso"
                    helperText={errors?.targetMarket?.message}
                    {...register('targetMarket')}
                  />
                </div>
              </div>

              <div className="register-page-section-form-group">
                <InputGroup
                  labelText="Conteúdo"
                  placeholder="Conteúdo do curso"
                />

                <div>
                  <Button variant={BUTTON_VARIANT.SECONDARY_OUTLINED}>
                    Adicionar
                  </Button>
                </div>
              </div>

              <div className="register-page-section-form-footer">
                <div>
                  <Button type="submit" disabled={isSubmitting}>Cadastrar</Button>
                </div>
                <div>
                  <Button type="button" variant={BUTTON_VARIANT.PRIMARY_LINK} onClick={() => navigate('/')}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </Card>
      </section>
    </div>
  )
}

export default CourseRegisterPage
