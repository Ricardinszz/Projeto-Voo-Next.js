import * as Yup from 'yup';

const AeroportoValidator = Yup.object().shape({
    nome: Yup.string()
    .min(2, 'O minímo de caracteres é 3')
    .max(50, 'O máximo de caracteres é 50')
    .required('Campo Obrigatorio'),
});

export default AeroportoValidator;
