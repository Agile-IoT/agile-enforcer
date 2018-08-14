"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var agileSDK = require("agile-sdk");
var config_1 = require("./config");
var _ = require("lodash");
var agile = agileSDK(config_1.default);
var EnforcerError = (function () {
    function EnforcerError(_a) {
        var code = _a.code, message = _a.message, data = _a.data;
        this.code = code;
        this.message = message;
        this.data = data;
    }
    return EnforcerError;
}());
exports.EnforcerError = EnforcerError;
var Enforcer = (function () {
    function Enforcer(apiSchema, config) {
        this.apiSchema = apiSchema;
        this.config = config;
    }
    Enforcer.prototype.authorize = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var path, pathOptions, params, ack, err_1, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (!options.req.headers.authorization) {
                            throw new EnforcerError({
                                code: 400,
                                message: 'Missing authorization header'
                            });
                        }
                        else if (!options.apiMethod) {
                            throw new EnforcerError({
                                code: 400,
                                message: 'Missing x-agile-api-method header with requested method'
                            });
                        }
                        if (_.isArray(options.apiMethod)) {
                            options.apiMethod = options.apiMethod[0];
                        }
                        path = this.config.methodMap[options.apiMethod];
                        if (!path) {
                            throw new EnforcerError({
                                code: 400,
                                message: 'Could not find the requested method api path'
                            });
                        }
                        pathOptions = this.apiSchema.paths[path];
                        if (!pathOptions) {
                            throw new EnforcerError({
                                code: 400,
                                message: 'Could not find the requested method api options'
                            });
                        }
                        params = _.merge(Enforcer.extractOptions(options.req.method.toLowerCase(), options.req.path)(pathOptions, path), {
                            origin: this.config.origin
                        });
                        agile.tokenSet(options.req.token);
                        console.log('Checking permissions with params:', params);
                        ack = false;
                        if (!(process.env.ENFORCER_DEV_MODE === 'true')) return [3, 1];
                        ack = true;
                        return [3, 3];
                    case 1: return [4, agile.policies.pdp.evaluate([params])];
                    case 2:
                        ack = _a.sent();
                        _a.label = 3;
                    case 3:
                        agile.tokenSet('');
                        return [2, ack];
                    case 4:
                        err_1 = _a.sent();
                        response = err_1.response;
                        if (err_1 instanceof EnforcerError) {
                            throw err_1;
                        }
                        else if (response) {
                            throw new EnforcerError({
                                code: response.status,
                                message: response.statusText,
                                data: err_1
                            });
                        }
                        else {
                            throw new EnforcerError({
                                code: 500,
                                message: 'Could not check authorization with PDP',
                                data: err_1
                            });
                        }
                        return [3, 5];
                    case 5: return [2];
                }
            });
        });
    };
    Enforcer.extractOptions = function (reqMethod, reqPath) { return function (options, path) {
        var reqSegments = _.reject(reqPath.split('/'), _.isEmpty);
        var segments = _.reject(path.split('/'), _.isEmpty);
        var params = _.map(segments, function (segment) { return /{\w*}/i.test(segment); });
        var entityId = _.head(_.filter(reqSegments, function (reqSegment, i) { return reqSegment && params[i]; }));
        if (entityId) {
            return {
                entityId: entityId,
                target: segments[0],
                method: reqMethod === 'get' ? 'read' : 'write',
                action: "action." + options[reqMethod].operationId.toLowerCase()
            };
        }
        return {
            target: segments[0],
            method: reqMethod === 'get' ? 'read' : 'write',
            action: "action." + options[reqMethod].operationId.toLowerCase()
        };
    }; };
    return Enforcer;
}());
exports.Enforcer = Enforcer;
;
//# sourceMappingURL=index.js.map