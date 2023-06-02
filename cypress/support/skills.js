Cypress.Commands.add('createSkill', function (name) {
  cy.request({
    method: "POST",
    url: 'https://sz-sdet-task.herokuapp.com/graphql',
    body: { 
      query: `mutation {
        SkillCreateOne(name: ${name}) {
          name
        }
      }`
    }
  })
})

Cypress.Commands.add('updateSkill', function (id, name) {
  cy.request({
    method: "POST",
    url: 'https://sz-sdet-task.herokuapp.com/graphql',
    body: { 
      query: `mutation {
        SkillUpdateOne(id: ${id}, name: ${name}) {
          name
        }
      }`
    }
  })
})

Cypress.Commands.add('deleteSkill', function (id) {
  cy.request({
    method: "POST",
    url: 'https://sz-sdet-task.herokuapp.com/graphql',
    body: { 
      query: `mutation {
        SkillDeleteOne(id: ${id}) {
          affected
        }
      }`
    }
  })
})

Cypress.Commands.add('findSkillById', function (id) {
  cy.request({
    method: "POST",
    url: 'https://sz-sdet-task.herokuapp.com/graphql',
    body: { 
      query: `query {
        SkillFindOne(id: ${id}) {
          id
          name
          createdAt
          updatedAt
        }
      }`
    }
  })
})

Cypress.Commands.add('findSkillByName', function (name) {
  cy.request({
    method: "POST",
    url: 'https://sz-sdet-task.herokuapp.com/graphql',
    body: { 
      query: `query {
        SkillFindOne(name: "${name}") {
          id
          name
          createdAt
          updatedAt
        }
      }`
    }
  })
})

Cypress.Commands.add('listSkills', function () {
  cy.request({
    method: "POST",
    url: 'https://sz-sdet-task.herokuapp.com/graphql',
    body: { 
      query: `query {
        Skills {
          id
          name
          createdAt
          deletedAt
          updatedAt
        }
      }`
    }
  })
})

Cypress.Commands.add('overwriteRoleSkill', function (roleId, skillId, weight) {
  cy.request({
    method: "POST",
    url: 'https://sz-sdet-task.herokuapp.com/graphql',
    body: { 
      query: `mutation {
        RoleSkillsOverwrite(roleId: ${roleId}, skills: { skillId: ${skillId}, weight: ${weight} }) {
          skill {
            id
            name
          }
          skillId
          id
          roleId
        }
      }`
    }
  })
})
