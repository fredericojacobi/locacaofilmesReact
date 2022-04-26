import React, {useState, useEffect} from "react";
import ClientDataService from "../services/ClientService";
import {Link} from "react-router-dom";
import {BUTTON_DELETE_TEXT, BUTTON_UPDATE_TEXT} from "../generics/constants/buttonText";
import {
    CLIENT_LABEL_BIRTHDAY,
    CLIENT_LABEL_CPF,
    CLIENT_LABEL_NAME,
} from "../generics/constants/client";
import {Button, Spin, Table, Tag} from "antd";
import {onError, openSuccessNotification} from "../generics/functions/notifications";

const Client = () => {
    const [clients, setClients] = useState([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        retrieveClients();
    }, []);

    const retrieveClients = () => {
        setVisible(true);
        ClientDataService.getAll()
            .then(response => {
                setClients(response.data.records);
                setVisible(false);
            })
            .catch(error => {
                onError(error);
            });
    };

    function deleteClient(id) {
        setVisible(true);
        ClientDataService.remove(id)
            .then(response => {
                retrieveClients();
                openSuccessNotification('top', 'Cliente', 'excluído')
            })
            .catch(error => {
                onError(error);
            });
    }


    const columns = [
        {
            title: CLIENT_LABEL_NAME,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: CLIENT_LABEL_CPF,
            dataIndex: 'cpf',
            key: 'cpf',
        },
        {
            title: CLIENT_LABEL_BIRTHDAY,
            key: 'birthday',
            dataIndex: 'birthday',
        },
        {
            title: 'Ação',
            key: 'action',
            render: record => {
                return (
                    <>
                        <Link to={"/clients/" + record.id}>
                            <Tag color="green">{BUTTON_UPDATE_TEXT}</Tag>
                        </Link>
                        <Button onClick={() => deleteClient(record.id)} style={{border: 0, padding: 0, margin: 0}}>
                            <Tag color="red">{BUTTON_DELETE_TEXT}</Tag>
                        </Button>
                    </>
                )
            }
        }
    ]

    return (
        <Spin tip="Aguarde..." spinning={visible}>
            <Table dataSource={clients} columns={columns}>
            </Table>
            <Link to={"/clients/new"} className="ant-btn ant-btn-primary" style={{width: 80}}>Novo</Link>
        </Spin>
    );
};

export default Client;
