const mysql = require('mysql2');

describe('Teste de Conexão ao Banco de Dados', () => {
  it('Deve conectar ao banco sem erros', (done) => {
    const db = mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: 'c@tolic@',
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
