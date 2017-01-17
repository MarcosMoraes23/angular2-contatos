"use strict";
var DialogService = (function () {
    function DialogService() {
    }
    DialogService.prototype.confirm = function (message) {
        return new Promise(function (resolve) {
            return resolve(window.confirm(message || 'Confirmar?'));
        });
    };
    return DialogService;
}());
exports.DialogService = DialogService;
//# sourceMappingURL=dialog.service.js.map