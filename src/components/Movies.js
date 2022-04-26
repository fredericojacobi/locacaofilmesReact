import React, {useState, useEffect} from "react";
import MovieDataService from "../services/MovieService";
import {Link} from "react-router-dom";
import {BUTTON_DELETE_TEXT, BUTTON_UPDATE_TEXT} from "../generics/constants/buttonText";
import {MOVIE_LABEL_MPR, MOVIE_LABEL_RELEASE, MOVIE_LABEL_TITLE} from "../generics/constants/movie";
import {Button, Spin, Table, Tag} from "antd";

import Text from "antd/es/typography/Text";
import {motionPictureRating} from "../generics/constants/motionPictureRating";
import {onError, openSuccessNotification} from "../generics/functions/notifications";

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        retrieveMovies();
    }, []);

    const retrieveMovies = () => {
        setVisible(true);
        MovieDataService.getAll()
            .then(response => {
                setMovies(response.data.records);
                setVisible(false);
            })
            .catch(error => {
                onError(error);
            });
    };

    function deleteMovie(id) {
        setVisible(true);
        MovieDataService.remove(id)
            .then(response => {
                retrieveMovies();
                setVisible(false);
                openSuccessNotification('top', 'Filme', 'excluído')
            })
            .catch(error => {
                onError(error);
            });
    }


    const columns = [
        {
            title: MOVIE_LABEL_TITLE,
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: MOVIE_LABEL_MPR,
            key: 'motionPictureRating',
            render: record => {
                return (
                    <Text>{motionPictureRating[record.motionPictureRating].name}</Text>
                )
            }
        },
        {
            title: MOVIE_LABEL_RELEASE,
            key: 'release',
            render: record => {
                return (
                    <Text>{record.release ? "Sim" : "Não"}</Text>
                )
            }
        },
        {
            title: 'Ação',
            key: 'action',
            render: record => {
                return (
                    <>
                        <Link to={"/movies/" + record.id}>
                            <Tag color="green">{BUTTON_UPDATE_TEXT}</Tag>
                        </Link>
                        <Button onClick={() => deleteMovie(record.id)} style={{border: 0, padding: 0, margin: 0}}>
                            <Tag color="red">{BUTTON_DELETE_TEXT}</Tag>
                        </Button>
                    </>
                )
            }
        }
    ]

    return (
        <Spin tip="Aguarde..." spinning={visible}>
            <Table dataSource={movies} columns={columns}>
            </Table>
            <Link to={"/movies/new"} className="ant-btn ant-btn-primary" style={{width: 80}}>Novo</Link>
        </Spin>
    );
};

export default Movies;
