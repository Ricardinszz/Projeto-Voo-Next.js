'use client';

import Link from "next/link";
import { Table } from "react-bootstrap";
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagina from "../components/Pagina";
import { useEffect, useState } from "react";

export default function Page() {
    const [passageiros, setPassageiros] = useState([]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedPassageiros = JSON.parse(localStorage.getItem('passageiros')) || [];
            setPassageiros(storedPassageiros);
        }
    }, []);

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dados = passageiros.filter(item => item.id !== id);
            localStorage.setItem('passageiros', JSON.stringify(dados));
            setPassageiros(dados);
        }
    }

    return (
        <Pagina titulo="Passageiros">
            <Link href="/passageiro/form" className="btn btn-primary mb-3">
                <FaPlusCircle /> Novo
            </Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Ações</th>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Tipo de Documento</th>
                        <th>Documento</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Data de Nascimento</th>
                    </tr>
                </thead>
                <tbody>
                    {passageiros.map((item, index) => (
                        <tr key={item.id}>
                            <td>
                                <Link href={`/passageiro/form/${item.id}`}>
                                    <FaRegEdit title="Editar" className="text-primary" />
                                </Link>
                                <MdDelete
                                    title="Excluir"
                                    className="text-danger"
                                    onClick={() => excluir(item.id)}
                                />
                            </td>
                            <td>{index + 1}</td>
                            <td>{item.nome}</td>
                            <td>{item.tipo_documento}</td>
                            <td>{item.documento}</td>
                            <td>{item.email}</td>
                            <td>{item.telefone}</td>
                            <td>{item.data_nascimento}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Pagina>
    );
}
