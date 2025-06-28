const fetch = require('node-fetch');

const BIN_ID = '685b2d1c8960c979a5b0cd27';
const API_KEY = '$2a$10$Gp5CiIIclgfZDX1N5ohs8e1Sav9VN07HBZmwHMyPqR0NGVaupuATe';

export default async function handler(req, res) {
  try {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: { 'X-Master-Key': API_KEY }
    });

    const data = await response.json();
    const placar = data.record.placar;

    const [wins, losses] = placar.split('x').map(n => parseInt(n.trim()));
    const texto = `${wins} ${wins === 1 ? 'vitória' : 'vitórias'} ┃ ${losses} ${losses === 1 ? 'derrota' : 'derrotas'}`;

    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(texto);
  } catch (err) {
    console.error('Erro ao buscar placar:', err);
    res.status(500).send('Erro ao buscar placar');
  }
}