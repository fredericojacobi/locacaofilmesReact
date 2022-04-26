import http from "../http-common";

const getAll = () => {
    return http.get("/client/Consultar");
};

const get = id => {
    return http.get(`/client/Consultar/${id}`);
};

const create = data => {
    return http.post("/client/Cadastrar", data);
};

const update = data => {
    return http.put("/client/Atualizar", data);
};

const remove = id => {
    return http.delete(`/client/Excluir/${id}`);
};

const ClientService = {
    getAll,
    get,
    create,
    update,
    remove
};

export default ClientService;
