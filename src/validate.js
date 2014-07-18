'use strict';

define(['jquery', 'exports'], function ($, exports) {

    var Validate = function (form) {
        this.form = form;
        this.fields = this.form.find('.required');
        this.errors = [];
    };

    Validate.prototype.isEmail = function(field) {
        var regXp = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        return regXp.test($(field).val());
    };

    Validate.prototype.isNotEmpty = function (field) {
        if (  $(field).val() !== '' &&  $(field).val() !== $(field).data('placeholder')  )  {
            return true;
        } else {
            return false;
        }

    };

    Validate.prototype.pushError = function (field) {
        this.errors.push(field);
    };

    Validate.prototype.hook = function (valid, field) {

        this.setValidClass(valid, field);
        if (!valid) {
            this.pushError(field);
        } else {
            return;
        }
    };

    Validate.prototype.meansTo = function (field) {
        var meansToElem = $(this.form.find('.' + $(field).data('means')));
        if (meansToElem.val() === $(field).val()) {
            return true;
        } else {
            return false;
        }
    };

    Validate.prototype.setValidClass = function (valid, field) {
        if (valid) {
            this.success(field);
        } else {
            this.error(field);
        }
    };

    Validate.prototype.error = function (field) {
        $(field).removeClass('input-success');
        $(field).addClass('input-error');
    };

    Validate.prototype.success = function (field) {
        $(field).removeClass('input-error');
        $(field).addClass('input-success');
    };

    Validate.prototype.isValid = function () {
        this.errors = [];
        for (var i = 0, l = this.fields.length; i < l; i++) {
            if (this.isNotEmpty(this.fields[i]) ) {

                this.hook(true, this.fields[i]);

                if ($(this.fields[i]).data('means') !== undefined) {
                    this.hook(this.meansTo(this.fields[i]), this.fields[i]);
                }

                if ($(this.fields[i]).data('validate') === 'email') {
                    this.hook(this.isEmail(this.fields[i]), this.fields[i]);
                }
            } else {
                this.hook(false, this.fields[i]);
            }
        }

        if (this.errors.length <= 0) {
            return true;
        } else {
            return false;
        }
    };

    exports.Validate = Validate;
});
