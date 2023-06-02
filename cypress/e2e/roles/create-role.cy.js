/// <reference types="cypress" />

describe('Create a role', function () {
  beforeEach(function () {
    // Ensure we are in a clean state before the test run
    cy.wrap(`Valid-Role-${Math.random().toString(20).substr(2, 8)}`).as('validName');
  })

  it('can create a role when valid name passed', function () {   
    // Can succesfully create a role when a valid name is passed
    cy.createRole(`"${this.validName}"`).then(function (response) {
      expect(response.status).to.eq(200);
      expect(response.body.data.RoleCreateOne.name).to.eq(`${this.validName}`);
    });

    // Can create with a role with the same name (Is this correct behaviour?)
    cy.createRole(`"${this.validName}"`).then(function (response) {
      expect(response.status).to.eq(200);
      expect(response.body.data.RoleCreateOne.name).to.eq(`${this.validName}`);
    });

    // Check the role was succesfully created
    cy.findRoleByName(this.validName).then(function (response) {
      expect(response.status).to.eq(200);
      expect(response.body.data.RoleFindOne.name).to.eq(this.validName);
    });
  });

  it('cannot create a role when non string name passed', function () {
    cy.createRole(12345).then(function (response) {
      expect(response.body.errors[0].message).to.eq(`Argument "name" has invalid value 12345.\nExpected type "String", found 12345.`);
      expect(response.status).to.not.eq(200);
    });
  });

  it('cannot create a role when no name passes', function () {   
    cy.createRole("").then(function (response) {
      expect(response.status).to.not.eq(200);
      // expect(response.body.errors[0].message).to.contain(`Argument "name" has invalid value "".`);
    });
  })
})
