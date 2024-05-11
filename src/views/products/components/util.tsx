import * as yup from 'yup'

export const schema = yup.object().shape({
  name: yup.string().required(),
  lastName: yup.string().required(),
  phone: yup.string().required(),
  newPassword: yup.string(),
  confirmPassword: yup.string()
  .when('newPassword', {
    is: (val: string) => val && val.length > 0,
    then: (schema) => schema.oneOf([yup.ref('newPassword')], 'Passwords must match'),
  }),
})

export const defaultValues = {
  name: '',
  lastName: '',
  phone: '',
  newPassword: '',
  confirmPassword: ''
}
