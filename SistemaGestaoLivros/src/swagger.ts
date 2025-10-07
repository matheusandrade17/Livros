import swaggerJsdoc from 'swagger-jsdoc';


export const swaggerSpec = swaggerJsdoc({
definition: {
openapi: '3.0.0',
info: {
title: 'Sistema de Gestão de Livros API',
version: '1.0.0',
description: 'API example com Express, TypeScript, Prisma, PostgreSQL e Zod'
}
},
apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
});