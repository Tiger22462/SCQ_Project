const SignupContract = artifacts.require("SignupContract");

module.exports = function (deployer) {
  deployer.deploy(SignupContract);
};
