import express from "express";

const host = "localhost";
const port = 3000;
let ListaFornecedores = [];

const app = express();
app.use(express.urlencoded({ extended: true }));

/* ===== Página inicial ===== */
app.get("/", (req, res) => {
  res.send(`
    <!doctype html>
    <html lang="pt-BR">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Painel</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
        <style>
          :root{
            --primario: #0b7285; /* cor principal alterada */
            --fundo: #eef4f7;
            --cartao: #ffffff;
          }
          body {
            background: linear-gradient(180deg, var(--fundo), #dfeff6);
            min-height: 100vh;
            display:flex;
            flex-direction:column;
            margin:0;
          }
          .topbar {
            background: var(--primario);
            box-shadow: 0 3px 8px rgba(11,114,133,0.12);
          }
          main { flex:1; display:flex; align-items:center; justify-content:center; padding:3rem 1rem; }
          .panel {
            max-width:560px;
            width:100%;
            background: var(--cartao);
            border-radius:14px;
            padding:2.2rem;
            box-shadow: 0 10px 30px rgba(2,6,23,0.06);
            text-align:center;
          }
          footer {
            font-size:0.9rem;
            text-align:center;
            padding:0.8rem;
            background:#f1f6f9;
            color:#344b57;
          }
        </style>
      </head>
      <body>
        <nav class="navbar navbar-expand-lg topbar navbar-dark">
          <div class="container-fluid">
            <a class="navbar-brand fw-semibold" href="/">MeuSistema</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMain" aria-controls="navMain" aria-expanded="false" aria-label="Alternar menu">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navMain">
              <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                  <a class="nav-link active" href="/">Início</a>
                </li>

                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Registros</a>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="/cadastroFornecedores">Novo Fornecedor</a></li>
                    <li><a class="dropdown-item" href="/ListaFornecedores">Ver Fornecedores</a></li>
                  </ul>
                </li>

                <li class="nav-item">
                  <a class="nav-link" href="/login">Acessar</a>
                </li>

                <li class="nav-item">
                  <a class="nav-link" href="/logout">Encerrar</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main>
          <div class="panel">
            <h1 style="color:var(--primario);" class="mb-3">Bem-vindo ao Painel</h1>
            <p class="text-muted mb-4">Escolha uma opção no menu para gerenciar fornecedores ou acessar o sistema.</p>
            <a href="/cadastroFornecedores" class="btn btn-outline-primary me-2">Ir para Cadastros</a>
            <a href="/ListaFornecedores" class="btn btn-primary">Lista de Fornecedores</a>
          </div>
        </main>

        <footer>© Sistema — Interface de exemplo</footer>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  `);
});

/* ===== Tela de login (GET) ===== */
app.get("/login", (req, res) => {
  res.send(`
    <!doctype html>
    <html lang="pt-BR">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <title>Entrar</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body class="d-flex align-items-center justify-content-center" style="min-height:100vh; background:#f7fbfd;">
        <div class="card shadow" style="width:420px;">
          <div class="card-body p-4">
            <h3 class="text-center text-info mb-3">Área de Acesso</h3>

            <form method="POST" action="/login">
              <div class="mb-3">
                <label class="form-label">Nome de usuário</label>
                <input name="usuario" type="text" class="form-control" placeholder="digite seu usuário">
              </div>

              <div class="mb-3">
                <label class="form-label">Senha</label>
                <input name="senha" type="password" class="form-control" placeholder="sua senha">
              </div>

              <button class="btn btn-info w-100" type="submit">Entrar</button>
              <a href="/" class="btn btn-outline-secondary w-100 mt-2">Voltar</a>
            </form>
          </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  `);
});

