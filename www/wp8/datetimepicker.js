var exec = require('cordova/exec');

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

    DatePicker.prototype.show = function(options, cb) {
      alert('TEST JAVASCRIPT');
    }

    var datePicker = new DatePicker();
    module.exports = datePicker;

    //module.exports = pickerexport;