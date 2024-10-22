import * as Yup from 'yup';

const EmpresaValidator = Yup.object().shape({
    nome: Yup.string()
    .min(2, 'O minímo de caracteres é 3')
    .max(50, 'O máximo de caracteres é 50')
    .required('Campo Obrigatorio'),
  logo: Yup.string(),
  site: Yup.string(),
});

export default EmpresaValidator
 