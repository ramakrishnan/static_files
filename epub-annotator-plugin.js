var EpubAnnotator =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _viewer = __webpack_require__(1);

	var _viewer2 = _interopRequireDefault(_viewer);

	var _editor = __webpack_require__(2);

	var _editor2 = _interopRequireDefault(_editor);

	var _service = __webpack_require__(3);

	var _service2 = _interopRequireDefault(_service);

	var _annotation_update = __webpack_require__(5);

	var _annotation_update2 = _interopRequireDefault(_annotation_update);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AdderTemplate = __webpack_require__(6);
	var EditorTemplate = __webpack_require__(7);

	var EpubAnnotation = function () {
	    function EpubAnnotation() {
	        _classCallCheck(this, EpubAnnotation);
	    }

	    _createClass(EpubAnnotation, [{
	        key: 'init',
	        value: function init(config) {
	            var annotatorService = new _service2.default();
	            annotatorService.config = config;
	            console.log('Annotation init is called with config', config);
	            var app = new annotator.App();
	            app.include(annotator.ui.main, {
	                element: document.body,
	                viewerExtensions: [_viewer2.default],
	                editorExtensions: [_editor2.default]
	            }).include(_annotation_update2.default);
	            annotator.ui.adder.Adder.template = AdderTemplate;
	            annotator.ui.editor.Editor.template = EditorTemplate;
	            app.start().then(function () {
	                // Example on config useage to customize UI
	                if (config.highlights === false) {
	                    $('.annotator-adder').find('.js-highlight').remove();
	                }
	                $('.annotator-adder').on('click', 'p', annotatorService.showText.bind(annotatorService));
	                $('.annotator-editor').on('click', '.colorPickers div', annotatorService.setColor.bind(annotatorService));
	                // Example of annotation to be received from Host App
	                /* var annotations = [{
	                    "id": 0,
	                    "quote": "",
	                    "text": "",
	                    "type": "highlight",
	                    "color": "hg_00FF00",
	                    "ranges": [{
	                        "end": "/section[1]/ul[1]/li[5]/p[1]",
	                        "endOffset": 43,
	                        "start": "/section[1]/ul[1]/li[1]/p[1]",
	                        "startOffset": 0
	                    }]
	                }];*/
	                annotatorService.restoreAnnotation(annotations);
	            });
	        }
	    }]);

	    return EpubAnnotation;
	}();

	module.exports = new EpubAnnotation();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (view) {
	    var _superRender = view.render;
	    view.render = function (annotation) {
	        var annotatorListing = $(this.element).find('.annotator-listing');
	        if (annotation.text) {
	            annotatorListing.removeClass('only-highlight');
	            return _superRender(annotation);
	        } else {
	            annotatorListing.addClass('only-highlight');
	            return '<i></i>';
	        }
	    };
	};

	;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (editor) {
	    var editorLoader = function editorLoader(field, annotation) {
	        var fieldContainer = $(field).parent().find('textarea').parent();
	        if (annotation.type === 'highlight') {
	            fieldContainer.hide();
	        } else {
	            fieldContainer.show();
	        }
	        $(field).hide();
	    };
	    var submitAnnotation = function submitAnnotation(field, annotation) {
	        annotation.color = $('.colorPickers').find('.selected').data('color');
	        if (annotation.text === '') {
	            annotation.type = 'highlight';
	        } else {
	            annotation.type = 'annotation';
	        }
	    };
	    editor.addField({
	        label: 'Dummy element',
	        load: editorLoader,
	        submit: submitAnnotation
	    });
	};

	;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _plugin_data = __webpack_require__(4);

	var _plugin_data2 = _interopRequireDefault(_plugin_data);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EpubAnnotatorService = function () {
	    function EpubAnnotatorService() {
	        _classCallCheck(this, EpubAnnotatorService);

	        this._config;
	    }

	    _createClass(EpubAnnotatorService, [{
	        key: 'prepareEditorFor',
	        value: function prepareEditorFor(action) {
	            var editorUl = $('.annotator-editor ul');
	            switch (action) {
	                case 'js-highlight':
	                    editorUl.hide();
	                    break;
	                case 'js-annotate':
	                    editorUl.show();
	                    break;
	            }
	        }
	    }, {
	        key: 'showText',
	        value: function showText(event) {
	            event.stopImmediatePropagation();
	            var currentAction = $(event.currentTarget)[0].className;
	            this.prepareEditorFor(currentAction);
	            $('.annotator-adder >button').click();
	        }
	    }, {
	        key: 'setColor',
	        value: function setColor(event) {
	            var element = $(event.currentTarget);
	            element.parent().find('.selected').removeClass('selected');
	            element.addClass('selected');
	            _plugin_data2.default.color = element.data('color');
	        }
	    }, {
	        key: 'restoreAnnotation',
	        value: function restoreAnnotation(annotations) {
	            // FIXME:- Try to group all annotations based on color, and call highlighter.drawAll for a set of annotations.
	            annotations.forEach(function (annotation) {
	                var Highlighter = new annotator.ui.highlighter.Highlighter();
	                var highlight = new annotator.ui.highlighter.Highlighter(document.body, {
	                    highlightClass: [Highlighter.options.highlightClass, annotation.color].join(' ')
	                });
	                highlight.draw(annotation);
	            });
	        }
	    }, {
	        key: 'config',
	        set: function set(val) {
	            this._config = val;
	        }
	    }]);

	    return EpubAnnotatorService;
	}();

	exports.default = EpubAnnotatorService;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EpubAnnotationData = function () {
	    function EpubAnnotationData() {
	        _classCallCheck(this, EpubAnnotationData);

	        this._color = null;
	    }

	    _createClass(EpubAnnotationData, [{
	        key: "color",
	        set: function set(val) {
	            this._color = val;
	        },
	        get: function get() {
	            return this._color;
	        }
	    }, {
	        key: "config",
	        set: function set(val) {
	            this._config = val;
	        },
	        get: function get() {
	            return this._config;
	        }
	    }]);

	    return EpubAnnotationData;
	}();

	exports.default = new EpubAnnotationData();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    return {
	        annotationCreated: function annotationCreated(ann) {
	            console.log('annotationCreated', ann);
	            ann._local.highlights.forEach(function (a) {
	                a.className = ['annotator-hl', _plugin_data2.default.color].join(' ');
	            });
	        },

	        annotationUpdated: function annotationUpdated(ann) {
	            console.log('annotationUpdated', ann);
	            ann._local.highlights.forEach(function (a) {
	                a.className = ['annotator-hl', _plugin_data2.default.color].join(' ');
	            });
	        },

	        // TODOs use the following evets while working on more
	        // options in the plugin
	        annotationDeleted: function annotationDeleted(ann) {
	            console.log('annotationDeleted');
	        },

	        beforeAnnotationCreated: function beforeAnnotationCreated(ann) {
	            console.log('beforeAnnotationCreated');
	        },

	        beforeAnnotationUpdated: function beforeAnnotationUpdated(ann) {
	            console.log('beforeAnnotationUpdated');
	        },

	        annotationsLoaded: function annotationsLoaded(ann) {
	            console.log('annotationsLoaded');
	        }
	    };
	};

	var _plugin_data = __webpack_require__(4);

	var _plugin_data2 = _interopRequireDefault(_plugin_data);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "<div class='annotator-adder annotator-hide'>\n    <div class='adder speech'>\n        <div class=\"colorCode\">\n            <div class=\"round\">\n                <p class=\"js-highlight\">Highlight</p>\n            </div>\n            <div class=\"round\">\n                <p class=js-annotate>Annotate</p>\n            </div>\n            <div class=\"round\">\n                <p class=\"js-copy\">Copy</p>\n            </div>\n        </div>\n    </div>\n    <button type='button' class=\"invisible\">Annotate</button>\n</div>";

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "<div class=\"annotator-outer annotator-editor annotator-hide\">\n    <form class=\"annotator-widget\">\n        <ul>\n        </ul>\n        <div class=\"extra-annotator-controls colorPickers\">\n            <div class=\"round hg_FF0000\" data-color=\"hg_FF0000\"></div>\n            <div class=\"round hg_00FF00\" data-color=\"hg_00FF00\"></div>\n            <div class=\"round hg_0000FF\" data-color=\"hg_0000FF\"></div>\n        </div>\n        <div class=\"annotator-controls\">\n            <a href=\"#cancel\" class=\"annotator-cancel\">Cancel</a>\n            <a href=\"#save\" class=\"annotator-save annotator-focus\">Save</a>\n        </div>\n    </form>\n</div>";

/***/ }
/******/ ]);