/* ===== Processa login (POST) ===== */
app.post("/login", (req, res) => {
  const usuario = req.body.usuario;
  const senha = req.body.senha;

  if (usuario && senha) {
    if (usuario === "admin" && senha === "1234") {
      res.send(`
        <!doctype html>
        <html lang="pt-BR">
          <head>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width,initial-scale=1"/>
            <title>Login OK</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
              body { min-height:100vh; display:flex; align-items:center; justify-content:center; background:linear-gradient(90deg,#e9fbff,#f0f7ff); }
            </style>
          </head>
          <body>
            <div class="card p-5 text-center shadow-sm">
              <h2 class="text-success">Acesso concedido</h2>
              <p class="mb-4">Olá, administrador!</p>
              <a href="/" class="btn btn-primary">Voltar ao Painel</a>
            </div>
          </body>
        </html>
      `);
      return;
    } else {
      // credenciais inválidas — reapresenta o formulário com alerta
      res.send(`
        <!doctype html>
        <html lang="pt-BR">
          <head>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width,initial-scale=1"/>
            <title>Entrar</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
          </head>
          <body class="d-flex align-items-center justify-content-center" style="min-height:100vh; background:#f7fbfd;">
            <div class="card shadow" style="width:420px;">
              <div class="card-body p-4">
                <h3 class="text-center text-info mb-3">Área de Acesso</h3>
                <div class="alert alert-danger">Usuário ou senha inválidos.</div>
                <form method="POST" action="/login">
                  <div class="mb-3">
                    <label class="form-label">Nome de usuário</label>
                    <input name="usuario" type="text" class="form-control" value="${usuario || ""}" placeholder="digite seu usuário">
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Senha</label>
                    <input name="senha" type="password" class="form-control" placeholder="sua senha">
                  </div>

                  <button class="btn btn-info w-100" type="submit">Entrar</button>
                  <a href="/" class="btn btn-outline-secondary w-100 mt-2">Voltar</a>
                </form>
              </div>
            </div>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
          </body>
        </html>
      `);
      return;
    }
  }

  // campos faltando — mostra mensagens de erro ao usuário
  let conteudo = `
    <!doctype html>
    <html lang="pt-BR">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <title>Entrar</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body class="d-flex align-items-center justify-content-center" style="min-height:100vh; background:#f7fbfd;">
        <div class="card shadow" style="width:420px;">
          <div class="card-body p-4">
            <h3 class="text-center text-info mb-3">Área de Acesso</h3>
            <form method="POST" action="/login">
              <div class="mb-3">
                <label class="form-label">Nome de usuário</label>
                <input name="usuario" type="text" class="form-control" value="${usuario || ""}">
              </div>
  `;
  if (!usuario) {
    conteudo += `<div class="text-danger mb-2">O campo Nome de usuário é obrigatório.</div>`;
  }
  conteudo += `
              <div class="mb-3">
                <label class="form-label">Senha</label>
                <input name="senha" type="password" class="form-control">
              </div>
  `;
  if (!senha) {
    conteudo += `<div class="text-danger mb-2">O campo Senha é obrigatório.</div>`;
  }
  conteudo += `
              <button class="btn btn-info w-100" type="submit">Entrar</button>
              <a href="/" class="btn btn-outline-secondary w-100 mt-2">Voltar</a>
            </form>
          </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  `;
  res.send(conteudo);
});

/* ===== Logout ===== */
app.get("/logout", (req, res) => {
  res.send(`
    <!doctype html>
    <html lang="pt-BR">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <title>Desconectar</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body style="min-height:100vh; display:flex; align-items:center; justify-content:center; background:#f0f6fa;">
        <div class="card p-5 text-center shadow">
          <h2 class="text-primary">Você saiu com segurança</h2>
          <p class="mb-4">Sessão encerrada.</p>
          <a href="/" class="btn btn-outline-secondary">Voltar ao Painel</a>
        </div>
      </body>
    </html>
  `);
});

