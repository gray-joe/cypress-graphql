/// <reference types="cypress" />

describe('List all skills', function () {
  beforeEach(function () {
    /**
     * Ideally we would have a cleaner way of setting up test data setup here
     * and start from a clean slate where there are no skills.
    */
    cy.wrap(`Valid-Skill-${Math.random().toString(20).substr(2, 8)}`).as('validName').then(function () {
      cy.createSkill(`"${this.validName}"`);
      cy.findSkillByName(this.validName).then(function (response) {
        cy.wrap(response.body.data.SkillFindOne.id).as('skillId');
      });
    });
  })

  it('can list all skills and all data is present', function () {
    cy.listSkills().then(function (response) {
      // We should check for exact values here 
      expect(response.body.data.Skills.length).to.gt(1);
      expect(response.body.data.Skills[0]).to.have.property('createdAt');
      expect(response.body.data.Skills[0]).to.have.property('deletedAt');
      expect(response.body.data.Skills[0]).to.have.property('id');
      expect(response.body.data.Skills[0]).to.have.property('name');
      expect(response.body.data.Skills[0]).to.have.property('updatedAt');
    })
  })
});
