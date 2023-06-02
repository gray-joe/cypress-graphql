/// <reference types="cypress" />

describe('Delete a role', function () {
  beforeEach(function () {
    /**
     * Ensure we are in a clean state before the test runs.
     * Ideally we would have a cleaner way of setting up test data setup here.
    */
    cy.wrap(`Valid-Role-${Math.random().toString(20).substr(2, 8)}`).as('validName').then(function () {
      cy.createRole(`"${this.validName}"`);
      cy.findRoleByName(this.validName).then(function (response) {
        cy.wrap(response.body.data.RoleFindOne.id).as('roleId');
      });
    });
    cy.wrap(`Valid-Role-${Math.random().toString(20).substr(2, 8)}`).as('validName2')
  })

  it('can delete role by id', function () {
    cy.deleteRole(this.roleId).then(function (response) {
      expect(response.status).to.eq(200);
      expect(response.body.data.RoleDeleteOne.affected).to.eq(1);
    });

    cy.findRoleById(this.roleId).then(function (response) {
      // expect(response.status).to.not.eq(200);
      expect(response.body.data.RoleFindOne).to.eq(null);
    });
  });

  it('throws an error if role id does not exist', function () {
    cy.deleteRole(123456789987654321).then(function (response) {
      expect(response.status).to.eq(200);
      expect(response.body.data.RoleDeleteOne.affected).to.eq(0);
    });
  })

  it('throws an error if non int passed as Id', function () {
    cy.deleteRole("abc").then(function (response) {
      expect(response.status).to.eq(200);
      expect(response.body.errors[0].message).to.eq(`Argument "id" has invalid value abc.\nExpected type "Int", found abc.`);
    });
  })
})
