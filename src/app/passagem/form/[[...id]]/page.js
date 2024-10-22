'use client';

import Pagina from "@/app/components/Pagina";
import Link from "next/link";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { v4 } from "uuid";
import PassagemValidator from "@/validators/PassagemValidator";
import { mask } from "remask";

export default function FormPassagem({ params }) {
    const route = useRouter();

    const passagens = JSON.parse(localStorage.getItem('passagens')) || [];
    const dados = passagens.find(item => item.id == params.id);
    const passagem = dados || { voo: '', passageiro: '', assento: '', preco: '' };

    function salvar(dados) {
        if (passagem.id) {
            Object.assign(passagem, dados); 
        } else {
            dados.id = v4(); 
            passagens.push(dados);
        }
        localStorage.setItem('passagens', JSON.stringify(passagens));
        route.push('/passagem');
    }

    function handlePrecoChange(e, setFieldValue) {
        const { value } = e.target;
        const maskedValue = mask(value, '$999,999.99');
        setFieldValue('preco', maskedValue);
    }

    return (
        <Pagina titulo="Passagem">
            <Formik
                initialValues={passagem}
                validationSchema={PassagemValidator}
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
                        <Form.Group className="mb-3" controlId="voo">
                            <Form.Label>Voo</Form.Label>
                            <Form.Control
                                type="text"
                                name="voo"
                                value={values.voo}
                                onChange={handleChange}
                                isInvalid={touched.voo && !!errors.voo}
                            />
                            <div className="invalid-feedback d-block">
                                {errors.voo}
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="passageiro">
                            <Form.Label>Passageiro</Form.Label>
                            <Form.Control
                                type="text"
                                name="passageiro"
                                value={values.passageiro}
                                onChange={handleChange}
                                isInvalid={touched.passageiro && !!errors.passageiro}
                            />
                            <div className="invalid-feedback d-block">
                                {errors.passageiro}
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="assento">
                            <Form.Label>Assento</Form.Label>
                            <Form.Control
                                type="text"
                                name="assento"
                                value={values.assento}
                                onChange={handleChange}
                                isInvalid={touched.assento && !!errors.assento}
                            />
                            <div className="invalid-feedback d-block">
                                {errors.assento}
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="preco">
                            <Form.Label>Preço</Form.Label>
                            <Form.Control
                                type="text"
                                name="preco"
                                value={values.preco}
                                onChange={(e) => handlePrecoChange(e, setFieldValue)}
                                isInvalid={touched.preco && !!errors.preco}
                            />
                            <div className="invalid-feedback d-block">
                                {errors.preco}
                            </div>
                        </Form.Group>

                        <div className="text-center">
                            <Button variant="success" type="submit">
                                <FaCheck /> Salvar
                            </Button>
                            <Link href="/passagem" className="btn btn-danger ms-1">
                                Voltar
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </Pagina>
    );
}
