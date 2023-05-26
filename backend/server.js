const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/api/comments', (req, res) => {
  const { commentId, commentedOnPostId, commentCreator, commentContent, commentDate } = req.body;

  // Ler o arquivo forumComments.json
  fs.readFile('forumComments.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo forumComments.json:', err);
      res.status(500).json({ error: 'Erro ao ler o arquivo de comentários.' });
      return;
    }

    let comments = JSON.parse(data);

    // Adicionar o novo comentário à matriz de comentários
    comments.push({
      commentId,
      commentedOnPostId,
      commentCreator,
      commentContent,
      commentDate
    });

    // Escrever a matriz de comentários atualizada no arquivo forumComments.json
    fs.writeFile('forumComments.json', JSON.stringify(comments), 'utf8', (err) => {
      if (err) {
        console.error('Erro ao escrever no arquivo forumComments.json:', err);
        res.status(500).json({ error: 'Erro ao adicionar o comentário.' });
        return;
      }

      res.status(200).json({ message: 'Comentário adicionado com sucesso.' });
    });
  });
});

app.listen(3000, () => {
  console.log('Servidor em execução na porta 3000.');
});