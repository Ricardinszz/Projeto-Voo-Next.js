'use client';

import Pagina from "@/app/components/Pagina";
import EmpresaValidator from "@/validators/EmpresaValidator";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";

export default function Page({ params }) {
    const route = useRouter();

    const empresas = JSON.parse(localStorage.getItem('empresas')) || [];
    const dados = empresas.find(item => item.id == params.id);
    const empresa = dados || { nome: '', logo: '', site: '' };

    function salvar(dados) {
        if (empresa.id) {
            Object.assign(empresa, dados);
        } else {
            dados.id = v4();
            empresas.push(dados);
        }

        localStorage.setItem('empresas', JSON.stringify(empresas));
        return route.push('/empresas');
    }

    return (
        <Pagina titulo="Empresa">
            <Formik
                initialValues={empresa}
                validationSchema={EmpresaValidator}
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                    touched,
                }) => {
                    return (
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
                                {touched.nome && errors.nome && (
                                    <div className="invalid-feedback d-block">
                                        {errors.nome}
                                    </div>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="logo">
                                <Form.Label>Logo</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="logo"
                                    value={values.logo}
                                    onChange={handleChange}
                                    isInvalid={touched.logo && !!errors.logo}
                                />
                                {touched.logo && errors.logo && (
                                    <div className="invalid-feedback d-block">
                                        {errors.logo}
                                    </div>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="site">
                                <Form.Label>Site</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="site"
                                    value={values.site}
                                    onChange={handleChange}
                                    isInvalid={touched.site && !!errors.site}
                                />
                                {touched.site && errors.site && (
                                    <div className="invalid-feedback d-block">
                                        {errors.site}
                                    </div>
                                )}
                            </Form.Group>
                            <div className="text-center">
                                <Button type="submit" variant="success">
                                    <FaCheck /> Salvar
                                </Button>
                                <Link href="/empresas" className="btn btn-danger ms-2">
                                    <MdOutlineArrowBack /> Voltar
                                </Link>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </Pagina>
    );
}
