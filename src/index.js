const express = require("express");
require("dotenv").config();
const {criarTabelaPessoa,buscarPessoas, inserirPessoa, alterarPessoa, deletarPessoa} = require("./controllers/Pessoa");
const app = express();

app.use(express.json());

criarTabelaPessoa();

//todos os usuarios
app.get("/usuarios",  async (req, res) => {
    let pessoas = await buscarPessoas();
    return res.status(201).json(pessoas);
}
);

//usuario por id
app.get("/usuario/:id", async (req, res) => {
    let pessoas = await buscarPessoas();
    let pessoa = pessoas.find(pessoa => pessoa.id === Number(req.params.id));
    return res.status(201).json(pessoa);
 }
);

//criar usuario
app.post("/usuario", (req, res) => {
    inserirPessoa(req.body);
    res.status(201).json({
        message: "Usuário inserido com sucesso"
    });
});

//modificar usuario
app.put("/usuario/:id", (req, res) => {
    let {id} = req.params;
    alterarPessoa(req.body, req.params.id);
    res.status(200).json({
        message: "Usuário alterado com sucesso"
    });
    }
);

//deletar usuario
app.delete("/usuario/:id", (req, res) => {
    let {id} = req.params;
    deletarPessoa(id);
    res.status(200).json({
        message: "Usuário deletado com sucesso"
    });
    }
);




// configuração do servidor
app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
    }
);
