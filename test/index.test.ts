import { assert } from 'chai';
import sinon from 'sinon';
import {testFunc, AClass} from '../src';

describe("tester", function(){
    it("should return true", function(){
        assert.equal(testFunc(), true);
    })

    it("spy test", function () {
        const callback = sinon.spy();
        
        callback()

        assert(callback.called);
    });
    
    it("should stub", function() {
        const callback = sinon.stub();
        callback.onCall(0).returns(1);
        callback.onCall(1).returns(2);
        callback.returns(3);

        assert.equal(callback(), 1); // Returns 1
        assert.equal(callback(), 2); // Returns 2
        assert.equal(callback(), 3);
    })

    it("should fake", function(){
        const fake = sinon.fake();

        fake();

        assert.equal(fake.callCount, 1);
    })
})

