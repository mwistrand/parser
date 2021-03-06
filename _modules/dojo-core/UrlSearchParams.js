(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports", './lang'], function (require, exports) {
    var lang_1 = require('./lang');
    /**
     * Parses a query string, returning a ParamList object.
     */
    function parseQueryString(input) {
        var query = {};
        for (var _i = 0, _a = input.split('&'); _i < _a.length; _i++) {
            var entry = _a[_i];
            var indexOfFirstEquals = entry.indexOf('=');
            var key = void 0;
            var value = void 0;
            if (indexOfFirstEquals >= 0) {
                key = entry.slice(0, indexOfFirstEquals);
                value = entry.slice(indexOfFirstEquals + 1);
            }
            else {
                key = entry;
            }
            key = key ? decodeURIComponent(key) : '';
            value = value ? decodeURIComponent(value) : '';
            if (key in query) {
                query[key].push(value);
            }
            else {
                query[key] = [value];
            }
        }
        return query;
    }
    /**
     * Represents a set of URL query search parameters.
     */
    var UrlSearchParams = (function () {
        /**
         * Constructs a new UrlSearchParams from a query string, an object of parameters and values, or another
         * UrlSearchParams.
         */
        function UrlSearchParams(input) {
            var list;
            if (input instanceof UrlSearchParams) {
                // Copy the incoming UrlSearchParam's internal list
                list = lang_1.duplicate(input._list);
            }
            else if (typeof input === 'object') {
                // Copy the incoming object, assuming its property values are either arrays or strings
                list = {};
                for (var key in input) {
                    var value = input[key];
                    if (Array.isArray(value)) {
                        list[key] = value.length ? value.slice() : [''];
                    }
                    else if (value == null) {
                        list[key] = [''];
                    }
                    else {
                        list[key] = [value];
                    }
                }
            }
            else if (typeof input === 'string') {
                // Parse the incoming string as a query string
                list = parseQueryString(input);
            }
            else {
                list = {};
            }
            Object.defineProperty(this, '_list', { value: list });
        }
        /**
         * Appends a new value to the set of values for a key.
         * @param key The key to add a value for
         * @param value The value to add
         */
        UrlSearchParams.prototype.append = function (key, value) {
            if (!this.has(key)) {
                this.set(key, value);
            }
            else {
                this._list[key].push(value);
            }
        };
        /**
         * Deletes all values for a key.
         * @param key The key whose values are to be removed
         */
        UrlSearchParams.prototype.delete = function (key) {
            // Set to undefined rather than deleting the key, for better consistency across browsers.
            // If a deleted key is re-added, most browsers put it at the end of iteration order, but IE maintains
            // its original position.  This approach maintains the original position everywhere.
            this._list[key] = undefined;
        };
        /**
         * Returns the first value associated with a key.
         * @param key The key to return the first value for
         * @return The first string value for the key
         */
        UrlSearchParams.prototype.get = function (key) {
            if (!this.has(key)) {
                return null;
            }
            return this._list[key][0];
        };
        /**
         * Returns all the values associated with a key.
         * @param key The key to return all values for
         * @return An array of strings containing all values for the key
         */
        UrlSearchParams.prototype.getAll = function (key) {
            if (!this.has(key)) {
                return null;
            }
            return this._list[key];
        };
        /**
         * Returns true if a key has been set to any value, false otherwise.
         * @param key The key to test for existence
         * @return A boolean indicating if the key has been set
         */
        UrlSearchParams.prototype.has = function (key) {
            return Array.isArray(this._list[key]);
        };
        /**
         * Returns an array of all keys which have been set.
         * @return An array of strings containing all keys set in the UrlSearchParams instance
         */
        UrlSearchParams.prototype.keys = function () {
            var keys = [];
            for (var key in this._list) {
                if (this.has(key)) {
                    keys.push(key);
                }
            }
            return keys;
        };
        /**
         * Sets the value associated with a key.
         * @param key The key to set the value of
         */
        UrlSearchParams.prototype.set = function (key, value) {
            this._list[key] = [value];
        };
        /**
         * Returns this object's data as an encoded query string.
         * @return A string in application/x-www-form-urlencoded format containing all of the set keys/values
         */
        UrlSearchParams.prototype.toString = function () {
            var query = [];
            for (var key in this._list) {
                if (!this.has(key)) {
                    continue;
                }
                var values = this._list[key];
                var encodedKey = encodeURIComponent(key);
                for (var _i = 0; _i < values.length; _i++) {
                    var value = values[_i];
                    query.push(encodedKey + (value ? ('=' + encodeURIComponent(value)) : ''));
                }
            }
            return query.join('&');
        };
        return UrlSearchParams;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = UrlSearchParams;
});
//# sourceMappingURL=_debug/UrlSearchParams.js.map