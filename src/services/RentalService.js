import http from "../http-common";

const getAll = () => {
    return http.get("/rental/Consultar");
};

const get = id => {
    return http.get(`/rental/Consultar/${id}`);
};

const newPage = id => {
    return http.get(`/rental/new/`);
};

const create = data => {
    return http.post("/rental/Cadastrar", data);
};

const update = data => {
    return http.put("/rental/Atualizar", data);
};

const remove = id => {
    return http.delete(`/rental/Excluir/${id}`);
};

const RentalService = {
    getAll,
    get,
    newPage,
    create,
    update,
    remove
};

export default RentalService;
