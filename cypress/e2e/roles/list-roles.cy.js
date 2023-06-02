/// <reference types="cypress" />

describe('List all roles', function () {
  beforeEach(function () {
    /**
     * Ideally we would have a cleaner way of setting up test data setup here
     * and start from a clean slate where there are no roles.
    */
    cy.wrap(`Valid-Role-${Math.random().toString(20).substr(2, 8)}`).as('validName').then(function () {
      cy.createRole(`"${this.validName}"`);
      cy.findRoleByName(this.validName).then(function (response) {
        cy.wrap(response.body.data.RoleFindOne.id).as('roleId');
      });
    });
  })

  it('can list all roles and all data is present', function () {
    cy.listRoles().then(function (response) {
      // We should check for exact values here 
      expect(response.body.data.Roles.length).to.gt(1);
      expect(response.body.data.Roles[0]).to.have.property('createdAt');
      expect(response.body.data.Roles[0]).to.have.property('deletedAt');
      expect(response.body.data.Roles[0]).to.have.property('id');
      expect(response.body.data.Roles[0]).to.have.property('name');
      expect(response.body.data.Roles[0]).to.have.property('skills');
      expect(response.body.data.Roles[0]).to.have.property('updatedAt');
    })
  })
});
