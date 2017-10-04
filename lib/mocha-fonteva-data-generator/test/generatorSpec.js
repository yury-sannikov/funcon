const chai = require('chai');
const expect = chai.expect;
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

describe('Test', function() {
  it('should be made', function() {
    expect(true).to.be.true
  });
});