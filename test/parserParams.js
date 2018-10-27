const assert = require('assert');
const toTest = require('../index');

describe('Environment parsing with defaults and Params Object', () => {

    it('Flat', () => {
        let env = {
            "CFG_FLAT": "flat",
        };
        let result = toTest.parseParams({
            prefix: "CFG_",
            defaults: {},
            environment: env
        });

        console.log("RESULT IS2qqq3 ",result )

        assert.equal(result.flat, "flat");
    });

    it('Error_String_Object', () => {
        let env = {
            "CFG_STRING": "aastring",
            "CFG_STRING_0_VALUE": "value",
        };
        let result = toTest.parseParams({
            prefix: "CFG_",
            defaults: {},
            environment: env
        });

        assert.equal(result.string, "aastring");
    });

    it('Array', () => {
        let env = {
            "CFG_ARRAY_0": "array0",
            "CFG_ARRAY_1": "array1",
        };
        let result = toTest.parseParams({
            prefix: "CFG_",
            defaults: {},
            environment: env
        });

        assert.equal(result.array[0], "array0");
        assert.equal(result.array[1], "array1");
    });

    it('Object', () => {
        let env = {
            "CFG_NESTED_KEY": "key",
            "CFG_NESTED_VALUE": "value",
        };
        let result = toTest.parseParams({
            prefix: "CFG_",
            defaults: {},
            environment: env
        });

        assert.equal(result.nested.key, "key");
        assert.equal(result.nested.value, "value");
    });

    it('Deep object', () => {
        let env = {
            "CFG_NESTED_CHILD_KEY": "key",
            "CFG_NESTED_CHILD_VALUE": "value",
        };
        let result = toTest.parseParams({
            prefix: "CFG_",
            defaults: {},
            environment: env
        });

        assert.equal(result.nested.child.key, "key");
        assert.equal(result.nested.child.value, "value");
    });

    it('Array with object', () => {
        let env = {
            "CFG_ARRAY_0_KEY": "key0",
            "CFG_ARRAY_0_VALUE": "value0",
            "CFG_ARRAY_1_KEY": "key1",
            "CFG_ARRAY_1_VALUE": "value1",
        };
        let result = toTest.parseParams({
            prefix: "CFG_",
            defaults: {},
            environment: env
        });

        assert.equal(result.array[0].key, "key0");
        assert.equal(result.array[0].value, "value0");
        assert.equal(result.array[1].key, "key1");
        assert.equal(result.array[1].value, "value1");
    });

    it('Complex', () => {
        let env = {
            "CFG_ARRAY_0_KEY_0_NAME": "key0Name0",
            "CFG_ARRAY_0_KEY_1_NAME": "key0Name1",
        };
        let result = toTest.parseParams({
            prefix: "CFG_",
            defaults: {},
            environment: env
        });

        assert.equal(result.array[0].key[0].name, "key0Name0");
        assert.equal(result.array[0].key[1].name, "key0Name1");
    })

});

describe('Environment parsing with custom default', () => {
    it('Flat', () => {
        let env = {
            "CFG_FLAT": "flat",
        };
        let defaults = {
            flat: 'custom',
            other: 'custom'
        };
        let result = toTest.parseParams({
            prefix: "CFG_",
            defaults: defaults,
            environment: env
        });


        assert.equal(result.flat, "flat");
        assert.equal(result.other, "custom");
    });

    it('Array', () => {
        let env = {
            "CFG_ARRAY_1": "array1",
        };
        let defaults = {
            array: ['custom']
        };

        let result = toTest.parseParams({
            prefix: "CFG_",
            defaults: defaults,
            environment: env
        });

        assert.equal(result.array[0], "custom");
        assert.equal(result.array[1], "array1");
    })

    it('Object', () => {
        let env = {
            "CFG_NESTED_NAME": "name0",
        };
        let defaults = {
            nested: {
                name: "default",
                value: "value0"
            }
        };

        let result = toTest.parseParams({
            prefix: "CFG_",
            defaults: defaults,
            environment: env
        });

        assert.equal(result.nested.name, "name0");
        assert.equal(result.nested.value, "value0");
    })

    it('Complex', () => {
        let env = {
            "CFG_NESTED_NAME": "name0",
            "CFG_NESTED_VALUES_0": "value0",
            "CFG_NESTED_VALUES_1": "value1",
        };
        let defaults = {
            nested: {
                name: "default",
            }
        };

        let result = toTest.parseParams({
            prefix: "CFG_",
            defaults: defaults,
            environment: env
        });

        assert.equal(result.nested.name, "name0");
        assert.equal(result.nested.values[0], "value0");
        assert.equal(result.nested.values[1], "value1");
    })

});
