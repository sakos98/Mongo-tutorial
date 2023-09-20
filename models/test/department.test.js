const { default: mongoose } = require('mongoose');
const Department = require('../department.model');
const expect = require('chai').expect;

describe('Department', () => {
  it('should throw an error if no "name" arg', async () => {
    const dep = new Department({});
    try {
      await dep.validate();
      throw new Error('Validation should have failed');
    } catch (error) {
      expect(error.errors.name).to.exist;
    }
  });

  it('should throw an error if "name" is not a string', async () => {
    const cases = [{}, []];
    for (let name of cases) {
      const dep = new Department({ name });
      try {
        await dep.validate();
        throw new Error('Validation should have failed');
      } catch (error) {
        expect(error.errors.name).to.exist;
      }
    }
  });

  it('should throw an error if "name" is too short or too long', async () => {
    const cases = ['Abc', 'abcd', 'Lorem Ipsum, Lorem Ip'];
    for (let name of cases) {
      const dep = new Department({ name });
      try {
        await dep.validate();
        throw new Error('Validation should have failed');
      } catch (error) {
        const validationError = error.errors['name'];
        expect(validationError).to.exist;
      }
    }
  });

  it('should not throw an error if "name" is okey', async () => {
    const cases = ['Management', 'Human Resources'];
    for(let name of cases) {
      const dep = new Department({ name });
  
      try {
        await dep.validate();
      } catch (error) {
        throw new Error('Validation should not have failed');
      }
    }
  });
  


  after(() => {
    mongoose.models = {};
  });
});

