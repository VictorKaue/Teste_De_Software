const mysql = require('mysql2');

describe('Teste de Conexão ao Banco de Dados', () => {
  it('Deve conectar ao banco sem erros', (done) => {
    const db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'vklp100106',
      database: 'sismed',
      port: 3306,
    });

    db.connect((err) => {
      expect(err).toBeNull();
      db.end(); 
      done(); 
    });
  });
});
