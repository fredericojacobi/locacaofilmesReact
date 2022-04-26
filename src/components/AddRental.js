import React, {useEffect, useState} from "react";
import RentalDataService from "../services/RentalService";
import {BUTTON_CREATE_TEXT, BUTTON_RESET_TEXT, BUTTON_UPDATE_TEXT} from "../generics/constants/buttonText";
import {Button, Form, Select, Space, Spin} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import moment from "moment";
import {onError, openSuccessNotification} from "../generics/functions/notifications";
import {MOVIE_TITLE} from "../generics/constants/movie";
import {CLIENT_TITLE} from "../generics/constants/client";

let validationMessage = "Este campo é obrigatório";

const AddRental = () => {
    const initialRentalState = {
        id: null,
        clientName: "",
        movieTitle: "",
        rentDate: "",
        returnDate: ""
    };
    const [rental, setRental] = useState(initialRentalState);
    const [submitted, setSubmitted] = useState(false);
    const [movies, setMovies] = useState([]);
    const [clients, setClients] = useState([]);

    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    const onReset = () => {
        form.resetFields();
    }

    const onFinish = (rental) => {
        setVisible(true);
        var data = {
            clientId: rental.clients,
            movieId: rental.title,
            rentDate: new Date().toLocaleDateString(),
        };
        console.log(rental)
        RentalDataService.create(data)
            .then(response => {
                setRental({
                    id: response.data.id,
                    clientName: response.data.clientName,
                    movieTitle: response.data.movieTitle,
                    rentDate: response.data.rentDate
                });
                openSuccessNotification('top', 'Aluguel', 'cadastrado')
                setVisible(false);
                setSubmitted(true);
                navigate('/rentals')
            })
            .catch(error => {
                onError()
            });
        onReset();
    };

    const getRental = () => {
        setVisible(true);
        RentalDataService.newPage()
            .then(response => {
                form.setFieldsValue({
                        clientName: response.data.records[0].clientName,
                        movieTitle: response.data.records[0].movieTitle,
                        rentDate: moment(response.data.records[0].rentDate, "dd/MM/yyyy"),
                        returnDate: moment(response.data.records[0].returnDate, "dd/MM/yyyy"),
                        movies: response.data.records[0].movies,
                        clients: response.data.records[0].clients
                    }
                )
                setVisible(false);
                setMovies(form.getFieldValue("movies"))
                setClients(form.getFieldValue("clients"))
            })
            .catch(e => {
                onError()
            });
    }


    useEffect(() => {
        getRental()
    }, []);

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
                    name="title"
                    label={MOVIE_TITLE}
                >
                    <Select>
                        {movies.map((movie) => {
                            return <Select.Option
                                key={movie.id}
                                value={movie.id}
                            >
                                {movie.title}
                            </Select.Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="clients"
                    label={CLIENT_TITLE}
                >
                    <Select>
                        {clients.map((client) => {
                            return <Select.Option
                                key={client.id}
                                value={client.id}
                            >
                                {client.name}
                            </Select.Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}>
                    <Space size={10}>
                        <Button type="primary" htmlType="submit">
                            {BUTTON_CREATE_TEXT}
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

export default AddRental;