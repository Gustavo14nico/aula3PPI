import express from "express";

const app = express();
const port = 3000;
const host = "localhost";

let ListaMedicamentos = [];

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <title>Cadastro de Medicamentos</title>
      </head>
      <body class="bg-dark text-light">
        <div class="container mt-5">
          <h1 class="text-danger">Cadastro de Medicamentos</h1>
          <form method="POST" class="mt-4">
            <div class="mb-3">
              <label class="form-label">Nome do Medicamento</label>
              <input type="text" name="nome" class="form-control" />
            </div>

            <div class="mb-3">
              <label class="form-label">Nome do Fabricante</label>
              <input type="text" name="fabricante" class="form-control" />
            </div>

            <div class="mb-3">
              <label class="form-label">Lote</label>
              <input type="text" name="lote" class="form-control" />
            </div>

            <div class="mb-3">
              <label class="form-label">Data de Validade</label>
              <input type="date" name="validade" class="form-control" />
            </div>

            <button type="submit" class="btn btn-danger w-100">Cadastrar</button>
          </form>
        </div>
      </body>
    </html>
  `);
});

app.post("/", (req, res) => {
  const { nome, fabricante, lote, validade } = req.body;

  let erros = [];

  if (!nome) erros.push("Informe o nome do medicamento.");
  if (!fabricante) erros.push("Informe o nome do fabricante.");
  if (!lote) erros.push("Informe o lote.");
  if (!validade) erros.push("Informe a data de validade.");

  if (erros.length > 0) {
    let listaErros = erros
      .map((e) => `<div class="alert alert-danger mt-3">${e}</div>`)
      .join("");

    return res.send(`
      <!DOCTYPE html>
      <html lang="pt-BR">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
            rel="stylesheet"
          />
          <title>Erros no Cadastro</title>
        </head>
        <body class="bg-dark text-light">
          <div class="container mt-5">
            <h1 class="text-danger">Erros Encontrados</h1>
            ${listaErros}

            <a href="/" class="btn btn-danger mt-4">Voltar</a>
          </div>
        </body>
      </html>
    `);
  }

  ListaMedicamentos.push({
    NomeMedicamento: nome,
    NomeFabricante: fabricante,
    Lote: lote,
    Validade: validade,
  });

  res.send(`
    <div class="container mt-5">
      <div class="alert alert-success">
        Medicamento cadastrado com sucesso!
      </div>
      <a class="btn btn-danger mt-3" href="/">Voltar</a>
    </div>
  `);
});

app.listen(port, host, () => {
  console.log(`Servidor rodando em http://${host}:${port}`);
});
