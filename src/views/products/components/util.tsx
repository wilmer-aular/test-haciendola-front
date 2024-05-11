import * as yup from 'yup'

export const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  sku: yup.number().min(12).required(),
  grams:  yup.number().min(2).required(),
  stock:  yup.number().min(1).required(),
  price:  yup.number().min(2).required(),
  comparePrice:  yup.number().min(4).required(),
  barcode:  yup.number().min(14).required(),
})

export const defaultValues = {
  title: '',
  description: '',
  sku: null,
  grams: null,
  stock: null,
  price: null,
  comparePrice: null,
  barcode: null,
}
