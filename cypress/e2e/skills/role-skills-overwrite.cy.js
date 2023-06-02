/// <reference types="cypress" />

describe('Overwrite a role skill', function () {
  beforeEach(function () {
    /**
     * Ensure we are in a clean state before the test runs.
     * Ideally we would have a cleaner way of setting up test data setup here.
    */
    cy.wrap(`Valid-Role-${Math.random().toString(20).substr(2, 8)}`).as('validRoleName').then(function () {
      cy.createRole(`"${this.validRoleName}"`);
      cy.findRoleByName(this.validRoleName).then(function (response) {
        cy.wrap(response.body.data.RoleFindOne.id).as('roleId');
      });
    });
    cy.wrap(`Valid-Skill-${Math.random().toString(20).substr(2, 8)}`).as('validSkillName').then(function () {
      cy.createSkill(`"${this.validSkillName}"`);
      cy.findSkillByName(this.validSkillName).then(function (response) {
        cy.wrap(response.body.data.SkillFindOne.id).as('skillId');
      });
    });
  })

  it('can overwrite a role skill with valid id\'s', function () {
    cy.overwriteRoleSkill(this.roleId, this.skillId, 1)
    cy.findRoleById(this.roleId).then(function (response) {
      expect(response.status).to.eq(200);
      expect(response.body.data.RoleFindOne.id).to.eq(this.roleId);
      expect(response.body.data.RoleFindOne.name).to.eq(this.validRoleName);
      expect(response.body.data.RoleFindOne.skills.length).to.eq(1);
      expect(response.body.data.RoleFindOne.skills[0].skill.id).to.eq(this.skillId);
    });
  });

  it('throws errors on invalid date', function () {
    cy.overwriteRoleSkill("abc", "abc", 10).then(function (response) {
      expect(response.status).to.eq(200);
      expect(response.body.errors[0].message).to.eq(`Argument "roleId" has invalid value abc.\nExpected type "Int", found abc.`);
      expect(response.body.errors[1].message).to.eq(`Argument "skills" has invalid value {skillId: abc, weight: 10}.\nIn field "skillId": Expected type "Int", found abc.`);
      expect(response.body.errors[2].message).to.eq(`Argument "skillId" has invalid value abc.\nExpected type "Int", found abc.`);
    });
  });
})
