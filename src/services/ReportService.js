import http from "../http-common";

const getOverdueClients = () => {
    return http.get("/rentalReport/Cliente/Atraso");
};

const getHighestMoviesRentedClient = () => {
    return http.get("/rentalReport/Cliente/MaisAlugou/2");
};

const getNeverRentedMovies = () => {
    return http.get("/rentalReport/Filmes/NuncaAlugados");
};

const getMostRentedMoviesLastYear = () => {
    return http.get("/rentalReport/Filmes/MaisAlugados/5");
};

const getLessRentedMoviesLastWeek = () => {
    return http.get("/rentalReport/Filmes/MenosAlugados/3");
};

const ReportService = {
    getOverdueClients,
    getHighestMoviesRentedClient,
    getNeverRentedMovies,
    getMostRentedMoviesLastYear,
    getLessRentedMoviesLastWeek
};

export default ReportService;