/* ===== Formulário de cadastro de fornecedores (GET) =====
   Observação: reordenei campos e alterei placeholders/labels/textos
   porém mantive os 'name' exatamente iguais para preservar o POST.
*/
app.get("/cadastroFornecedores", (req, res) => {
  res.send(`
    <!doctype html>
    <html lang="pt-BR">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <title>Registrar Fornecedor</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
        <style>
          body { background:#f6fbff; min-height:100vh; display:flex; flex-direction:column; }
          .top { background:#05445E; color:#fff; padding:0.6rem 1rem; }
          main { flex:1; display:flex; align-items:center; justify-content:center; padding:2.5rem; }
          .card { max-width:920px; width:100%; border-radius:12px; padding:1.8rem; box-shadow:0 8px 30px rgba(2,12,27,0.05); }
          footer { background:#f1f5f9; padding:0.8rem; text-align:center; color:#233743; }
        </style>
      </head>
      <body>
        <nav class="top d-flex justify-content-between align-items-center">
          <div class="container-fluid d-flex justify-content-between align-items-center">
            <a href="/" style="color:#fff; font-weight:700; text-decoration:none;">MeuSistema</a>
            <div>
              <a href="/" class="btn btn-sm btn-light">Início</a>
              <a href="/logout" class="btn btn-sm btn-light ms-2">Sair</a>
            </div>
          </div>
        </nav>

        <main>
          <div class="card bg-white">
            <h2 class="text-center text-dark mb-4">Registrar Fornecedor</h2>

            <!-- NOTE: ordem dos inputs alterada conforme solicitado -->
            <form method="POST" action="/adicionarFornecedores" class="row g-3">

              <div class="col-md-6">
                <label class="form-label">Telefone de contato</label>
                <input type="text" id="telefone" name="telefone" class="form-control" placeholder="(DDD) 9XXXX-XXXX">
              </div>

              <div class="col-md-6">
                <label class="form-label">E-mail para contato</label>
                <input type="email" id="email" name="email" class="form-control" placeholder="contato@empresa.com">
              </div>

              <div class="col-md-4">
                <label class="form-label">CNPJ</label>
                <input type="text" id="cnpj" name="cnpj" class="form-control" placeholder="00.000.000/0000-00">
              </div>

              <div class="col-md-8">
                <label class="form-label">Nome fantasia / Marca</label>
                <input type="text" id="nomeFantasia" name="nomeFantasia" class="form-control" placeholder='Ex: "Mercadinho Exemplo"'>
              </div>

              <div class="col-md-8">
                <label class="form-label">Razão social completa</label>
                <input type="text" id="razaoSocial" name="razaoSocial" class="form-control" placeholder='Ex: "Empresa Exemplo LTDA"'>
              </div>

              <div class="col-md-4">
                <label class="form-label">CEP</label>
                <input type="text" id="cep" name="cep" class="form-control" placeholder="00000-000">
              </div>

              <div class="col-md-8">
                <label class="form-label">Endereço (rua, número, complemento)</label>
                <input type="text" id="endereco" name="endereco" class="form-control" placeholder="Rua Exemplo, 123, Bloco A">
              </div>

              <div class="col-md-4">
                <label class="form-label">Cidade</label>
                <input type="text" id="cidade" name="cidade" class="form-control" placeholder="Cidade">
              </div>

              <div class="col-md-2">
                <label class="form-label">UF</label>
                <select id="uf" name="uf" class="form-select">
                  <option value="" selected disabled>Selecione</option>
                  <option value="AC">AC</option>
                  <option value="AL">AL</option>
                  <option value="AP">AP</option>
                  <option value="AM">AM</option>
                  <option value="BA">BA</option>
                  <option value="CE">CE</option>
                  <option value="DF">DF</option>
                  <option value="ES">ES</option>
                  <option value="GO">GO</option>
                  <option value="MA">MA</option>
                  <option value="MT">MT</option>
                  <option value="MS">MS</option>
                  <option value="MG">MG</option>
                  <option value="PA">PA</option>
                  <option value="PB">PB</option>
                  <option value="PR">PR</option>
                  <option value="PE">PE</option>
                  <option value="PI">PI</option>
                  <option value="RJ">RJ</option>
                  <option value="RN">RN</option>
                  <option value="RS">RS</option>
                  <option value="RO">RO</option>
                  <option value="RR">RR</option>
                  <option value="SC">SC</option>
                  <option value="SP">SP</option>
                  <option value="SE">SE</option>
                  <option value="TO">TO</option>
                </select>
              </div>

              <div class="col-12 text-end mt-3">
                <button class="btn btn-success" type="submit">Salvar Fornecedor</button>
                <a href="/" class="btn btn-outline-secondary">Cancelar</a>
              </div>
            </form>
          </div>
        </main>

        <footer>Formulário de exemplo — mantenha os dados e os nomes dos campos</footer>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  `);
});

