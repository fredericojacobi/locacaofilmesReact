import React, {useEffect, useState} from "react";
import ClientDataService from "../services/ClientService";
import {BUTTON_CREATE_TEXT, BUTTON_RESET_TEXT, BUTTON_UPDATE_TEXT} from "../generics/constants/buttonText";
import {notification, Button, Form, Input, Space, Spin, DatePicker} from "antd";
import {CLIENT_LABEL_BIRTHDAY, CLIENT_LABEL_CPF, CLIENT_LABEL_NAME} from "../generics/constants/client";
import {MESSAGE_CLIENT_INVALID_CPF} from "../generics/constants/message";
import {useNavigate, useParams} from "react-router-dom";
import moment from "moment";
import {onError, openSuccessNotification} from "../generics/functions/notifications";

let validationMessage = "Este campo é obrigatório";

const AddClient = () => {
    const initialClientState = {
        id: null,
        name: "",
        cpf: "",
        birthday: ""
    };

    const {id} = useParams();
    const [client, setClient] = useState(initialClientState);
    const [submitted, setSubmitted] = useState(false);
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const onReset = () => {
        form.resetFields();
    }

    const onFinish = client => {
        setVisible(true);
        var data = {
            name: client.name,
            cpf: client.cpf,
            birthday: client.birthday
        };
        if (id) {
            data.id = id;
            ClientDataService.update(data)
                .then(response => {
                    setClient({
                        id: response.data.id,
                        name: response.data.name,
                        cpf: response.data.cpf,
                        birthday: response.data.birthday
                    });
                    openSuccessNotification('top', 'Cliente', 'cadastrado')
                    setVisible(false);
                    setSubmitted(true);
                    navigate('/clients')
                })
                .catch(error => {
                    onError()
                });
        } else {
            ClientDataService.create(data)
                .then(response => {
                    setClient({
                        id: response.data.id,
                        name: response.data.name,
                        cpf: response.data.cpf,
                        birthday: response.data.birthday
                    });
                    openSuccessNotification('top', 'Cliente', 'cadastrado')
                    setVisible(false);
                    setSubmitted(true);
                    navigate('/clients')
                })
                .catch(error => {
                    onError()
                });
        }
        onReset();
    };

    function getClient(id) {
        setVisible(true);
        ClientDataService.get(id)
            .then(response => {
                form.setFieldsValue({
                        id: response.data.records[0].id,
                        name: response.data.records[0].name,
                        cpf: response.data.records[0].cpf,
                        birthday: moment(response.data.records[0].birthday, "dd/MM/yyyy")
                    }
                )
                setVisible(false);
            })
            .catch(e => {
                onError()
            });
    }

    useEffect(() => {
        if (id)
            getClient(id);
        else
            onReset();
    }, [id]);

    const cpfValidationRule = [
        {
            required: true, message: validationMessage
        },
        {
            pattern: /\d{3}\.?\d{3}\.?\d{3}-?\d{2}/,
            message: MESSAGE_CLIENT_INVALID_CPF
        }
    ];

    const birthdayFormat = ['DD/MM/YYYY', 'DD/MM/YY'];


    return (
        <Spin tip="Aguarde..." spinning={visible}>
            <Form
                name="control-hooks"
                labelCol={{span: 8}}
                wrapperCol={{span: 8}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onError}
                autoComplete="off"
                form={form}
            >
                <Form.Item
                    name="name"
                    label={CLIENT_LABEL_NAME}
                    rules={[{required: true, message: validationMessage}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="cpf"
                    label={CLIENT_LABEL_CPF}
                    rules={cpfValidationRule}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    id="birthday"
                    name="birthday"
                    label={CLIENT_LABEL_BIRTHDAY}
                    rules={[{required: true, message: validationMessage}]}
                    defaultValue={moment(client.birthday, "dd/MM/yyyy")}
                    wrapperCol={{}}
                >
                    <DatePicker
                        placeholder="Nascimento"
                        format={birthdayFormat}
                    />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Space size={10}>
                        <Button type="primary" htmlType="submit">
                            {id ? BUTTON_UPDATE_TEXT : BUTTON_CREATE_TEXT}
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            {BUTTON_RESET_TEXT}
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Spin>
    );
};

export default AddClient;
