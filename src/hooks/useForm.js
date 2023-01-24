import { useState, useEffect, useMemo } from "react"

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm)
  const [formValidation, setFormValidation] = useState({})
  // const [touchedFields, setTouchedFields] = useState({})

  useEffect(() => {
    createValidators()
  }, [formState])

  // Con esto nos aseguramos que se rerenderice el componente padre
  useEffect(() => {
    setFormState(initialForm)
  }, [initialForm])

  const formIsValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false
    }

    return true
  }, [formValidation])


  const handleChange = ({ target }) => {
    const { name, value } = target

    setFormState({
      ...formState,
      [name]: value
    })

    // setTouchedFields({
    //   ...touchedFields,
    //   [name]: true
    // })
  }

  const resetForm = () => {
    setFormState(initialForm)
  }

  const createValidators = () => {
    const formCheckedValues = {}

    for (const formField of Object.keys(formValidations)) {
      const [validate, errorMessage] = formValidations[formField]

      // Valid if the validate function returns true or the field has not been touched yet
      // formCheckedValues[`${formField}Valid`] = validate(formState[formField]) || !touchedFields[formField] ? null : errorMessage
      formCheckedValues[`${formField}Valid`] = validate(formState[formField]) ? null : errorMessage
    }

    setFormValidation(formCheckedValues)
  }

  return {
    formState,
    ...formState,
    handleChange,
    resetForm,
    ...formValidation,
    formIsValid
  }
}
