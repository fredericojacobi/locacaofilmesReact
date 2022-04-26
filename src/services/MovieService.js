import http from "../http-common";

const getAll = () => {
    return http.get("/movie/Consultar");
};

const get = id => {
    return http.get(`/movie/Consultar/${id}`);
};

const getByTitle = title => {
    return http.get(`/movie/Consultar?title=${title}`);
};

const create = data => {
    return http.post("/movie/Cadastrar", data);
};

const update = data => {
    return http.put("/movie/Atualizar", data);
};

const remove = id => {
    return http.delete(`/movie/Excluir/${id}`);
};

const MovieService = {
    getAll,
    get,
    getByTitle,
    create,
    update,
    remove
};

export default MovieService;
