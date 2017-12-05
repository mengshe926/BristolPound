/* setup.js - runs before mocha tests */
import chai from 'chai';

// Setup globals / chai
global.__DEV__ = true;
global.expect = chai.expect;
