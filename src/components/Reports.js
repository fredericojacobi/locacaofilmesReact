import React, {useEffect, useState} from "react";
import ReportDataService from "../services/ReportService";
import {onError} from "../generics/functions/notifications";
import {Button, Card, Col, Row, Spin, Statistic} from "antd";
import Meta from "antd/es/card/Meta";

const Report = () => {
    const [rentals, setRentals] = useState([]);
    const [overdues, setOverdue] = useState([]);
    const [highestMoviesRentedClient, setHighestMoviesRentedClient] = useState([]);
    const [neverRentedMovies, setNeverRentedMovies] = useState([]);
    const [mostRentedMoviesLastYear, setMostRentedMoviesLastYear] = useState([]);
    const [lessRentedMoviesLastWeek, setLessRentedMoviesLastWeek] = useState([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
        retrieveOverdueClients();
        retrieveNeverRentedMovies();
        retrieveMostRentedMoviesLastYear();
        retrieveHighestMoviesRentedClient();
        retrieveLessRentedMoviesLastWeek();
    }, []);

    const retrieveOverdueClients = () => {
        ReportDataService.getOverdueClients()
            .then(response => {
                setOverdue(response.data.records);
            })
            .catch(error => {
                onError();
            });
    };

    const retrieveHighestMoviesRentedClient = () => {
        ReportDataService.getHighestMoviesRentedClient()
            .then(response => {
                setHighestMoviesRentedClient(response.data.records);
            })
            .catch(error => {
                onError();
            });
    };

    const retrieveNeverRentedMovies = () => {
        ReportDataService.getNeverRentedMovies()
            .then(response => {
                setNeverRentedMovies(response.data.records);
            })
            .catch(error => {
                onError();
            });
    };

    const retrieveMostRentedMoviesLastYear = () => {
        ReportDataService.getMostRentedMoviesLastYear()
            .then(response => {
                setMostRentedMoviesLastYear(response.data.records);
            })
            .catch(error => {
                onError();
            });
    };

    const retrieveLessRentedMoviesLastWeek = () => {
        ReportDataService.getLessRentedMoviesLastWeek()
            .then(response => {
                setLessRentedMoviesLastWeek(response.data.records);
                setVisible(false);
            })
            .catch(error => {
                onError();
            });
    };


    return (
        <Row gutter={16}>
            <Col span={12}>
                <Card style={{width: 450, marginTop: 16}} loading={visible}>
                    <Meta
                        title="Clientes em atraso na devolução"
                    />
                    <br/>
                    {overdues.length > 0 ?
                        overdues.map((client) => {
                            return <p>{client.client.name}</p>
                        })
                        :
                        "Nenhum cliente possui atraso na devolução"
                    }
                </Card>
            </Col>
            <Col span={12}>
                <Card style={{width: 450, marginTop: 16}} loading={visible}>
                    <Meta
                        title="Filmes que nunca foram alugados"
                    />
                    <br/>
                    {neverRentedMovies.length > 0 ?
                        neverRentedMovies.map((movie) => {
                            return <p>{movie.title}</p>
                        }) :
                        "Todos os filmes já foram alugados"
                    }

                </Card>
            </Col>
            <Col span={12}>
                <Card style={{width: 450, marginTop: 16}} loading={visible}>
                    <Meta
                        title="Cinco filmes mais alugados do último ano"
                    />
                    <br/>
                    {mostRentedMoviesLastYear.map((movie) => {
                        return <p>{movie.movie.title} com {movie.numberOfRentals} {movie.numberOfRentals > 1 ? "aluguéis" : "aluguel"} em {movie.position}° lugar</p>
                    })}
                </Card>
            </Col>
            <Col span={12}>
                <Card style={{width: 450, marginTop: 16}} loading={visible}>
                    <Meta
                        title="Três filmes menos alugados da última semana"
                    />
                    <br/>
                    {lessRentedMoviesLastWeek.map((movie) => {
                        return <p>{movie.movie.title} com {movie.numberOfRentals} {movie.numberOfRentals > 1 ? "aluguéis" : "aluguel"} em {movie.position}° lugar</p>
                    })}
                </Card>
            </Col>
            <Col span={12}>
                <Card style={{width: 450, marginTop: 16}} loading={visible}>
                    <Meta
                        title="Segundo cliente que mais alugou filmes"
                    />
                    <br/>
                    {highestMoviesRentedClient.map((client) => {
                        return <p>{client.client.name} com {client.numberOfRentals} {client.numberOfRentals > 1 ? "aluguéis" : "aluguel"}</p>
                    })}
                </Card>
            </Col>

        </Row>
    );
};

export default Report;
