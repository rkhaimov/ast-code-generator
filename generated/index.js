"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var DefaultDataSource = /** @class */ (function () {
    function DefaultDataSource() {
    }
    DefaultDataSource.prototype.get = function (url) {
        return this.send(url, 'GET');
    };
    DefaultDataSource.prototype["delete"] = function (url) {
        return this.send(url, 'DELETE');
    };
    DefaultDataSource.prototype.post = function (url, body) {
        return this.send(url, 'POST', body);
    };
    DefaultDataSource.prototype.put = function (url, body) {
        return this.send(url, 'PUT', body);
    };
    DefaultDataSource.prototype.fillPath = function (url, payload) {
        return Object.keys(payload).reduce(function (acc, name) {
            return acc.replace("{" + name + "}", payload[name]);
        }, url);
    };
    DefaultDataSource.prototype.pick = function (payload, keys) {
        return keys.reduce(function (acc, key) {
            var _a;
            return __assign({}, acc, (_a = {}, _a[key] = payload[key], _a));
        }, {});
    };
    DefaultDataSource.prototype.toQuery = function (payload) {
        var query = Object.keys(payload).reduce(function (acc, key) {
            return acc + "&" + key + "=" + encodeURIComponent("" + payload[key]);
        }, '?');
        if (query.length === 1) {
            return '';
        }
        return query;
    };
    DefaultDataSource.prototype.getProperty = function (payload, key) {
        return payload[key];
    };
    DefaultDataSource.prototype.send = function (url, method, data) {
        return fetch(url, {
            method: method,
            credentials: 'include',
            body: data && JSON.stringify(data),
        });
    };
    return DefaultDataSource;
}());
exports.DefaultDataSource = DefaultDataSource;
var RepositoryBase = /** @class */ (function () {
    function RepositoryBase() {
        this.source = defaultSource;
    }
    return RepositoryBase;
}());
exports.RepositoryBase = RepositoryBase;
var defaultSource = new DefaultDataSource();
exports.configureSource = function (source) {
    defaultSource = source;
};
var AccountRepositoryClass = /** @class */ (function (_super) {
    __extends(AccountRepositoryClass, _super);
    function AccountRepositoryClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccountRepositoryClass.prototype.account = function () {
        return this.source.get('/api/account');
    };
    AccountRepositoryClass.prototype.signin = function (payload) {
        return this.source.post('/api/account/signin', this.source.getProperty(payload, 'request'));
    };
    AccountRepositoryClass.prototype.refresh = function () {
        return this.source.post('/api/account/refresh');
    };
    AccountRepositoryClass.prototype.logout = function () {
        return this.source.post('/api/account/logout');
    };
    return AccountRepositoryClass;
}(RepositoryBase));
exports.AccountRepositoryClass = AccountRepositoryClass;
var AgreementRepositoryClass = /** @class */ (function (_super) {
    __extends(AgreementRepositoryClass, _super);
    function AgreementRepositoryClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AgreementRepositoryClass.prototype.agreement = function (payload) {
        return this.source.get("" + '/api/agreement' + this.source.toQuery(this.source.pick(payload, [
            'initiator',
            'deadlineFrom',
            'deadlineTo',
            'title',
            'createdFrom',
            'createdTo',
            'status',
            'assignedTo'
        ])));
    };
    AgreementRepositoryClass.prototype.list = function (payload) {
        return this.source.get("" + '/api/agreement/list' + this.source.toQuery(this.source.pick(payload, [
            'initiator',
            'deadlineFrom',
            'deadlineTo',
            'title',
            'createdFrom',
            'createdTo',
            'status',
            'assignedTo'
        ])));
    };
    AgreementRepositoryClass.prototype.count = function (payload) {
        return this.source.get("" + '/api/agreement/count' + this.source.toQuery(this.source.pick(payload, [
            'initiator',
            'deadlineFrom',
            'deadlineTo',
            'title',
            'createdFrom',
            'createdTo',
            'status',
            'assignedTo'
        ])));
    };
    AgreementRepositoryClass.prototype.details = function (payload) {
        return this.source.get(this.source.fillPath('/api/agreement/{id}/details', payload));
    };
    AgreementRepositoryClass.prototype.outcomes = function (payload) {
        return this.source.get(this.source.fillPath('/api/agreement/{id}/outcomes', payload));
    };
    AgreementRepositoryClass.prototype.approvers = function (payload) {
        return this.source.get(this.source.fillPath('/api/agreement/{id}/approvers', payload));
    };
    AgreementRepositoryClass.prototype.delegate = function (payload) {
        return this.source.post(this.source.fillPath('/api/agreement/{id}/delegate', payload), this.source.getProperty(payload, 'request'));
    };
    AgreementRepositoryClass.prototype.processing = function (payload) {
        return this.source.post(this.source.fillPath('/api/agreement/{id}/processing', payload), this.source.getProperty(payload, 'request'));
    };
    AgreementRepositoryClass.prototype.ping = function () {
        return this.source.get('/api/agreement/ping');
    };
    return AgreementRepositoryClass;
}(RepositoryBase));
exports.AgreementRepositoryClass = AgreementRepositoryClass;
var LogRepositoryClass = /** @class */ (function (_super) {
    __extends(LogRepositoryClass, _super);
    function LogRepositoryClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LogRepositoryClass.prototype.logger = function () {
        return this.source.get('/logger');
    };
    return LogRepositoryClass;
}(RepositoryBase));
exports.LogRepositoryClass = LogRepositoryClass;
var OutsourcingRepositoryClass = /** @class */ (function (_super) {
    __extends(OutsourcingRepositoryClass, _super);
    function OutsourcingRepositoryClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OutsourcingRepositoryClass.prototype.outsourcing = function (payload) {
        return this.source.get("" + '/api/outsourcing' + this.source.toQuery(this.source.pick(payload, [
            'taskName',
            'minDate',
            'maxDate'
        ])));
    };
    OutsourcingRepositoryClass.prototype.list = function (payload) {
        return this.source.get("" + '/api/outsourcing/list' + this.source.toQuery(this.source.pick(payload, [
            'taskName',
            'minDate',
            'maxDate'
        ])));
    };
    OutsourcingRepositoryClass.prototype.count = function (payload) {
        return this.source.get("" + '/api/outsourcing/count' + this.source.toQuery(this.source.pick(payload, [
            'taskName',
            'minDate',
            'maxDate'
        ])));
    };
    OutsourcingRepositoryClass.prototype.details = function (payload) {
        return this.source.get(this.source.fillPath('/api/outsourcing/{id}/details', payload));
    };
    OutsourcingRepositoryClass.prototype.outcomes = function (payload) {
        return this.source.get(this.source.fillPath('/api/outsourcing/{id}/outcomes', payload));
    };
    OutsourcingRepositoryClass.prototype.approvers = function (payload) {
        return this.source.get(this.source.fillPath('/api/outsourcing/{id}/approvers', payload));
    };
    OutsourcingRepositoryClass.prototype.delegate = function (payload) {
        return this.source.post(this.source.fillPath('/api/outsourcing/{id}/delegate', payload), this.source.getProperty(payload, 'request'));
    };
    OutsourcingRepositoryClass.prototype.processing = function (payload) {
        return this.source.post(this.source.fillPath('/api/outsourcing/{id}/processing', payload), this.source.getProperty(payload, 'request'));
    };
    OutsourcingRepositoryClass.prototype.ping = function () {
        return this.source.get('/api/outsourcing/ping');
    };
    return OutsourcingRepositoryClass;
}(RepositoryBase));
exports.OutsourcingRepositoryClass = OutsourcingRepositoryClass;
var OvertimeRepositoryClass = /** @class */ (function (_super) {
    __extends(OvertimeRepositoryClass, _super);
    function OvertimeRepositoryClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OvertimeRepositoryClass.prototype.overtime = function (payload) {
        return this.source.get("" + '/api/overtime' + this.source.toQuery(this.source.pick(payload, [
            'taskName',
            'minDate',
            'maxDate'
        ])));
    };
    OvertimeRepositoryClass.prototype.list = function (payload) {
        return this.source.get("" + '/api/overtime/list' + this.source.toQuery(this.source.pick(payload, [
            'taskName',
            'minDate',
            'maxDate'
        ])));
    };
    OvertimeRepositoryClass.prototype.count = function (payload) {
        return this.source.get("" + '/api/overtime/count' + this.source.toQuery(this.source.pick(payload, [
            'taskName',
            'minDate',
            'maxDate'
        ])));
    };
    OvertimeRepositoryClass.prototype.details = function (payload) {
        return this.source.get(this.source.fillPath('/api/overtime/{id}/details', payload));
    };
    OvertimeRepositoryClass.prototype.outcomes = function (payload) {
        return this.source.get(this.source.fillPath('/api/overtime/{id}/outcomes', payload));
    };
    OvertimeRepositoryClass.prototype.approvers = function (payload) {
        return this.source.get(this.source.fillPath('/api/overtime/{id}/approvers', payload));
    };
    OvertimeRepositoryClass.prototype.delegate = function (payload) {
        return this.source.post(this.source.fillPath('/api/overtime/{id}/delegate', payload), this.source.getProperty(payload, 'request'));
    };
    OvertimeRepositoryClass.prototype.processing = function (payload) {
        return this.source.post(this.source.fillPath('/api/overtime/{id}/processing', payload), this.source.getProperty(payload, 'request'));
    };
    OvertimeRepositoryClass.prototype.ping = function () {
        return this.source.get('/api/overtime/ping');
    };
    return OvertimeRepositoryClass;
}(RepositoryBase));
exports.OvertimeRepositoryClass = OvertimeRepositoryClass;
var PaymentRequestRepositoryClass = /** @class */ (function (_super) {
    __extends(PaymentRequestRepositoryClass, _super);
    function PaymentRequestRepositoryClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PaymentRequestRepositoryClass.prototype.list = function () {
        return this.source.get('/api/paymentrequest/list');
    };
    PaymentRequestRepositoryClass.prototype.details = function (payload) {
        return this.source.get(this.source.fillPath('/api/paymentrequest/{id}/details', payload));
    };
    return PaymentRequestRepositoryClass;
}(RepositoryBase));
exports.PaymentRequestRepositoryClass = PaymentRequestRepositoryClass;
var TaskRepositoryClass = /** @class */ (function (_super) {
    __extends(TaskRepositoryClass, _super);
    function TaskRepositoryClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskRepositoryClass.prototype.tasks = function (payload) {
        return this.source.get("" + '/api/tasks' + this.source.toQuery(this.source.pick(payload, [
            'taskName',
            'minDate',
            'maxDate'
        ])));
    };
    TaskRepositoryClass.prototype.count = function (payload) {
        return this.source.get("" + '/api/tasks/count' + this.source.toQuery(this.source.pick(payload, [
            'taskName',
            'minDate',
            'maxDate'
        ])));
    };
    return TaskRepositoryClass;
}(RepositoryBase));
exports.TaskRepositoryClass = TaskRepositoryClass;
var TestRepositoryClass = /** @class */ (function (_super) {
    __extends(TestRepositoryClass, _super);
    function TestRepositoryClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestRepositoryClass.prototype.ping = function () {
        return this.source.get('/api/test/ping');
    };
    TestRepositoryClass.prototype.authorized = function () {
        return this.source.get('/api/test/authorized');
    };
    TestRepositoryClass.prototype.error = function () {
        return this.source.get('/api/test/error');
    };
    TestRepositoryClass.prototype.signin = function (payload) {
        return this.source.post('/api/test/signin', this.source.getProperty(payload, 'request'));
    };
    return TestRepositoryClass;
}(RepositoryBase));
exports.TestRepositoryClass = TestRepositoryClass;
var UserRepositoryClass = /** @class */ (function (_super) {
    __extends(UserRepositoryClass, _super);
    function UserRepositoryClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserRepositoryClass.prototype.users = function () {
        return this.source.get('/api/users');
    };
    return UserRepositoryClass;
}(RepositoryBase));
exports.UserRepositoryClass = UserRepositoryClass;
var VacationRepositoryClass = /** @class */ (function (_super) {
    __extends(VacationRepositoryClass, _super);
    function VacationRepositoryClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VacationRepositoryClass.prototype.vacation = function (payload) {
        return this.source.get("" + '/api/vacation' + this.source.toQuery(this.source.pick(payload, [
            'taskName',
            'minDate',
            'maxDate'
        ])));
    };
    VacationRepositoryClass.prototype.list = function (payload) {
        return this.source.get("" + '/api/vacation/list' + this.source.toQuery(this.source.pick(payload, [
            'taskName',
            'minDate',
            'maxDate'
        ])));
    };
    VacationRepositoryClass.prototype.count = function (payload) {
        return this.source.get("" + '/api/vacation/count' + this.source.toQuery(this.source.pick(payload, [
            'taskName',
            'minDate',
            'maxDate'
        ])));
    };
    VacationRepositoryClass.prototype.details = function (payload) {
        return this.source.get(this.source.fillPath('/api/vacation/{id}/details', payload));
    };
    VacationRepositoryClass.prototype.outcomes = function (payload) {
        return this.source.get(this.source.fillPath('/api/vacation/{id}/outcomes', payload));
    };
    VacationRepositoryClass.prototype.approvers = function (payload) {
        return this.source.get(this.source.fillPath('/api/vacation/{id}/approvers', payload));
    };
    VacationRepositoryClass.prototype.delegate = function (payload) {
        return this.source.post(this.source.fillPath('/api/vacation/{id}/delegate', payload), this.source.getProperty(payload, 'request'));
    };
    VacationRepositoryClass.prototype.processing = function (payload) {
        return this.source.post(this.source.fillPath('/api/vacation/{id}/processing', payload), this.source.getProperty(payload, 'request'));
    };
    VacationRepositoryClass.prototype.ping = function () {
        return this.source.get('/api/vacation/ping');
    };
    return VacationRepositoryClass;
}(RepositoryBase));
exports.VacationRepositoryClass = VacationRepositoryClass;
