cordova.define("com.plugin.datepicker.datetimepicker", function(require, exports, module) { var exec = require('cordova/exec');

    var pickerexport = {};



    /**
    * Open DateTime picker to select a date
    *
    * @param {Function} successCallback
    * @param {Function} errorCallback
    * @param {Object} options - additional options: 'value' - initial value for date
    */
    pickerexport.selectDate = function (successCallback, errorCallback, options) {
        if (successCallback && (typeof successCallback !== "function")) {
            console.log("DateTimePicker Error: successCallback is not a function");
            return;
        }

        if (errorCallback && (typeof errorCallback !== "function")) {
            console.log("DateTimePicker Error: errorCallback is not a function");
            return;
        }

        exec(function (res) {

            successCallback(new Date(parseFloat(res)));

        }, errorCallback, "DateTimePicker", "selectDate", options.value);
    };

    /**
    * Open DateTime picker to select a time
    *
    * @param {Function} successCallback
    * @param {Function} errorCallback
    * @param {Object} options - additional options: 'value' - initial value for time
    */
    pickerexport.selectTime = function (successCallback, errorCallback, options) {
        if (successCallback && (typeof successCallback !== "function")) {
            console.log("DateTimePicker Error: successCallback is not a function");
            return;
        }

        if (errorCallback && (typeof errorCallback !== "function")) {
            console.log("DateTimePicker Error: errorCallback is not a function");
            return;
        }

        exec(function (res) {

         successCallback(new Date(parseFloat(res)));

        }, errorCallback, "DateTimePicker", "selectTime", options.value);
    };


    function DatePicker() {
      this._callback;
    }

    DatePicker.prototype.show = function (options, cb) {
        var padDate = function (date) {
            if (date.length == 1) {
                return ("0" + date);
            }
            return date;
        };
        
        var formatDate = function (date) {
            date = new Date(date);
            /*
            date = date.getFullYear()
                  + "-"
                  + padDate(date.getMonth() + 1)
                  + "-"
                  + padDate(date.getDate())
                  + "T"
                  + padDate(date.getHours())
                  + ":"
                  + padDate(date.getMinutes())
                  + ":00Z";
                  */
            //date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
            date = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours()-1, date.getMinutes(), date.getSeconds(), date.getMilliseconds());
            return date
        }
        if (options.date) {
            options.date = formatDate(options.date);
        }

        if (options.minDate) {
            options.minDate = formatDate(options.minDate);
        }

        if (options.maxDate) {
            options.maxDate = formatDate(options.maxDate);
        }

        this._callback = cb;
        var onSuccess = function (date) {
            var d = new Date(parseInt(date,10));
            console.log(d);
            if (cb) {
                cb(d);
            }
        }
        if (options.mode == 'date') {
            exec(onSuccess,
              null,
              "DateTimePicker",
              "selectDate",
              [options.date]
            );
        } else {
            exec(onSuccess,
              null,
              "DateTimePicker",
              "selectTime",
              [options.date]
            );
        }
    }
    DatePicker.prototype._dateSelected = function (date) {
        var d = new Date(parseFloat(date) * 1000);
        if (cb) {
            cb(d);
        }
    }

    var datePicker = new DatePicker();
    module.exports = datePicker;
    if (!window.plugins) {
        window.plugins = {};
    }
    if(!window.plugins.datePciker) {
        window.plugins.datePicker = datePicker;
    }
    //module.exports = pickerexport;
});
