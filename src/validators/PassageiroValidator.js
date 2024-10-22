import * as Yup from 'yup';

const PassageiroValidator = Yup.object().shape({
    nome: Yup.string().required('Nome é obrigatório'),
    tipo_documento: Yup.string().required('Tipo de documento é obrigatório'),
    documento: Yup.string().required('Documento é obrigatório'),
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    telefone: Yup.string().required('Telefone é obrigatório'),
    data_nascimento: Yup.date().required('Data de nascimento é obrigatória'),
});

export default PassageiroValidator;
