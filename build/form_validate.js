/**
* Simple Encapsulation Class template
*/
(function (root) {

	"use strict";

	/**
	 * Common object params
	 * @type {Object}
	 */
	var common = {
			publicMethods: ['validate', 'formatString', 'destroy', 'reload', 'getFormHandle', 'getFields', 'showErrors', 'hideErrors'],
			className: 'Validator'
		},

		// main constructor
		Protected = function (formHandle, submitCallback, settings) {

			formHandle.JsValidator = this;

			this.settings = {

				// Validation of a current field after the events of "change", "keyup", "blur"
			    onAir: true,

			    // Show validation errors
			    showErrors: true,

			    // Auto-hide the error messages
			    autoHideErrors: false,

			    // Timeout auto-hide error messages
			    autoHideErrorsTimeout: 2000,

			    // Language error messages
			    locale: 'rus',

			    // Object for custom error messages
			    messages: {},

			    // Object for custom rules
			    rules: {},

			    // classname for error messages
			    errorClassName: 'error',

			    // remove spaces from validation field values
			    removeSpaces: false,

			    // tracking of new elements
			    autoTracking: true,

			    // events list for binding
			    eventsList: ['keyup', 'change', 'blur']
			};
			

			var self = this;

			// set handle
			this.formHandle = formHandle || null;

			// set callback
			this.submitCallback = submitCallback || null;

			// get fields and rules
			this.fields = this.getFields(this.formHandle.querySelectorAll('[data-rule]'));


			// apply custom settings
			this.applySettings(settings || {});

			this.submitCallback = this.submitCallback.bind(this);
			this._eventChangeWithDelay = this._eventChangeWithDelay.bind(this);
			this._eventChange = this._eventChange.bind(this);
			this._eventSubmit = this._eventSubmit.bind(this);



			// bind events
			this.submitCallback && this.eventsBuilder('addEventListener');

			return this;
		};


	/**
	 * Main prototype
	 * @type {Object}
	 */
	Protected.prototype = {

		messages: {
					    
			// Russian
		    rus: {
		        required: {
		            empty: 'Это поле нужно заполнить',
		            incorrect: 'Некорректное значение'
		        },
		       
		        build: {
		            empty: 'Введите номер дома',
		            incorrect: 'Некорректно заполнено, введите целое число'
		        },
		        
		        name: {
		            empty: 'Введите ваше имя',
		            incorrect: 'Некорректно введено имя'
		        },

		        street: {
		            empty: 'Укажите улицу',
		            incorrect: 'Некорректно введена улица'
		        },

		        phone: {
		            empty: 'Введите номер телефона',
		            incorrect: 'Некорректно заполнено, введите минимум 6 цифр'
		        },    
		    }
		},

		// rules
		rules: {

		    required: function (value) {
		        return '' !== value;
		    },

		    build: function (value) {
		        return new RegExp(/^[1-9]+$/gi).test(value);
		    },
		  
		    name: function (value) {
		        if (value.length > 0 && value.length < 3) {
		            return false;
		        }
		        return new RegExp(/^[a-zA-Z\sа-яА-ЯёЁ\-]+$/g).test(value);
		    },

		    street: function (value) {
		       if (value.length > 0 && value.length < 3) {
		            return false;
		        }
		        return new RegExp(/^[a-zA-Z\sа-яА-ЯёЁ\0-9\- ']+$/g).test(value);
		    },

		    phone: function (value) {
		        if (value.replace(/[^0-9]+/gi, '').match(/[0-9]+/gi) && value.replace(/[^0-9]+/gi, '').match(/[0-9]+/gi)[0].length < 6) {
		            return false;
		        }
		        return new RegExp(/^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/g).test(value);
		    },
		},
	// reg exp for russian phone number /^((\+7|7|8)+([0-9]){10})$/gm
		orderFields: function (attrName, attrValue) {

		    var self = this,
		    	retObj = {};

		    !!attrName && !!attrValue && Object.keys(this.fields).forEach(function (field) {
		    	if (self.fields[field].handle[attrName] && self.fields[field].handle[attrName] === attrValue) {
		    	    retObj[field] = self.fields[field];
		    	}
		    });

		    return retObj;
		},

		_eventSubmit: function (e) {

		    e.preventDefault();

		    //hide errors
		    this.hideErrors(false, true);

		    //show errors if validation failure
		    !this.validate() && this.showErrors();

		    //callback
		    (this.submitCallback(this.errors || null, this.errors ? false : true) === true);
		// (this.submitCallback(this.errors || null, this.errors ? false : true) === true) && this.formHandle.submit();
		},

		_eventChange: function (e) {

			var radioBtns,
				self = this;

			//remove spaces
			if (this.settings.removeSpaces && new RegExp(/\s{2,}/g).test(e.target.value)) {
			    e.target.value = e.target.value.replace(/\s{2,}/g, ' ');
			}

			//if is radio buttons
			if (e.target.type === 'radio') {

			    //get radio groupe
			    radioBtns = this.orderFields('name', e.target.name);

			    Object.keys(radioBtns).forEach(function (btn) {
			    	self.hideErrors(radioBtns[btn].handle);
			    });

			} else {
			    //hide errors for this
			    this.hideErrors(e.target);
			}




			//validate and show errors for this
			if (!this.validate(e.target)) {

			    this.showErrors(e.target);
			    !this.settings.showErrors && this.submitCallback(this.errors, false);
			    
			}
		},

		_eventChangeWithDelay: function (e) {
			var self = this;

		    if (this.intervalID) {
		        clearTimeout(this.intervalID);
		    }

		    this.intervalID = setTimeout(function () {
		        self._eventChange.apply(self, [e]);
		    }, 400);
		},
		
		applySettings: function (settings) {

			var self = this;

			// apply rules
			settings.rules && Object.keys(settings.rules).forEach(function(ruleName) {
				self.rules[ruleName] = settings.rules[ruleName];
			});

			// apply messages
			settings.messages && Object.keys(settings.messages).forEach(function(locale) {
			    Object.keys(settings.messages[locale]).forEach(function (ruleName) {
			    	Object.keys(settings.messages[locale][ruleName]).forEach(function (param) {
			    		self.settings.messages[locale] = self.settings.messages[locale] || {};
			    		self.settings.messages[locale][ruleName] = self.settings.messages[locale][ruleName] || {};
			    		self.settings.messages[locale][ruleName][param] = settings.messages[locale][ruleName][param];
			    	});
			    });
			});

			// apply other settings
			Object.keys(settings).forEach(function (param) {
				self.settings[param] = settings[param];
			});

			return this;
		},

		getFields: function (fields) {

			var retData = {},
				rules = [],
				params = [];

			fields = fields || this.formHandle.querySelectorAll('[data-rule]');

			// each fields with data-rule attribute
			Object.keys(fields).forEach(function (fieldIndex) {

				rules = fields[fieldIndex].getAttribute('data-rule').split('|');

				Object.keys(rules).forEach(function (ruleIndex) {

					// parse rule
					if (rules[ruleIndex].match(/-/gi)) {

					    params = rules[ruleIndex].split('-');
					    rules[ruleIndex] = params[0];
					    params = params.splice(1);

					    rules[ruleIndex] = [rules[ruleIndex], params];
					} else {
					    rules[ruleIndex] = [rules[ruleIndex], []];
					}
				});

				retData[fieldIndex] = {
				    name: fields[fieldIndex].getAttribute('name'),
				    rules: rules,
				    defaultValue: fields[fieldIndex].getAttribute('data-default'),
				    handle: fields[fieldIndex],
				    intervalID: null
				};
			});

			return retData;
		},

		validate: function (validationField) {

			var self = this,
				fields = validationField ? this.getFields([validationField]) : this.fields,
				result,
				ruleName,
				params,
				defaultValue,
				value,
				message,
				messageType = null;

			this.errors = this.errors ? null : this.errors;

			Object.keys(fields).forEach(function (n) {
				
				result = true;

				// loop rules of this field
				fields[n].rules && Object.keys(fields[n].rules).forEach(function (ruleIndex) {
					
					// set rule data
					ruleName = fields[n].rules[ruleIndex][0];
					params = fields[n].rules[ruleIndex][1];
					defaultValue = fields[n].defaultValue;
					value = fields[n].handle.value;

					if (result && !(value === '' && !fields[n].rules.join('|').match(/\|{0,1}required\|{0,1}/))) {

						// if exist default value and value is eq default
						if (result && defaultValue && value !== defaultValue) {

						    result = false;
						    messageType = 'incorrect';

						// if default value not exist
						} else if (result && self.rules[ruleName] && !self.rules[ruleName](value, params)) {

						    // set message to empty data
						    if ('' === value) {
						        result = false;
						        messageType = 'empty';

						    // set message to incorrect data
						    } else {
						        result = false;
						        messageType = 'incorrect';
						    }
						}

						if (result) {
						    self.hideErrors(fields[n].handle, true);
						
						} else {

						    // define errors stack if not exist
						    self.errors = self.errors || {};

						    // append error messages
						    try {
						        try {
						            message = self.settings.messages[self.settings.locale][ruleName][messageType];
						        } catch (e) {
						            message = self.messages[self.settings.locale][ruleName][messageType];
						        }
						    } catch (e) {
						        ruleName = 'required';
						        message = self.messages.en[ruleName][messageType];
						    }

						    // push value into params if params is empty
						    !params.length && params.push(value);

						    // add errors
						    self.errors[n] = {
						        name: fields[n].name,
						        errorText: self.formatString(message, params)
						    };

						    // call callback if exist
						    if (!self.submitCallback) {
						        self.errors[n].handle = fields[n].handle;
						    }
						}
					}
				});
			});


			// run callback if callback is exists and not errors or return error data object
			if (this.submitCallback) {
			    return (this.errors) ? false : true;
			}

			return this.errors || true;

		},

		hideErrors: function (validationField, removeClass) {

		    var self = this,
		    	errorDiv;


			Object.keys(this.fields).forEach(function (n) {
		       	if ((validationField && validationField === self.fields[n].handle) || !validationField) {

		       		errorDiv = self.fields[n].handle.nextElementSibling;

		       		// remove class error
					removeClass && self.fields[n].handle.classList.remove(self.settings.errorClassName);

					// remove error element
		       		errorDiv && (errorDiv.getAttribute('data-type') === 'validator-error') && errorDiv.parentNode.removeChild(errorDiv);
		       	}
			});

		},

		showErrors: function (validationField) {

			var self = this,
				errorDiv,
				insertNodeError = function (refNode, errorObj) {

					// set error class
					refNode.classList.add(self.settings.errorClassName);

					// check to error div element exist
					if (refNode.nextElementSibling && refNode.nextElementSibling.getAttribute('data-type') === 'validator-error') {
						return;
					}

					// insert error element
					if (self.settings.showErrors) {
						errorDiv = document.createElement('div');
						errorDiv.setAttribute('class', self.settings.errorClassName);
						errorDiv.setAttribute('data-type', 'validator-error');
						errorDiv.innerHTML = errorObj.errorText;
						refNode.parentNode.insertBefore(errorDiv, refNode.nextSibling);
					}
				};




			Object.keys(this.errors).forEach(function (r) {
				
				// show error to specified field
				if (validationField) {

					Object.keys(self.fields).forEach(function (n) {
						(self.fields[n].handle.getAttribute('name') === validationField.getAttribute('name')) && insertNodeError(self.fields[n].handle, self.errors[r]);
					});

				// show error to all fields
				} else {
				    if (r === '0' || (r > 0 && self.fields[r].name !== self.fields[r - 1].name)) {
				        insertNodeError(self.fields[r].handle, self.errors[r]);
				    }
				}
			});





			// auto hide errors
			if (this.settings.autoHideErrors) {
				
				// for all fields
				if (!validationField) {

				    if (this.intervalID) {
				        clearTimeout(this.intervalID);
				    }

				    this.intervalID = setTimeout(function () {
				        self.intervalID = null;
				        self.hideErrors(false);
				    }, this.settings.autoHideErrorsTimeout);

				// for current field
				} else {

				    if (validationField.intervalID) {
				        clearTimeout(validationField.intervalID);
				    }

				    if (!this.intervalID) {
				        validationField.intervalID = setTimeout(function () {
				            validationField.intervalID = null;
				            self.hideErrors(validationField);
				        }, this.settings.autoHideErrorsTimeout);
				    }
				}
			}
		},


		/*
		* Get Form handle
		* @return {element} - Form handle
		*/
		getFormHandle: function () {
		    return this.formHandle;
		},

		/*
		* Formatting string. Replace string
		* @param {string} string - Source string. Example: "{0} age {1} years."
		* @param {array} params - An array of values​​, which will be replaced with markers. Example: ['Bob', 36]
		* @return {string} - Formatted string with replacing markers. Example "Bob age 36 years"
		*/
		formatString: function (string, params) {
		    return string.replace(/\{(\d+)\}/gi, function (match, number) {
		        return (match && params[number]) ? params[number] : '';
		    });
		},

		/*
		* Destroy validator
		*/
		destroy: function () {
		   
		    //hide errors
		    this.hideErrors(false, true);

		    // remove events
		    this.eventsBuilder('removeEventListener');
		},

		/*
		* Reload validator.
		* Example 1: reload(function (err, res) {...}, {autoHideErrors: false})
		* Example 2: reload({autoHideErrors: false})
		* @param {function} [submitCallback] - Submit callback function
		* @param {object} [settings] - Settings object
		*/
		reload: function (submitCallback, settings) {

			this.destroy();

		    //set variables
		    switch (arguments.length) {

		    case 2:
		        this.submitCallback = submitCallback;
		        this.settings = settings;
		       	break;

		    case 1:
		        this.settings = submitCallback;
		        break;
		    }

		    this.fields = this.getFields(this.formHandle.querySelectorAll('[data-rule]'));
		    this.submitCallback && this.eventsBuilder('addEventListener');
		    this.applySettings(settings || {});
		},

		eventsBuilder: function (actionName) {

			var self = this;


			this.formHandle[actionName]('submit', this._eventSubmit);

			// air mode
			this.settings.onAir && Object.keys(this.fields).forEach(function (field) {
				
				[].forEach.call(self.settings.eventsList, function (event) {

					if (event === 'keyup') {
					    self.fields[field].handle[actionName](event, self._eventChangeWithDelay);
					} else {
					    self.fields[field].handle[actionName](event, self._eventChange);
					}
					
				});
			});	
		}
	};

	/**
	 * Encapsulation
	 * @return {Object} - this handle
	 */
	
	root[common.className] = function () {

		function construct(constructor, args) {

			function Class() {
				return constructor.apply(this, args);
			}
			Class.prototype = constructor.prototype;
			return new Class();
		}

		var original = construct(Protected, arguments),
			Publicly = function () {};

		Publicly.prototype = {};
		[].forEach.call(common.publicMethods, function (member) {
			Publicly.prototype[member] = function () {
				return original[member].apply(original, arguments);
			};
		});

		return new Publicly(arguments);
	};

}(this));