/* ===== Recebe POST do formulário e salva na lista =====
   Mantive exatamente os mesmos nomes de campo para compatibilidade.
*/
app.post("/adicionarFornecedores", (req, res) => {
  const cnpj = req.body.cnpj;
  const razaoSocial = req.body.razaoSocial;
  const nomeFantasia = req.body.nomeFantasia;
  const endereco = req.body.endereco;
  const cidade = req.body.cidade;
  const uf = req.body.uf;
  const cep = req.body.cep;
  const email = req.body.email;
  const telefone = req.body.telefone;

  if (cnpj && razaoSocial && nomeFantasia && endereco && cidade && uf && cep && email && telefone) {
    ListaFornecedores.push({
      cnpj,
      razaoSocial,
      nomeFantasia,
      endereco,
      cidade,
      uf,
      cep,
      email,
      telefone
    });
    res.redirect("/ListaFornecedores");
  } else {
    // Reapresenta o formulário com os valores já preenchidos e mensagens de erro.
    let conteudo = `
      <!doctype html>
      <html lang="pt-BR">
        <head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width,initial-scale=1"/>
          <title>Registrar Fornecedor - Erro</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body style="background:#f6fbff; min-height:100vh;">
          <nav style="background:#05445E; padding:0.6rem;">
            <div class="container-fluid">
              <a href="/" style="color:#fff; font-weight:700; text-decoration:none;">MeuSistema</a>
            </div>
          </nav>

          <main class="d-flex align-items-start justify-content-center" style="padding:2.5rem;">
            <div class="card p-4" style="max-width:920px; width:100%;">
              <h2 class="text-center text-dark mb-4">Registrar Fornecedor</h2>

              <form method="POST" action="/adicionarFornecedores" class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Telefone de contato</label>
                  <input type="text" id="telefone" name="telefone" class="form-control" value="${telefone || ""}">
                </div>

                <div class="col-md-6">
                  <label class="form-label">E-mail para contato</label>
                  <input type="email" id="email" name="email" class="form-control" value="${email || ""}">
                </div>

                <div class="col-md-4">
                  <label class="form-label">CNPJ</label>
                  <input type="text" id="cnpj" name="cnpj" class="form-control" value="${cnpj || ""}">
                </div>
    `;

    if (!cnpj) {
      conteudo += `<div class="col-12"><p class="text-danger">O campo CNPJ é obrigatório.</p></div>`;
    }

    conteudo += `
                <div class="col-md-8">
                  <label class="form-label">Nome fantasia / Marca</label>
                  <input type="text" id="nomeFantasia" name="nomeFantasia" class="form-control" value="${nomeFantasia || ""}">
                </div>
    `;
    if (!nomeFantasia) {
      conteudo += `<div class="col-12"><p class="text-danger">O campo Nome Fantasia é obrigatório.</p></div>`;
    }

    conteudo += `
                <div class="col-md-8">
                  <label class="form-label">Razão social completa</label>
                  <input type="text" id="razaoSocial" name="razaoSocial" class="form-control" value="${razaoSocial || ""}">
                </div>
    `;
    if (!razaoSocial) {
      conteudo += `<div class="col-12"><p class="text-danger">O campo Razão Social é obrigatório.</p></div>`;
    }

    conteudo += `
                <div class="col-md-4">
                  <label class="form-label">CEP</label>
                  <input type="text" id="cep" name="cep" class="form-control" value="${cep || ""}">
                </div>
    `;
    if (!cep) {
      conteudo += `<div class="col-12"><p class="text-danger">O campo CEP é obrigatório.</p></div>`;
    }

    conteudo += `
                <div class="col-md-8">
                  <label class="form-label">Endereço (rua, número, complemento)</label>
                  <input type="text" id="endereco" name="endereco" class="form-control" value="${endereco || ""}">
                </div>
    `;
    if (!endereco) {
      conteudo += `<div class="col-12"><p class="text-danger">O campo Endereço é obrigatório.</p></div>`;
    }

    conteudo += `
                <div class="col-md-4">
                  <label class="form-label">Cidade</label>
                  <input type="text" id="cidade" name="cidade" class="form-control" value="${cidade || ""}">
                </div>
    `;
    if (!cidade) {
      conteudo += `<div class="col-12"><p class="text-danger">O campo Cidade é obrigatório.</p></div>`;
    }

    conteudo += `
                <div class="col-md-2">
                  <label class="form-label">UF</label>
                  <select id="uf" name="uf" class="form-select">
                    <option value="" disabled ${!uf ? "selected" : ""}>Selecione</option>
                    <option value="AC">AC</option>
                    <option value="AL">AL</option>
                    <option value="AP">AP</option>
                    <option value="AM">AM</option>
                    <option value="BA">BA</option>
                    <option value="CE">CE</option>
                    <option value="DF">DF</option>
                    <option value="ES">ES</option>
                    <option value="GO">GO</option>
                    <option value="MA">MA</option>
                    <option value="MT">MT</option>
                    <option value="MS">MS</option>
                    <option value="MG">MG</option>
                    <option value="PA">PA</option>
                    <option value="PB">PB</option>
                    <option value="PR">PR</option>
                    <option value="PE">PE</option>
                    <option value="PI">PI</option>
                    <option value="RJ">RJ</option>
                    <option value="RN">RN</option>
                    <option value="RS">RS</option>
                    <option value="RO">RO</option>
                    <option value="RR">RR</option>
                    <option value="SC">SC</option>
                    <option value="SP">SP</option>
                    <option value="SE">SE</option>
                    <option value="TO">TO</option>
                  </select>
                </div>
    `;
    if (!uf) {
      conteudo += `<div class="col-12"><p class="text-danger">O campo UF é obrigatório.</p></div>`;
    }

    conteudo += `
                <div class="col-12 text-end mt-3">
                  <button class="btn btn-success" type="submit">Salvar Fornecedor</button>
                  <a href="/" class="btn btn-outline-secondary">Cancelar</a>
                </div>
              </form>
            </div>
          </main>

          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
        </body>
      </html>
    `;
    res.send(conteudo);
  }
});

