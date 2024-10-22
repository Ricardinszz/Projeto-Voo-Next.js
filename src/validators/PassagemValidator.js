import * as Yup from 'yup';

const PassagemValidator = Yup.object().shape({
    voo: Yup.string().required('Voo é obrigatório'),
    passageiro: Yup.string().required('Passageiro é obrigatório'),
    assento: Yup.string().required('Assento é obrigatório'),
    preco: Yup.string()
        .required('Preço é obrigatório')
        .test('is-positive', 'O preço deve ser positivo', value => {
            const number = parseFloat(value.replace(/[^0-9.-]+/g, ""));
            return number > 0;
        })
        .matches(/^\$/, 'O preço deve começar com $'),
});

export default PassagemValidator;
