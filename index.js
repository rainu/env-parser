"use strict";

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, {[key]: {}});
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, {[key]: source[key]});
            }
        }
    }

    return mergeDeep(target, ...sources);
}

function generateFromObject(prefix, object) {
    let result = [];
    for (const [key, value] of Object.entries(object)) {

        if (value instanceof Object) {
            let newPrefix = prefix + key.toUpperCase() + "_";

            //recursion ahead
            result.push(...generateFromObject(newPrefix, value));
        } else if (value instanceof Array) {
            for (let i in value) {
                let newPrefix = prefix + key.toUpperCase() + "_" + i + "_";

                //recursion ahead
                result.push(...generateFromObject(newPrefix, value))
            }
        } else {
            let name = prefix + key.toUpperCase();

            result.push([name, value])
        }
    }

    return result;
}

function generateFromEnv(prefix, environment) {
    let bc = {};
    for (let curEnv of Object.keys(environment)) {
        try {
            if (curEnv.startsWith(prefix)) {
                let rawName = curEnv.substr(prefix.length).toLowerCase();
                let path = rawName.split('_');
                let curVar = bc;
                for (let i = 0; i < path.length - 1; i++) {
                    let varName = path[i];
                    let varAsNumber = Number.parseInt(varName);
                    if (!Number.isNaN(varAsNumber)) {
                        varName = varAsNumber;
                    }

                    if (!curVar[varName]) {
                        // console.log(`Child does not exist`)
                        if (i + 1 < path.length) {
                            if (!Number.isNaN(Number.parseInt(path[i + 1]))) {
                                //it should be an array
                                curVar[varName] = []
                            } else {
                                //it should be an object
                                curVar[varName] = {}
                            }
                        }
                    }

                    curVar = curVar[varName];
                }

                curVar[path[path.length - 1]] = environment[curEnv]

            }
        } catch (e) {

            console.log(`Problem found with: ${curEnv}: ${e}`)

        }
    }

    return bc;
}

function mergeEnv(prefix, defaultEnv, realEnv) {
    let result = {};

    for (let env of defaultEnv) {
        let name = env[0];
        let value = env[1];

        result[name] = value
    }

    for (let key of Object.keys(realEnv)) {
        if (key.startsWith(prefix)) {
            result[key] = realEnv[key]
        }
    }

    return result;
}

module.exports = {

    /**
     * Parse the (given) environment and return the result as object.
     *
     * @param prefix The prefix of env-variable-names which should be watched. DEFAULT: "CFG_"
     * @param defaults The default values as object. DEFAULT: {}
     * @param environment The environment. DEFAULT: process.env
     */
    parse: function (prefix = "CFG_", defaults = {}, environment = process.env) {
        const emulatedEnv = generateFromObject(prefix, defaults);
        const mergedEnc = mergeEnv(prefix, emulatedEnv, environment);
        const result = generateFromEnv(prefix, mergedEnc);

        return result;
    }
};