/* ===== Lista de fornecedores (GET) ===== */
app.get("/ListaFornecedores", (req, res) => {
  let html = `
    <!doctype html>
    <html lang="pt-BR">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <title>Fornecedores</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
        <style>
          body { background:#f7fbff; }
          .card { border-radius:12px; box-shadow:0 8px 24px rgba(2,12,27,0.04); }
          .table thead th { background:#0b7285; color:#fff; }
          .empty { padding:3rem; color:#6c757d; }
        </style>
      </head>
      <body>
        <div class="container my-5">
          <div class="card p-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h1 class="h4">Fornecedores Cadastrados</h1>
              <a href="/cadastroFornecedores" class="btn btn-success">+ Adicionar</a>
            </div>

            <div class="table-responsive">
              <table class="table table-striped align-middle">
                <thead>
                  <tr>
                    <th>CNPJ</th>
                    <th>Razão Social</th>
                    <th>Nome Fantasia</th>
                    <th>Endereço</th>
                    <th>Cidade</th>
                    <th>UF</th>
                    <th>CEP</th>
                    <th>E-mail</th>
                    <th>Telefone</th>
                  </tr>
                </thead>
                <tbody>
  `;

  if (ListaFornecedores.length === 0) {
    html += `
      <tr>
        <td colspan="9" class="text-center empty">Nenhum fornecedor cadastrado no momento.</td>
      </tr>
    `;
  } else {
    for (const f of ListaFornecedores) {
      html += `
        <tr>
          <td>${f.cnpj}</td>
          <td class="text-truncate" style="max-width:200px;">${f.razaoSocial}</td>
          <td class="text-truncate" style="max-width:150px;">${f.nomeFantasia}</td>
          <td class="text-truncate" style="max-width:200px;">${f.endereco}</td>
          <td>${f.cidade}</td>
          <td>${f.uf}</td>
          <td>${f.cep}</td>
          <td class="text-truncate" style="max-width:200px;">${f.email}</td>
          <td>${f.telefone}</td>
        </tr>
      `;
    }
  }

  html += `
                </tbody>
              </table>
            </div>

            <div class="d-flex justify-content-end mt-3">
              <a href="/" class="btn btn-outline-secondary">Voltar ao Painel</a>
            </div>
          </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  `;

  res.send(html);
});

/* ===== Inicializa servidor ===== */
app.listen(port, host, () => {
  console.log(`Servidor executando em http://${host}:${port}`);
});
