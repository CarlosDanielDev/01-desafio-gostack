const { Router } = require("express");
const { uuid } = require("uuidv4");
const logRequests = require("./middlewares/logRequests");
const validateRepositoryId = require("./middlewares/valdiateRepositoryId");
const routes = new Router();
routes.use(logRequests);
routes.use("/repositories/:id", validateRepositoryId);

const repositories = [];

// listagem de repositórios
routes.get("/repositories", (request, response) => {
  // TODO
  return response.status(200).json(repositories);
});

routes.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = { id: uuid(), title, url, techs, likes: 0 };
  repositories.push(repository);
  return response.status(200).json(repository);
});

routes.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, techs, url } = request.body;

  const repositoryIndex = repositories.findIndex(
    (repository) => (repository.id = id)
  );

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }
  const repository = { id, title, techs, url };
  repositories[repositoryIndex] = {
    ...repositories[repositoryIndex],
    ...repository,
  };
  return response.status(200).json(repositories[repositoryIndex]);
});

routes.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }
  repositories.splice(repositoryIndex, 1);
  return response.status(204).send();
});

routes.post(
  "/repositories/:id/like",
  validateRepositoryId,
  (request, response) => {
    // TODO
    const { id } = request.params;

    const repositoryIndex = repositories.findIndex(
      (respository) => respository.id === id
    );

    if (repositoryIndex < 0) {
      return response.status(404).json({ error: "Repository not found" });
    }

    const { likes } = repositories[repositoryIndex];
    // console.log("likes", likes);
    const repository = { ...repositories[repositoryIndex], likes: likes + 1 };
    // console.log("repository", repository);
    repositories[repositoryIndex] = repository;

    return response.status(200).json(repositories[repositoryIndex]);
  }
);

module.exports = routes;
