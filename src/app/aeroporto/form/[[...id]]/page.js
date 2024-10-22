'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { v4 } from "uuid";
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import Link from "next/link";
import Pagina from "@/app/components/Pagina";
import apiLocalidade from "@/services/apiLocalidade";
import AeroportoValidator from "@/validators/AeroportoValidator";

export default function FormAeroporto({ params }) {
    const route = useRouter();

    const aeroportos = JSON.parse(localStorage.getItem('aeroportos')) || [];
    const dados = aeroportos.find(item => item.id == params.id);
    const aeroporto = dados || { nome: '', siglas: '', pais: 'Brasil', uf: '', cidades: '' };

    const [paises, setPaises] = useState([]);
    const [ufs, setUfs] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [camposBrasil, setCamposBrasil] = useState(true);

    useEffect(() => {
        apiLocalidade.get('paises').then(resultado => {
            setPaises(resultado.data);
        });

        apiLocalidade.get('estados?orderBy=nome').then(resultado => {
            setUfs(resultado.data);
        });
    }, []);

    useEffect(() => {
        if (aeroporto.uf) {
            apiLocalidade.get(`municipios?uf=${aeroporto.uf}`).then(resultado => {
                setCidades(resultado.data);
            });
        }
    }, [aeroporto.uf]);

    function salvar(dados) {
        if (aeroporto.id) {
            Object.assign(aeroporto, dados);
        } else {
            dados.id = v4();
            aeroportos.push(dados);
        }
        localStorage.setItem('aeroportos', JSON.stringify(aeroportos));
        route.push('/aeroporto');
    }

    return (
        <Pagina titulo="Aeroporto">
            <Formik
                initialValues={aeroporto}
                validationSchema={AeroportoValidator}
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                }) => {

                    useEffect(() => {
                        if (values.pais === 'Brasil') {
                            setCamposBrasil(true);
                            apiLocalidade.get('estados?orderBy=nome').then(resultado => {
                                setUfs(resultado.data);
                            });
                        } else {
                            setCamposBrasil(false);
                            setUfs([]);
                            setCidades([]);
                        }
                    }, [values.pais]);

                    useEffect(() => {
                        if (values.uf) {
                            apiLocalidade.get(`estados/${values.uf}/municipios`).then(resultado => {
                                setCidades(resultado.data);
                            });
                        } else {
                            setCidades([]);
                        }
                    }, [values.uf]);

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
                                <div className="invalid-feedback d-block">
                                    {errors.nome}
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="siglas">
                                <Form.Label>Siglas</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="siglas"
                                    value={values.siglas}
                                    onChange={handleChange}
                                    isInvalid={touched.siglas && !!errors.siglas}
                                />
                                <div className="invalid-feedback d-block">
                                    {errors.siglas}
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="pais">
                                <Form.Label>Pais</Form.Label>
                                <Form.Select
                                    name="pais"
                                    value={values.pais}
                                    onChange={e => {
                                        handleChange(e);
                                        setFieldValue('uf', '');
                                        setFieldValue('cidades', '');
                                    }}
                                    isInvalid={touched.pais && !!errors.pais}
                                    style={{ overflow: 'auto', maxHeight: '200px' }}
                                >
                                    <option value="">Selecione um país</option>
                                    {paises.map(pais => (
                                        <option key={pais.id} value={pais.nome}>
                                            {pais.nome}
                                        </option>
                                    ))}
                                </Form.Select>
                                <div className="invalid-feedback d-block">
                                    {errors.pais}
                                </div>
                            </Form.Group>
                            {camposBrasil && (
                                <>
                                    <Form.Group className="mb-3" controlId="uf">
                                        <Form.Label>UF</Form.Label>
                                        <Form.Select
                                            name="uf"
                                            value={values.uf}
                                            onChange={e => {
                                                handleChange(e);
                                                setFieldValue('cidades', '');
                                            }}
                                            isInvalid={touched.uf && !!errors.uf}
                                            style={{ overflow: 'auto', maxHeight: '200px' }}
                                        >
                                            <option value="">Selecione uma UF</option>
                                            {ufs.map(uf => (
                                                <option key={uf.id} value={uf.sigla}>
                                                    {uf.sigla} - {uf.nome}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        <div className="invalid-feedback d-block">
                                            {errors.uf}
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="cidade">
                                        <Form.Label>Cidade</Form.Label>
                                        <Form.Select
                                            name="cidades"
                                            value={values.cidades}
                                            onChange={handleChange}
                                            isInvalid={touched.cidades && !!errors.cidades}
                                            style={{ overflow: 'auto', maxHeight: '200px' }}
                                        >
                                            <option value="">Selecione uma cidade</option>
                                            {cidades.map(cidade => (
                                                <option key={cidade.id} value={cidade.nome}>
                                                    {cidade.nome}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        <div className="invalid-feedback d-block">
                                            {errors.cidades}
                                        </div>
                                    </Form.Group>
                                </>
                            )}
                            <div className="text-center">
                                <Button variant="success" type="submit">
                                    <FaCheck /> Salvar
                                </Button>
                                <Link href="/aeroporto" className="btn btn-danger ms-1">
                                    Voltar
                                </Link>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </Pagina>
    );
}
