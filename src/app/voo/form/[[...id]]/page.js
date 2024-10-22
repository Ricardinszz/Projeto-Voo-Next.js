'use client';

import Pagina from "@/app/components/Pagina";
import Link from "next/link";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { v4 } from "uuid";
import { useEffect, useState } from "react";
import VooValidator from "@/validators/VooValidator";
import { mask } from "remask";

export default function FormVoo({ params }) {
    const route = useRouter();
    const [empresas, setEmpresas] = useState([]);
    const [aeroportos, setAeroportos] = useState([]);

    useEffect(() => {
        setEmpresas(JSON.parse(localStorage.getItem('empresas')) || []);
        setAeroportos(JSON.parse(localStorage.getItem('aeroportos')) || []);
    }, []);

    const voos = JSON.parse(localStorage.getItem('voos')) || [];
    const dados = voos.find(item => item.id == params.id);
    const voo = dados || { identificador: '', data_embarque: '', data_checkin: '', origem: '', destino: '', empresa: '', preco: '' };

    function salvar(dados) {
        if (voo.id) {
            Object.assign(voo, dados); 
        } else {
            dados.id = v4(); 
            voos.push(dados);
        }
        localStorage.setItem('voos', JSON.stringify(voos));
        route.push('/voo');
    }

    function handlePrecoChange(e, setFieldValue) {
        const { value } = e.target;
        const maskedValue = mask(value, '$999,999.99');
        setFieldValue('preco', maskedValue);
    }

    return (
        <Pagina titulo="Voo">
            <Formik
                initialValues={voo}
                validationSchema={VooValidator}
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
                        <Form.Group className="mb-3" controlId="identificador">
                            <Form.Label>Identificador</Form.Label>
                            <Form.Control
                                type="text"
                                name="identificador"
                                value={values.identificador}
                                onChange={handleChange}
                                isInvalid={touched.identificador && !!errors.identificador}
                            />
                            <div className="invalid-feedback d-block">
                                {errors.identificador}
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="data_embarque">
                            <Form.Label>Data de Embarque</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="data_embarque"
                                value={values.data_embarque}
                                onChange={handleChange}
                                isInvalid={touched.data_embarque && !!errors.data_embarque}
                            />
                            <div className="invalid-feedback d-block">
                                {errors.data_embarque}
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="data_checkin">
                            <Form.Label>Data de Check-in</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="data_checkin"
                                value={values.data_checkin}
                                onChange={handleChange}
                                isInvalid={touched.data_checkin && !!errors.data_checkin}
                            />
                            <div className="invalid-feedback d-block">
                                {errors.data_checkin}
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="origem">
                            <Form.Label>Origem</Form.Label>
                            <Form.Control
                                as="select"
                                name="origem"
                                value={values.origem}
                                onChange={handleChange}
                                isInvalid={touched.origem && !!errors.origem}
                            >
                                <option value="">Selecione um aeroporto</option>
                                {aeroportos.map(aeroporto => (
                                    <option key={aeroporto.id} value={aeroporto.nome}>
                                        {aeroporto.nome}
                                    </option>
                                ))}
                            </Form.Control>
                            <div className="invalid-feedback d-block">
                                {errors.origem}
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="destino">
                            <Form.Label>Destino</Form.Label>
                            <Form.Control
                                as="select"
                                name="destino"
                                value={values.destino}
                                onChange={handleChange}
                                isInvalid={touched.destino && !!errors.destino}
                            >
                                <option value="">Selecione um aeroporto</option>
                                {aeroportos.map(aeroporto => (
                                    <option key={aeroporto.id} value={aeroporto.nome}>
                                        {aeroporto.nome}
                                    </option>
                                ))}
                            </Form.Control>
                            <div className="invalid-feedback d-block">
                                {errors.destino}
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="empresa">
                            <Form.Label>Empresa</Form.Label>
                            <Form.Control
                                as="select"
                                name="empresa"
                                value={values.empresa}
                                onChange={handleChange}
                                isInvalid={touched.empresa && !!errors.empresa}
                            >
                                <option value="">Selecione uma empresa</option>
                                {empresas.map(empresa => (
                                    <option key={empresa.id} value={empresa.nome}>
                                        {empresa.nome}
                                    </option>
                                ))}
                            </Form.Control>
                            <div className="invalid-feedback d-block">
                                {errors.empresa}
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
                            <Link href="/voo" className="btn btn-danger ms-1">
                                Voltar
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </Pagina>
    );
}
