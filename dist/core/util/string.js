"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
if (typeof String.prototype.equals !== 'function') {
    String.prototype.equals = function (s, cm) {
        if (!(0, utils_1.hasValue)(s)) {
            return false;
        }
        else {
            switch (cm) {
                case 1 /* StringComparison.CaseInsensitive */:
                    return this.toUpperCase() === s.toUpperCase();
                default: //case sensitive
                    return this.valueOf() === s.valueOf();
            }
        }
    };
}
if (typeof String.prototype.contains !== 'function') {
    String.prototype.contains = function (contains) {
        return (this.indexOf(contains) >= 0);
    };
}
if (typeof String.format !== 'function') {
    String.format = function (format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)(:*)([\w#,/]*)}/g, function (match, number) {
            if (args[number] == null) {
                return String.empty;
            }
            else {
                if (match.contains(":")) {
                    let rawMatch = args[number];
                    let formatChars = match.split(":")[1].split("}")[0];
                    if (typeof rawMatch === 'string') {
                        return typeof args[number] != 'undefined' ? args[number] : match;
                    }
                }
                else {
                    return typeof args[number] != 'undefined' ? args[number] : match;
                }
            }
        });
    };
}
if (typeof String.isNullOrEmpty !== 'function') {
    String.isNullOrEmpty = (str) => !str;
}
else {
    throw new Error("This dialog cannot start due to a compatibility issue (1).");
}
if (typeof String.isNullOrWhiteSpace !== 'function') {
    String.isNullOrWhiteSpace = (str) => { return (!str || (str.trim().length <= 0)); };
}
else {
    throw new Error("This dialog cannot start due to a compatibility issue (1).");
}
if (typeof String.empty !== 'string') {
    String.empty = "";
}
else {
    throw new Error("This dialog cannot start due to a compatibility issue (1).");
}
