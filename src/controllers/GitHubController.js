const githubService = require('../services/GitHubService');

exports.getUserRepos = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({
        error: 'Parâmetro "username" é obrigatório'
      });
    }

    // Tenta buscar os repositórios locais primeiro
    const localRepos = await githubService.getLocalRepos(username);

    if (localRepos && localRepos.length > 0) {
      console.log(`Repositórios de ${username} encontrados no banco de dados.`);
      return res.json(localRepos);
    }

    console.log(`Repositórios de ${username} não encontrados localmente. Buscando na API do GitHub...`);

    // Se não encontrou localmente, busca na API do GitHub e salva
    const githubRepos = await githubService.getUserRepos(username);
    res.json(githubRepos);

  } catch (error) {
    console.error('Erro ao buscar repositórios:', error);
    res.status(500).json({
      error: error.message,
      solução: 'Verifique o nome de usuário e tente novamente'
    });
  }
};