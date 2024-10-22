'use client';

import Pagina from "@/app/components/Pagina";
import Link from "next/link";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { v4 } from "uuid";
import PassageiroValidator from "@/validators/PassageiroValidator";
import { mask } from "remask";

export default function FormPassageiro({ params }) {
    const route = useRouter();

    const passageiros = JSON.parse(localStorage.getItem('passageiros')) || [];
    const dados = passageiros.find(item => item.id == params.id);
    const passageiro = dados || { nome: '', tipo_documento: '', documento: '', email: '', telefone: '', data_nascimento: '' };

    function salvar(dados) {
        if (passageiro.id) {
            Object.assign(passageiro, dados); 
        } else {
            dados.id = v4(); 
            passageiros.push(dados);
        }
        localStorage.setItem('passageiros', JSON.stringify(passageiros));
        route.push('/passageiro');
    }

    function handleDocumentoChange(e, setFieldValue, tipoDocumento) {
        const { value } = e.target;
        let maskedValue = value;

        switch (tipoDocumento) {
            case 'cpf':
                maskedValue = mask(value, '999.999.999-99');
                break;
            case 'rg':
                maskedValue = mask(value, '99.999.999-9');
                break;
            case 'certidao_nascimento':
                maskedValue = mask(value, '999999 99 99 9999 9 99999 999 9999999-99');
                break;
            case 'passaporte':
                maskedValue = value; 
                break;
            default:
                break;
        }

        setFieldValue('documento', maskedValue);
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    return (
        <Pagina titulo="Passageiro">
            <Formik
                initialValues={passageiro}
                validationSchema={PassageiroValidator}
                enableReinitialize
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="nome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                name="nome"
                                value={values.nome}
                                onChange={handleChange}
                                isInvalid={touched.nome && !!errors.nome}
                            />
                            <div className="invalid-feedback d-block">
                                {errors.nome}
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="tipo_documento">
                            <Form.Label>Tipo de Documento</Form.Label>
                            <Form.Select
                                name="tipo_documento"
                                value={values.tipo_documento}
                                onChange={handleChange}
                                isInvalid={touched.tipo_documento && !!errors.tipo_documento}
                            >
                                <option value="">Selecione</option>
                                <option value="cpf">CPF</option>
                                <option value="passaporte">Passaporte</option>
                                <option value="certidao_nascimento">Certidão de Nascimento</option>
                                <option value="rg">RG</option>
                            </Form.Select>
                            <div className="invalid-feedback d-block">
                                {errors.tipo_documento}
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="documento">
                            <Form.Label>Documento</Form.Label>
                            <Form.Control
                                type="text"
                                name="documento"
                                value={values.documento}
                                onChange={(e) => handleDocumentoChange(e, setFieldValue, values.tipo_documento)}
                                isInvalid={touched.documento && !!errors.documento}
                            />
                            <div className="invalid-feedback d-block">
                                {errors.documento}
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={(e) => {
                                    handleChange(e);
                                    if (!validateEmail(e.target.value)) {
                                        setFieldValue('email', e.target.value, false);
                                    }
                                }}
                                isInvalid={touched.email && !!errors.email}
                            />
                            <div className="invalid-feedback d-block">
                                {errors.email}
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="telefone">
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control
                                type="text"
                                name="telefone"
                                value={values.telefone}
                                onChange={(value) => { setFieldValue('telefone', mask(value.target.value, '(99) 99999-9999')) }}
                                isInvalid={touched.telefone && !!errors.telefone}
                            />
                            <div className="invalid-feedback d-block">
                                {errors.telefone}
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="data_nascimento">
                            <Form.Label>Data de Nascimento</Form.Label>
                            <Form.Control
                                type="date"
                                name="data_nascimento"
                                value={values.data_nascimento}
                                onChange={handleChange}
                                isInvalid={touched.data_nascimento && !!errors.data_nascimento}
                            />
                            <div className="invalid-feedback d-block">
                                {errors.data_nascimento}
                            </div>
                        </Form.Group>

                        <div className="text-center">
                            <Button variant="success" type="submit">
                                <FaCheck /> Salvar
                            </Button>
                            <Link href="/passageiro" className="btn btn-danger ms-1">
                                Voltar
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </Pagina>
    );
}
