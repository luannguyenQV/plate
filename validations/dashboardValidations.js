export const addPlateValidations = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Please enter a plate name'
  }
  if (!values.description) {
    errors.description = 'Please enter a plate description'
  }
  return errors
}

export const editPlateValidations = values => {
  const errors = {}
  if (values.currentPlateName === undefined) {
    errors.currentPlateName = 'Please enter a plate name'
  }
  if (values.currentPlateDescription === undefined) {
    errors.currentPlateDescription = 'Please enter a plate description'
  }
  return errors
}
