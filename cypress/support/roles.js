Cypress.Commands.add('createRole', function (name) {
  cy.request({
    method: "POST",
    url: 'https://sz-sdet-task.herokuapp.com/graphql',
    body: { 
      query: `mutation {
        RoleCreateOne(name: ${name}) {
          name
        }
      }`
    }
  })
})

Cypress.Commands.add('updateRole', function (id, name) {
  cy.request({
    method: "POST",
    url: 'https://sz-sdet-task.herokuapp.com/graphql',
    body: { 
      query: `mutation {
        RoleUpdateOne(id: ${id}, name: ${name}) {
          name
        }
      }`
    }
  })
})

Cypress.Commands.add('deleteRole', function (id) {
  cy.request({
    method: "POST",
    url: 'https://sz-sdet-task.herokuapp.com/graphql',
    body: { 
      query: `mutation {
        RoleDeleteOne(id: ${id}) {
          affected
        }
      }`
    }
  })
})

Cypress.Commands.add('findRoleById', function (id) {
  cy.request({
    method: "POST",
    url: 'https://sz-sdet-task.herokuapp.com/graphql',
    body: { 
      query: `query {
        RoleFindOne(id: ${id}) {
          id
          name
          createdAt
          skills {
            skill {
              id
            }
          }
        }
      }`
    }
  })
})

Cypress.Commands.add('findRoleByName', function (name) {
  cy.request({
    method: "POST",
    url: 'https://sz-sdet-task.herokuapp.com/graphql',
    body: { 
      query: `query {
        RoleFindOne(name: "${name}") {
          id
          name
          createdAt
          skills {
            skill {
              id
            }
          }
        }
      }`
    }
  })
})

Cypress.Commands.add('listRoles', function () {
  cy.request({
    method: "POST",
    url: 'https://sz-sdet-task.herokuapp.com/graphql',
    body: { 
      query: `query {
        Roles {
          id
          name
          createdAt
          deletedAt
          updatedAt
          skills {
            createdAt
            deletedAt
            id
            roleId
            skillId
            skill {
              id
              createdAt
              deletedAt
              name
              updatedAt
            }
            updatedAt
            weight
          }
        }
      }`
    }
  })
})
