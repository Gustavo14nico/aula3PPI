import express from "express";

const app = express();
const port = 3000;
const host = "localhost";

let listaMedicamentos = [];

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Cadastro de Medicamentos</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <style>
        body { background-color: #fff0f0; min-height: 100vh; display:flex; align-items:center; justify-content:center; }
        .card { border: 2px solid #ff4d4d; border-radius:1rem; box-shadow:0 0 15px rgba(255,0,0,0.15); transition:transform 0.2s; }
        .card:hover { transform: scale(1.02); }
        h2 { color:#b30000; font-weight:700; }
        .form-label { font-weight:600; color:#660000; }
        .btn-success { background-color:#b30000; border:none; }
        .btn-success:hover { background-color:#e60000; }
        .btn-primary { background-color:#ff6666; border:none; }
        .btn-primary:hover { background-color:#ff4d4d; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6">
            <div class="card p-4 bg-white">
              <h2 class="text-center mb-4">Cadastro de Medicamentos</h2>
              
              <form action="/adicionarMedicamento" method="POST">
                <div class="mb-3">
                  <label for="nome" class="form-label">Nome do Medicamento</label>
                  <input type="text" class="form-control" id="nome" name="nome" placeholder="Ex: Paracetamol 500mg" >
                </div>

                <div class="mb-3">
                  <label for="laboratorio" class="form-label">Laboratório</label>
                  <input type="text" class="form-control" id="laboratorio" name="laboratorio" placeholder="Ex: EMS, Neo Química" >
                </div>

                <div class="mb-3">
                  <label for="categoria" class="form-label">Categoria</label>
                  <select class="form-select" id="categoria" name="categoria" >
                    <option value="" disabled selected>Selecione...</option>
                    <option>Analgésico</option>
                    <option>Antibiótico</option>
                    <option>Antialérgico</option>
                    <option>Anti-inflamatório</option>
                    <option>Vitaminas</option>
                    <option>Outros</option>
                  </select>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="preco" class="form-label">Preço (R$)</label>
                    <input type="number" step="0.01" class="form-control" id="preco" name="preco" placeholder="Ex: 19.99" >
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="quantidade" class="form-label">Quantidade em Estoque</label>
                    <input type="number" class="form-control" id="quantidade" name="quantidade" placeholder="Ex: 50" >
                  </div>
                </div>

                <div class="mb-3">
                  <label for="validade" class="form-label">Data de Validade</label>
                  <input type="date" class="form-control" id="validade" name="validade" >
                </div>

                <div class="mb-3">
                  <label for="receita" class="form-label">Necessita Receita Médica?</label>
                  <select class="form-select" id="receita" name="receita" >
                    <option value="" disabled selected>Selecione...</option>
                    <option>Sim</option>
                    <option>Não</option>
                  </select>
                </div>

                <div class="mb-3">
                  <label for="descricao" class="form-label">Descrição / Indicações</label>
                  <textarea class="form-control" id="descricao" name="descricao" rows="3" placeholder="Indicações, posologia, cuidados..."></textarea>
                </div>

                <div class="d-flex justify-content-between mt-4">
                  <button type="submit" class="btn btn-success px-4">Cadastrar</button>
                  <a href="/listaMedicamentos" class="btn btn-primary px-4">Ver Lista</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
});

app.post("/adicionarMedicamento", (req, res) => {
  const { nome, laboratorio, categoria, preco, quantidade, validade, receita, descricao } = req.body;

  // validação dos campos obrigatórios (mesma lógica do primeiro código)
  if (nome && laboratorio && categoria && preco && quantidade && validade && receita) {
    // todos os campos obrigatórios preenchidos -> cadastra e redireciona para lista
    listaMedicamentos.push({
      nome,
      laboratorio,
      categoria,
      preco,
      quantidade,
      validade,
      receita,
      descricao,
    });
    return res.redirect("/listaMedicamentos");
  } else {
    // monta a página igual ao primeiro código, com mensagens de erro, sem repopular os campos
    let conteudo = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Cadastro de Medicamentos</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <style>
        body { background-color: #fff0f0; min-height: 100vh; display:flex; align-items:center; justify-content:center; }
        .card { border: 2px solid #ff4d4d; border-radius:1rem; box-shadow:0 0 15px rgba(255,0,0,0.15); transition:transform 0.2s; }
        .card:hover { transform: scale(1.02); }
        h2 { color:#b30000; font-weight:700; }
        .form-label { font-weight:600; color:#660000; }
        .btn-success { background-color:#b30000; border:none; }
        .btn-success:hover { background-color:#e60000; }
        .btn-primary { background-color:#ff6666; border:none; }
        .btn-primary:hover { background-color:#ff4d4d; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6">
            <div class="card p-4 bg-white">
              <h2 class="text-center mb-4">Cadastro de Medicamentos</h2>
              
              <form action="/adicionarMedicamento" method="POST">
                <div class="mb-3">
                  <label for="nome" class="form-label">Nome do Medicamento</label>
                  <input type="text" class="form-control" id="nome" name="nome" placeholder="Ex: Paracetamol 500mg" >
                </div>`;

    if (!nome) {
      conteudo += `
                <div>
                  <p class="text-danger">O campo Nome é obrigatório.</p>
                </div>`;
    }

    conteudo += `
                <div class="mb-3">
                  <label for="laboratorio" class="form-label">Laboratório</label>
                  <input type="text" class="form-control" id="laboratorio" name="laboratorio" placeholder="Ex: EMS, Neo Química" >
                </div>`;

    if (!laboratorio) {
      conteudo += `
                <div>
                  <p class="text-danger">O campo Laboratório é obrigatório.</p>
                </div>`;
    }

    conteudo += `
                <div class="mb-3">
                  <label for="categoria" class="form-label">Categoria</label>
                  <select class="form-select" id="categoria" name="categoria" >
                    <option value="" disabled selected>Selecione...</option>
                    <option>Analgésico</option>
                    <option>Antibiótico</option>
                    <option>Antialérgico</option>
                    <option>Anti-inflamatório</option>
                    <option>Vitaminas</option>
                    <option>Outros</option>
                  </select>
                </div>`;

    if (!categoria) {
      conteudo += `
                <div>
                  <p class="text-danger">O campo Categoria é obrigatório.</p>
                </div>`;
    }

    conteudo += `
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="preco" class="form-label">Preço (R$)</label>
                    <input type="number" step="0.01" class="form-control" id="preco" name="preco" placeholder="Ex: 19.99" >
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="quantidade" class="form-label">Quantidade em Estoque</label>
                    <input type="number" class="form-control" id="quantidade" name="quantidade" placeholder="Ex: 50" >
                  </div>
                </div>`;

    if (!preco) {
      conteudo += `
                <div>
                  <p class="text-danger">O campo Preço é obrigatório.</p>
                </div>`;
    }
    if (!quantidade) {
      conteudo += `
                <div>
                  <p class="text-danger">O campo Quantidade é obrigatório.</p>
                </div>`;
    }

    conteudo += `
                <div class="mb-3">
                  <label for="validade" class="form-label">Data de Validade</label>
                  <input type="date" class="form-control" id="validade" name="validade" >
                </div>`;

    if (!validade) {
      conteudo += `
                <div>
                  <p class="text-danger">O campo Validade é obrigatório.</p>
                </div>`;
    }

    conteudo += `
                <div class="mb-3">
                  <label for="receita" class="form-label">Necessita Receita Médica?</label>
                  <select class="form-select" id="receita" name="receita" >
                    <option value="" disabled selected>Selecione...</option>
                    <option>Sim</option>
                    <option>Não</option>
                  </select>
                </div>`;

    if (!receita) {
      conteudo += `
                <div>
                  <p class="text-danger">O campo Receita é obrigatório.</p>
                </div>`;
    }

    conteudo += `
                <div class="mb-3">
                  <label for="descricao" class="form-label">Descrição / Indicações</label>
                  <textarea class="form-control" id="descricao" name="descricao" rows="3" placeholder="Indicações, posologia, cuidados..."></textarea>
                </div>

                <div class="d-flex justify-content-between mt-4">
                  <button type="submit" class="btn btn-success px-4">Cadastrar</button>
                  <a href="/listaMedicamentos" class="btn btn-primary px-4">Ver Lista</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
    `;

    res.send(conteudo);
  }
});

app.get("/listaMedicamentos", (req, res) => {
  let tabela = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Lista de Medicamentos</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

      <style>
        body { background-color: #ffe5e5; min-height:100vh; display:flex; justify-content:center; align-items:flex-start; padding:3rem 1rem; }
        .table-container { background:#fff; padding:2.5rem; border-radius:1rem; border:2px solid #ff4d4d; box-shadow:0 6px 25px rgba(255,0,0,0.15); width:100%; max-width:1100px; }
        h1 { font-weight:700; font-size:1.8rem; color:#b30000; margin-bottom:2rem; text-align:center; }
        .table-primary { background-color:#ff9999 !important; color:#4d0000; }
        .empty-row { color:#990000; background-color:#ffe6e6; }
        .btn-primary { background-color:#b30000; border:none; }
        .btn-primary:hover { background-color:#e60000; }
      </style>
    </head>

    <body>
      <div class="table-container">
        <h1>Lista de Medicamentos Cadastrados</h1>

        <div class="table-responsive">
          <table class="table table-bordered align-middle mb-0 text-center">
            <thead class="table-primary">
              <tr>
                <th>Nome</th>
                <th>Laboratório</th>
                <th>Categoria</th>
                <th>Preço (R$)</th>
                <th>Qtd.</th>
                <th>Validade</th>
                <th>Receita</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
  `;

  if (listaMedicamentos.length === 0) {
    tabela += `
      <tr>
        <td colspan="8" class="text-center empty-row py-4">
          Nenhum medicamento cadastrado ainda.
        </td>
      </tr>
    `;
  } else {
    for (let i = 0; i < listaMedicamentos.length; i++) {
      tabela += `
        <tr>
          <td>${listaMedicamentos[i].nome}</td>
          <td>${listaMedicamentos[i].laboratorio}</td>
          <td>${listaMedicamentos[i].categoria}</td>
          <td>R$ ${Number(listaMedicamentos[i].preco).toFixed(2)}</td>
          <td>${listaMedicamentos[i].quantidade}</td>
          <td>${listaMedicamentos[i].validade}</td>
          <td>${listaMedicamentos[i].receita}</td>
          <td>${listaMedicamentos[i].descricao || "-"}</td>
        </tr>
      `;
    }
  }

  tabela += `
            </tbody>
          </table>
        </div>

        <div class="text-center mt-4">
          <a href="/" class="btn btn-primary">Voltar ao Cadastro</a>
        </div>
      </div>
    </body>
    </html>
  `;

  res.send(tabela);
});

app.listen(port, host, () => {
  console.log(`Servidor rodando em http://${host}:${port}`);
});
