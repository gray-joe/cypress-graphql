/// <reference types="cypress" />

describe('Find a role', function () {
  beforeEach(function () {
    /**
     * Ensure we are in a clean state before the test runs.
     * Ideally we would have a cleaner way of setting up test data setup here.
    */
    cy.visit('https://sz-sdet-task.herokuapp.com/graphql')
    cy.wrap(`Valid-Role-${Math.random().toString(20).substr(2, 8)}`).as('validName').then(function () {
      cy.createRole(`"${this.validName}"`);
      cy.findRoleByName(this.validName).then(function (response) {
        cy.wrap(response.body.data.RoleFindOne.id).as('roleId');
      });
    });
    cy.wrap(`Valid-Role-${Math.random().toString(20).substr(2, 8)}`).as('validName2')
  })

  it('can find role by id', function () {
    cy.findRoleById(this.roleId).then(function (response) {
      expect(response.status).to.eq(200);
      expect(response.body.data.RoleFindOne.id).to.eq(this.roleId);
      expect(response.body.data.RoleFindOne.name).to.eq(this.validName);
    });
  });

  it('can find role by name', function () {
    cy.findRoleByName(this.validName).then(function (response) {
      expect(response.status).to.eq(200);
      expect(response.body.data.RoleFindOne.id).to.eq(this.roleId);
      expect(response.body.data.RoleFindOne.name).to.eq(this.validName);
    });
  });

  it('cannot find a role that does not exist', function () {
    cy.findRoleById(123456789987654321).then(function (response) {
      expect(response.status).to.not.eq(200);
      expect(response.body.data.RoleFindOne).to.eq(null);
    });
    cy.findRoleByName(this.validName2).then(function (response) {
      expect(response.status).to.not.eq(200);
      expect(response.body.data.RoleFindOne).to.eq(null);
    });
  });

  it('throws an error if non int passed as Id', function () {
    cy.findRoleById("abc").then(function (response) {
      expect(response.status).to.eq(200);
      expect(response.body.errors[0].message).to.eq(`Argument "id" has invalid value abc.\nExpected type "Int", found abc.`);
    });
  })
})
