export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Sistema de Gestão de Livros API",
    version: "1.0.0",
    description: "API para gerenciar livros",
  },
  servers: [{ url: "http://localhost:4000" }],
  components: {
    schemas: {
      Book: {
        type: "object",
        required: ["id", "title", "authorId", "categoryId"],
        properties: {
          id: { type: "integer", example: 1 },
          title: { type: "string", example: "O Senhor dos Anéis" },
          summary: { type: "string", example: "Saga épica de fantasia" },
          isbn: { type: "string", example: "978-3-16-148410-0" },
          publishedAt: { type: "string", format: "date-time", example: "1954-07-29T00:00:00Z" },
          authorId: { type: "integer", example: 1 },
          categoryId: { type: "integer", example: 1 },
          createdAt: { type: "string", format: "date-time", example: "2025-10-05T20:00:00Z" }
        }
      }
    },
    parameters: {
      idParam: { name: "id", in: "path", required: true, schema: { type: "integer" } }
    }
  },
  paths: {
    "/books": {
      get: {
        summary: "Lista de livros",
        responses: {
          "200": {
            description: "Lista de livros",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Book" },
                  example: [
                    { id: 1, title: "O Senhor dos Anéis", summary: "Saga épica", isbn: "978-3-16-148410-0", publishedAt: "1954-07-29T00:00:00Z", authorId: 1, categoryId: 1, createdAt: "2025-10-05T20:00:00Z" },
                    { id: 2, title: "Harry Potter e a Pedra Filosofal", summary: "Primeiro livro da saga", isbn: "978-3-16-148411-7", publishedAt: "1997-06-26T00:00:00Z", authorId: 2, categoryId: 1, createdAt: "2025-10-05T20:10:00Z" }
                  ]
                }
              }
            }
          }
        }
      },
      post: {
        summary: "Adicione um livro",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/Book" } } }
        },
        responses: { "201": { description: "Livro criado" } }
      }
    },
    "/books/{id}": {
      put: {
        summary: "Atualize um livro",
        parameters: [{ $ref: "#/components/parameters/idParam" }],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/Book" } } }
        },
        responses: { "200": { description: "Livro atualizado" } }
      },
      delete: {
        summary: "Delete um livro",
        parameters: [{ $ref: "#/components/parameters/idParam" }],
        responses: { "204": { description: "Livro deletado" } }
      }
    }
  }
};
