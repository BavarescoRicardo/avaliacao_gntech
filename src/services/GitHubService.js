const { sequelize } = require('../config/database');
const Repository = require('../models/Repository');
const axios = require('axios');

class GitHubService {
  constructor() {
    this.baseUrl = 'https://api.github.com';
    this.token = process.env.GITHUB_TOKEN; // Assumindo que você terá um token no .env
  }

  async getUserRepos(username) {
    try {
      const apiRepos = await this.fetchReposFromAPI(username);
      const formattedRepos = this.formatRepos(apiRepos);

      // Salva no banco de dados
      await this.saveReposToDatabase(username, formattedRepos);

      return formattedRepos;
    } catch (error) {
      this.handleError(error);
    }
  }

  async fetchReposFromAPI(username) {
    const response = await axios.get(`${this.baseUrl}/users/${username}/repos`, {
      headers: this.getHeaders(),
      params: {
        sort: 'updated',
        direction: 'desc',
        per_page: 100 // Máximo permitido por página
      }
    });
    return response.data;
  }

  formatRepos(repos) {
    return repos.map(repo => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      last_updated: repo.updated_at,
      url: repo.html_url,
      owner: repo.owner.login,
      github_id: repo.id
    }));
  }

  async saveReposToDatabase(username, repos) {
    const transaction = await sequelize.transaction();
    try {
      for (const repo of repos) {
        await Repository.upsert(
          { ...repo, owner: username }, // Garante que o owner seja salvo
          {
            transaction,
            conflictFields: ['github_id']
          }
        );
      }
      await transaction.commit();
      console.log(`Repositórios de ${username} salvos com sucesso!`);
    } catch (error) {
      await transaction.rollback();
      console.error('Erro ao salvar repositórios:', error);
      throw new Error('Falha ao salvar dados no banco de dados');
    }
  }

  getHeaders() {
    return {
      'Authorization': this.token ? `Bearer ${this.token}` : '', // Use 'Bearer' para tokens do GitHub
      'Accept': 'application/vnd.github.v3+json'
    };
  }

  handleError(error) {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          throw new Error('Usuário não encontrado no GitHub');
        case 403:
          throw new Error('Limite de requisições excedido ou token inválido');
        default:
          throw new Error(`Erro na API GitHub: ${error.response.status}`);
      }
    }
    throw new Error(error.message || 'Erro de conexão com o GitHub');
  }

  async getLocalRepos(username) {
    return await Repository.findAll({
      where: { owner: username },
      order: [['last_updated', 'DESC']],
      limit: 100
    });
  }
}

module.exports = new GitHubService();