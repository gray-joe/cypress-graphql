/// <reference types="cypress" />

describe('Update a skill', function () {
  beforeEach(function () {
    /**
     * Ensure we are in a clean state before the test runs.
     * Ideally we would have a cleaner way of setting up test data setup here.
    */
    cy.wrap(`Valid-Skill-${Math.random().toString(20).substr(2, 8)}`).as('validName').then(function () {
      cy.createSkill(`"${this.validName}"`);
      cy.findSkillByName(this.validName).then(function (response) {
        cy.wrap(response.body.data.SkillFindOne.id).as('skillId');
      });
    });
    cy.wrap(`Valid-Skill-${Math.random().toString(20).substr(2, 8)}`).as('validName2')
  })

  it('can update skill', function () {
    cy.updateSkill(this.skillId, `"${this.validName2}"`)
    cy.findSkillById(this.skillId).then(function (response) {
      expect(response.body.data.SkillFindOne.name).to.eq(this.validName2);
      // Could include a check here for the updatedAt field, utilise cy.clock() to control the time in the test
    });
  });

  it('cannot update a skill that does not exist', function () {
    cy.updateSkill(Math.random()*10^16, `"${this.validName2}"`).then(function (response) {
      expect(response.status).to.not.eq(200);
    });
    cy.findSkillByName(this.validName2).then(function (response) {
      expect(response.status).to.not.eq(200);
      expect(response.body.data.SkillFindOne).to.eq(null);
    });
  });

  it('throws an error if non int passed as Id', function () {
    cy.updateSkill("abc", `"${this.validName2}"`).then(function (response) {
      expect(response.status).to.eq(200);
      expect(response.body.errors[0].message).to.eq(`Argument "id" has invalid value abc.\nExpected type "Int", found abc.`);
    });
  })

  it('throws an error if try to update Name from String to Int', function () {
    cy.updateSkill(this.skillId, 123).then(function (response) {
      expect(response.status).to.eq(200);
      expect(response.body.errors[0].message).to.eq(`Argument "name" has invalid value 123.\nExpected type "String", found 123.`);
    });
  })
})
