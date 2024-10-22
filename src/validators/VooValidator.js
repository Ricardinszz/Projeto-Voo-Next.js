import * as Yup from 'yup';

const VooValidator = Yup.object().shape({
    identificador: Yup.string().required('Identificador é obrigatório'),
    data_embarque: Yup.date().required('Data de embarque é obrigatória'),
    data_checkin: Yup.date().required('Data de check-in é obrigatória'),
    origem: Yup.string().required('Origem é obrigatória'),
    destino: Yup.string().required('Destino é obrigatória'),
    empresa: Yup.string().required('Empresa é obrigatória'),
    preco: Yup.string()
        .required('Preço é obrigatório')
        .test('is-positive', 'O preço deve ser positivo', value => {
            const number = parseFloat(value.replace(/[^0-9.-]+/g, ""));
            return number > 0;
        })
        .matches(/^\$/, 'O preço deve começar com $'),
});

export default VooValidator;
