import React, {useState, useEffect} from "react";
import RentalDataService from "../services/RentalService";
import {Link} from "react-router-dom";
import {BUTTON_DELETE_TEXT, BUTTON_UPDATE_TEXT} from "../generics/constants/buttonText";
import {Button, Spin, Table, Tag} from "antd";
import {
    RENTAL_LABEL_CLIENT_NAME,
    RENTAL_LABEL_MOVIE_TITLE,
    RENTAL_LABEL_RENT,
    RENTAL_LABEL_RETURN
} from "../generics/constants/rental";
import {onError, openSuccessNotification} from "../generics/functions/notifications";

const Rental = () => {
    const [rentals, setRentals] = useState([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        retrieveRentals();
    }, []);

    const retrieveRentals = () => {
        setVisible(true);
        RentalDataService.getAll()
            .then(response => {
                setRentals(response.data.records);
                setVisible(false);
            })
            .catch(error => {
                onError();
            });
    };

    function deleteClient(id) {
        setVisible(true);
        RentalDataService.remove(id)
            .then(response => {
                retrieveRentals();
                openSuccessNotification('top', 'Aluguel', 'excluído')
            })
            .catch(error => {
                onError(error);
            });
    }


    const columns = [
        {
            title: RENTAL_LABEL_CLIENT_NAME,
            dataIndex: 'clientName',
            key: 'client.Name',
        },
        {
            title: RENTAL_LABEL_MOVIE_TITLE,
            dataIndex: 'movieTitle',
            key: 'movie.Title',
        },
        {
            title: RENTAL_LABEL_RENT,
            key: 'rentDate',
            dataIndex: 'rentDate',
        },
        {
            title: RENTAL_LABEL_RETURN,
            key: 'returnDate',
            dataIndex: 'returnDate',
        },
        {
            title: 'Ação',
            key: 'action',
            render: record => {
                return (
                    <>
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
            <Table dataSource={rentals} columns={columns}>
            </Table>
            <Link to={"/rentals/new"} className="ant-btn ant-btn-primary" style={{width: 80}}>Novo</Link>
        </Spin>
    );
};

export default Rental;
