import { assert } from 'chai';
import sinon from 'sinon';
import {testFunc, AClass} from '../src';

describe("tester", function(){
    it("should return trye", function(){
        assert.equal(testFunc(), true);
    })

    it("should be able to be used instead of spies", function () {
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
})

