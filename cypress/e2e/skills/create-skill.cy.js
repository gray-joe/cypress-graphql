/// <reference types="cypress" />

describe('Create a skill', function () {
  beforeEach(function () {
    // Ensure we are in a clean state before the test run
    cy.wrap(`Valid-Skill-${Math.random().toString(20).substr(2, 8)}`).as('validName');;
  })

  it('can create a skill when valid name passed', function () {
    // Can succesfully create a skill when a valid name is passed
    cy.createSkill(`"${this.validName}"`).then(function (response) {
      expect(response.status).to.eq(200);
      expect(response.body.data.SkillCreateOne.name).to.eq(`${this.validName}`);
    });

    // Cannot create with a skill with the same name 
    cy.createSkill(`"${this.validName}"`).then(function (response) {
      // expect(response.status).to.not.eq(200);
      // This should have a better error message
      expect(response.body.errors[0].message).to.eq("an error occured");
    });

    // Check the skill was succesfully created
    cy.findSkillByName(this.validName).then(function (response) {
      expect(response.status).to.eq(200);
      expect(response.body.data.SkillFindOne.name).to.eq(this.validName);
    });
  });

  it('cannot create a skill when non string name passed', function () {
    cy.createSkill(12345).then(function (response) {
      expect(response.body.errors[0].message).to.eq(`Argument "name" has invalid value 12345.\nExpected type "String", found 12345.`);
      expect(response.status).to.not.eq(200);
    });
  });

  it('cannot create a skill when no name passes', function () {
    cy.createSkill("").then(function (response) {
      expect(response.status).to.not.eq(200);
      // expect(response.body.errors[0].message).to.contain(`Argument "name" has invalid value "".`);
    });
  })
})
