'use client';

import Link from "next/link";
import { Table } from "react-bootstrap";
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagina from "../components/Pagina";
import { useEffect, useState } from "react";

export default function Page() {
    const [passagens, setPassagens] = useState([]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedPassagens = JSON.parse(localStorage.getItem('passagens')) || [];
            setPassagens(storedPassagens);
        }
    }, []);

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dados = passagens.filter(item => item.id !== id);
            localStorage.setItem('passagens', JSON.stringify(dados));
            setPassagens(dados);
        }
    }

    return (
        <Pagina titulo="Passagens">
            <Link href="/passagem/form" className="btn btn-primary mb-3">
                <FaPlusCircle /> Novo
            </Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Ações</th>
                        <th>#</th>
                        <th>Voo</th>
                        <th>Passageiro</th>
                        <th>Assento</th>
                        <th>Preço</th>
                    </tr>
                </thead>
                <tbody>
                    {passagens.map((item, index) => (
                        <tr key={item.id}>
                            <td>
                                <Link href={`/passagem/form/${item.id}`}>
                                    <FaRegEdit title="Editar" className="text-primary" />
                                </Link>
                                <MdDelete
                                    title="Excluir"
                                    className="text-danger"
                                    onClick={() => excluir(item.id)}
                                />
                            </td>
                            <td>{index + 1}</td>
                            <td>{item.voo}</td>
                            <td>{item.passageiro}</td>
                            <td>{item.assento}</td>
                            <td>{item.preco}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Pagina>
    );
}
