import React, {useEffect, useState} from "react";
import MovieDataService from "../services/MovieService";
import {BUTTON_CREATE_TEXT, BUTTON_RESET_TEXT, BUTTON_UPDATE_TEXT} from "../generics/constants/buttonText";
import {MOVIE_LABEL_MPR, MOVIE_LABEL_RELEASE, MOVIE_LABEL_TITLE} from "../generics/constants/movie";
import {notification, Button, Checkbox, Form, Input, Space, Spin, Radio} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import {
    MPR_GENERAL, MPR_NO_ONE_UNDER_17,
    MPR_PARENTAL_GUIDANCE,
    MPR_PARENTAL_GUIDANCE_UNDER_13, MPR_RESTRICTED
} from "../generics/constants/motionPictureRating";
import {onError, openSuccessNotification} from "../generics/functions/notifications";

let validationMessage = "Este campo é obrigatório";

const AddMovie = () => {
    const initialMovieState = {
        id: null,
        title: "",
        motionPictureRating: "",
        release: false
    };

    const {id} = useParams();
    const [movie, setMovie] = useState(initialMovieState);
    const [submitted, setSubmitted] = useState(false);
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const onReset = () => {
        form.resetFields();
    }

    const onFinish = (movie) => {
        setVisible(true);
        var data = {
            title: movie.title,
            motionPictureRating: movie.motionPictureRating,
            release: movie.release
        };
        if (id) {
            data.id = id;
            MovieDataService.update(data)
                .then(response => {
                    setMovie({
                        id: response.data.id,
                        title: response.data.title,
                        motionPictureRating: response.data.motionPictureRating,
                        release: response.data.release
                    });
                    openSuccessNotification('top', 'Filme', 'atualizado')
                    setVisible(false);
                    setSubmitted(true);
                    navigate('/movies')
                })
                .catch(error => {
                    onError()
                });
        } else {
            MovieDataService.create(data)
                .then(response => {
                    setMovie({
                        id: response.data.id,
                        title: response.data.title,
                        motionPictureRating: response.data.motionPictureRating,
                        release: response.data.release
                    });
                    openSuccessNotification('top', 'Filme', 'cadastrado')
                    setVisible(false);
                    setSubmitted(true);
                    navigate('/movies')
                })
                .catch(error => {
                    onError()
                });
        }
        onReset();
    };

    function getMovie(id) {
        setVisible(true);
        MovieDataService.get(id)
            .then(response => {
                form.setFieldsValue({
                        id: response.data.records[0].id,
                        title: response.data.records[0].title,
                        motionPictureRating: response.data.records[0].motionPictureRating,
                        release: response.data.records[0].release
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
            getMovie(id);
        else
            onReset();
    }, [id]);

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
                <Form.Item name="title" label={MOVIE_LABEL_TITLE}
                           rules={[{required: true, message: validationMessage}]}>
                    <Input/>
                </Form.Item>
                <Form.Item name="motionPictureRating" label={MOVIE_LABEL_MPR}
                           rules={[{required: true, message: validationMessage}]}>
                    <Radio.Group>
                        <Space direction="vertical" style={{paddingTop: 5}}>
                            <Radio value={0}>{MPR_GENERAL}</Radio>
                            <Radio value={1}>{MPR_PARENTAL_GUIDANCE}</Radio>
                            <Radio value={2}>{MPR_PARENTAL_GUIDANCE_UNDER_13}</Radio>
                            <Radio value={3}>{MPR_RESTRICTED}</Radio>
                            <Radio value={4}>{MPR_NO_ONE_UNDER_17}</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    id="release"
                    name="release"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>
                        {MOVIE_LABEL_RELEASE}
                    </Checkbox>
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

export default AddMovie;
