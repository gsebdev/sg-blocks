"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunksg_blocks"] = self["webpackChunksg_blocks"] || []).push([["sg-swiper"],{

/***/ "./node_modules/sg-swiper/dist/sg-swiper.mjs":
/*!***************************************************!*\
  !*** ./node_modules/sg-swiper/dist/sg-swiper.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Swiper)\n/* harmony export */ });\n// src/SlideMap.ts\nvar SlideMap = class extends Map {\n  _allSlidesLoaded = false;\n  _firstKey;\n  _lastKey;\n  /**\n  * Retrieves the slide given the index position.\n  */\n  getSlideByIndex = (index) => {\n    if (index === void 0)\n      return null;\n    for (const [id, slide] of this.entries()) {\n      if (index === slide.index) {\n        return [id, slide];\n      }\n    }\n    return null;\n  };\n  getSlidesScrollWidth = () => {\n    const { width, position } = Array.from(this.values()).pop() ?? {};\n    return width && position ? width + position : 0;\n  };\n  updateSlideDimensions = (id, args) => {\n    if (id) {\n      const slide = this.get(id);\n      if (slide) {\n        slide.width = (args == null ? void 0 : args.width) ?? slide.element.offsetWidth;\n        slide.position = (args == null ? void 0 : args.position) ?? slide.element.offsetLeft;\n      }\n    } else {\n      for (const slide of this.values()) {\n        slide.width = slide.element.offsetWidth;\n        slide.position = slide.element.offsetLeft;\n      }\n    }\n  };\n  set(id, slide) {\n    if (this.entries.length === 0) {\n      this._firstKey = id;\n    }\n    super.set(id, slide);\n    this._lastKey = id;\n    return this;\n  }\n  delete(key) {\n    const deleted = super.delete(key);\n    if (deleted) {\n      Array.from(this.keys());\n      this._lastKey = Array.from(this.keys()).pop();\n      this._firstKey = Array.from(this.keys())[0];\n    }\n    return deleted;\n  }\n  /**\n   * getter to know if all slides are loaded.\n   */\n  get allSlidesLoaded() {\n    if (this._allSlidesLoaded === true) {\n      return true;\n    } else {\n      let allLoaded = true;\n      for (const { loaded } of this.values()) {\n        if (!loaded) {\n          allLoaded = false;\n          break;\n        }\n      }\n      this._allSlidesLoaded = allLoaded;\n      return allLoaded;\n    }\n  }\n  get last() {\n    if (this._lastKey === void 0) {\n      return;\n    }\n    return this.get(this._lastKey);\n  }\n  get first() {\n    if (this._firstKey === void 0) {\n      return;\n    }\n    return this.get(this._firstKey);\n  }\n};\n\n// src/sg-swiper.ts\nvar Swiper = class {\n  _state = {\n    currentIndex: void 0,\n    currentPosition: 0,\n    initialized: false,\n    swiperWidth: 0,\n    slidesScrollWidth: 0,\n    noTranslate: false\n  };\n  _swipeSession = {\n    active: false,\n    type: \"mouse\",\n    startX: 0,\n    startTime: 0,\n    velocity: 0,\n    isClick: false,\n    deltaX: 0,\n    lastEvent: null,\n    lastEventDeltaX: 0,\n    lastEventVelocity: 0,\n    direction: 0\n  };\n  _indexChangeCallback = null;\n  _resizeObserver = null;\n  _resizeTimeout;\n  _navigationElements = {};\n  _childrenSwipers = null;\n  _slideClassName = null;\n  _swiperElement = null;\n  _slidesWrapper;\n  _auto = null;\n  _autoInterval;\n  _slides = new SlideMap();\n  _slideCount = 0;\n  _draggable = false;\n  _limitToEdges = false;\n  _slideLoad = null;\n  _slideClick = null;\n  _eventListeners = [];\n  _activeSessionEventListeners;\n  /**\n  * Constructor for the Swiper class.\n  *\n  * @param {HTMLElement} element - the HTML container element to initialize the Swiper\n  * @param {SwiperArgs} args - optional arguments to configure the Swiper\n  */\n  constructor(element, args = null) {\n    var _a, _b;\n    if (!element) {\n      return;\n    }\n    this._swiperElement = element;\n    if (args) {\n      this._indexChangeCallback = args.onSlideChange ?? null;\n      this._auto = args.auto ?? null;\n      this._slideClassName = args.slideClassName ?? null;\n      this._navigationElements = args.navigation ?? {};\n      this._childrenSwipers = args.linkedSwipers ?? null;\n      this._slideLoad = args.slideLoad ?? null;\n      this._slideClick = args.onSlideClick ?? null;\n      this._draggable = args.draggable ?? false;\n      this._limitToEdges = args.limitToEdges ?? false;\n    }\n    const slideCollection = this._slideClassName ? this._swiperElement.querySelectorAll(\".\" + this._slideClassName) : ((_a = this._swiperElement.firstElementChild) == null ? void 0 : _a.children) ?? [];\n    if (slideCollection.length === 0) {\n      return;\n    }\n    this._slidesWrapper = slideCollection[0].parentElement;\n    Array.from(slideCollection).forEach((slide, index) => {\n      const id = slide.id ? slide.id : (() => {\n        const generatedId = \"slide-\" + Math.random().toString(36).substring(2, 15);\n        slide.id = generatedId;\n        return generatedId;\n      })();\n      this._slides.set(id, {\n        index,\n        element: slide,\n        position: 0,\n        width: 0,\n        loaded: this._slideLoad ? false : true\n      });\n    });\n    this._slideCount = slideCollection.length;\n    this._activeSessionEventListeners = {\n      mouse: [\n        [\"mousemove\", this._handleMove],\n        [\"mouseup\", this._handleRelease]\n      ],\n      touch: [\n        [\"touchmove\", this._handleMove],\n        [\"touchend\", this._handleRelease],\n        [\"touchcancel\", this._handleRelease]\n      ]\n    };\n    if (this._auto && this._auto > 1e3) {\n      this._eventListeners.push(\n        [this._swiperElement, \"mouseover\", this._handleHover.bind(this), { passive: true }],\n        [this._swiperElement, \"mouseout\", this._handleLeave.bind(this), { passive: true }]\n      );\n      (_b = this._childrenSwipers) == null ? void 0 : _b.forEach((swiper) => {\n        if (!swiper.container)\n          return;\n        this._eventListeners.push(\n          [swiper.container, \"mouseover\", this._handleHover.bind(this), { passive: true }],\n          [swiper.container, \"mouseout\", this._handleLeave.bind(this), { passive: true }]\n        );\n      });\n    }\n    if (this._draggable) {\n      this._eventListeners.push(\n        //@ts-ignore\n        [this._swiperElement, \"mousedown\", this._handlePush, { passive: true }],\n        [this._swiperElement, \"touchstart\", this._handlePush],\n        [this._swiperElement, \"selectstart\", this._preventDefault, { capture: true }],\n        [this._swiperElement, \"dragstart\", this._preventDefault, { capture: true }]\n      );\n    }\n    this._resizeObserver = new ResizeObserver(this._handleResize);\n    this.start(args == null ? void 0 : args.slideStart);\n  }\n  /**\n   * Start the slider at the specified index, if provided.\n   *\n   * @param {number} index - The index at which to start the slider\n   */\n  start = (index) => {\n    var _a;\n    if (!this._state.initialized && this._swiperElement) {\n      this._eventListeners.forEach(([element, event, callback, options]) => {\n        element == null ? void 0 : element.addEventListener(event, callback, options);\n      });\n      this._slides.forEach(({ element, index: index2 }) => {\n        element.addEventListener(\"click\", (e) => {\n          this._handleSlideClick(e, element, index2);\n        }, { capture: true });\n      });\n      if (this._navigationElements.prev)\n        this._navigationElements.prev.forEach((el) => {\n          el.addEventListener(\"click\", this._handlePrevClick.bind(this));\n        });\n      if (this._navigationElements.next)\n        this._navigationElements.next.forEach((el) => {\n          el.addEventListener(\"click\", this._handleNextClick.bind(this));\n        });\n      (_a = this._resizeObserver) == null ? void 0 : _a.observe(this._swiperElement);\n      this._state.swiperWidth = this._swiperElement.clientWidth;\n      this._state.initialized = true;\n      this._setIndex(index ?? 0);\n      if (this._auto && this._auto > 1e3) {\n        this._handleLeave();\n      }\n    }\n  };\n  /**\n   * A function to handle hover behavior.\n   */\n  _handleHover = () => {\n    clearInterval(this._autoInterval);\n  };\n  /**\n   * A function to handle hover behavior.\n   */\n  _handleLeave = () => {\n    if (!this._auto)\n      return;\n    clearInterval(this._autoInterval);\n    this._autoInterval = setInterval(() => {\n      var _a;\n      const [, slide] = this._slides.getSlideByIndex((_a = this._state) == null ? void 0 : _a.currentIndex) ?? [];\n      if (slide == null ? void 0 : slide.loaded) {\n        this._handleNextClick();\n      }\n    }, this._auto);\n  };\n  /**\n   * A function to prevent the default behavior of the event.\n   *\n   * @param {Event} e - the event\n   */\n  _preventDefault = (e) => {\n    e.preventDefault();\n  };\n  /**\n  * Handles the click event for the previous button.\n  */\n  _handlePrevClick = () => {\n    if (this._state.currentIndex !== void 0) {\n      const newIndex = this._state.currentIndex - 1 < 0 ? this._slideCount - 1 : this._state.currentIndex - 1;\n      this._setIndex(newIndex);\n    }\n  };\n  /**\n   * Handles the click event for navigating to the next item.\n   */\n  _handleNextClick = () => {\n    if (this._state.currentIndex !== void 0) {\n      const newIndex = this._state.currentIndex + 1 > this._slideCount - 1 ? 0 : this._state.currentIndex + 1;\n      this._setIndex(newIndex);\n    }\n  };\n  /**\n   * Handle the click event on a slide element.\n   *\n   * @param {Event} e - the click event\n   * @param {HTMLElement} element - the slide element\n   * @param {number} index - the index of the slide\n   */\n  _handleSlideClick = (e, element, index) => {\n    if (this._swipeSession.isClick || !this._draggable) {\n      if (this._slideClick) {\n        e.preventDefault();\n        this._slideClick(index, element, e);\n      }\n    } else {\n      e.preventDefault();\n      e.stopPropagation();\n    }\n  };\n  _handleResize = (entries) => {\n    clearTimeout(this._resizeTimeout);\n    for (const entry of entries) {\n      if (entry.target === this._swiperElement) {\n        this._state.swiperWidth = entry.contentRect.width;\n      }\n    }\n    this._resizeTimeout = setTimeout(() => {\n      this._setIndex(this._getIndexByPosition(this._state.currentPosition), 200);\n    }, 80);\n  };\n  /**\n   * Update dimensions and positions of slides\n   */\n  _updateDimensions = () => {\n    const state = this._state;\n    const swiper = this._swiperElement;\n    this._slides.updateSlideDimensions();\n    state.slidesScrollWidth = this._slides.getSlidesScrollWidth();\n    if (state.slidesScrollWidth <= state.swiperWidth) {\n      this._translate(0);\n      state.noTranslate = true;\n      swiper == null ? void 0 : swiper.classList.add(\"no-translate\");\n      return false;\n    } else {\n      state.noTranslate = false;\n      swiper == null ? void 0 : swiper.classList.remove(\"no-translate\");\n      return true;\n    }\n  };\n  /**\n   * Stops all event listeners and resets the state of the component.\n   */\n  stop = () => {\n    if (this._resizeObserver) {\n      this._resizeObserver.disconnect();\n    }\n    this._eventListeners.forEach(([element, event, callback, options]) => {\n      element == null ? void 0 : element.removeEventListener(event, callback, options);\n    });\n    this._slides.forEach(({ element, index }) => {\n      element.removeEventListener(\"click\", (e) => {\n        this._handleSlideClick(e, element, index);\n      }, { capture: true });\n    });\n    if (this._navigationElements.prev)\n      this._navigationElements.prev.forEach((el) => {\n        el.removeEventListener(\"click\", this._handlePrevClick.bind(this));\n      });\n    if (this._navigationElements.next)\n      this._navigationElements.next.forEach((el) => {\n        el.removeEventListener(\"click\", this._handleNextClick.bind(this));\n      });\n    if (this._autoInterval) {\n      clearInterval(this._autoInterval);\n    }\n    this._translate(0);\n    this._state.initialized = false;\n  };\n  /**\n   * Translates the slides wrapper by the specified value.\n   *\n   * @param {number} value - The value to translate by\n   * @param {number | null} duration - The duration of the translation, defaults to null\n   */\n  _translate = (value, duration = null) => {\n    if (this._state.noTranslate) {\n      if (this._state.currentPosition !== 0) {\n        value = 0;\n      } else {\n        return;\n      }\n    }\n    if (this._slidesWrapper) {\n      this._slidesWrapper.style.transform = `translate3d(${value}px, 0, 0)`;\n      if (duration) {\n        this._slidesWrapper.style.transition = `${duration}ms cubic-bezier(.08,.5,.2,1) transform`;\n      } else {\n        this._slidesWrapper.style.transition = \"none\";\n      }\n    }\n    this._state.currentPosition = value;\n  };\n  /**\n   * Handles the push event triggered by a mouse click or touch on the swiper element.\n   *\n   */\n  _handlePush = (e) => {\n    var _a, _b, _c;\n    (_a = this._swiperElement) == null ? void 0 : _a.focus();\n    (_b = window.getSelection()) == null ? void 0 : _b.removeAllRanges();\n    const clientX = e.clientX ?? ((_c = e.touches[0]) == null ? void 0 : _c.clientX) ?? null;\n    this._swipeSession = {\n      active: true,\n      type: e.type === \"mousedown\" ? \"mouse\" : \"touch\",\n      startX: clientX,\n      startTime: e.timeStamp,\n      velocity: 0,\n      isClick: false,\n      deltaX: 0,\n      lastEvent: e,\n      lastEventDeltaX: 0,\n      lastEventVelocity: 0,\n      direction: 0\n    };\n    this._activeSessionEventListeners[this._swipeSession.type].forEach(\n      ([event, callback]) => {\n        document.addEventListener(event, callback, { passive: false });\n      }\n    );\n    this._triggerEvent(\"push\");\n  };\n  /**\n   * Handles the release action triggered by a mouse up or touch end.\n   *\n   */\n  _handleRelease = () => {\n    this._swipeSession.active = false;\n    this._activeSessionEventListeners[this._swipeSession.type].forEach(\n      ([event, callback]) => {\n        document.removeEventListener(event, callback);\n      }\n    );\n    if (Math.abs(this._swipeSession.deltaX) < 5 && this._swipeSession.lastEvent.timeStamp - this._swipeSession.startTime < 200) {\n      this._swipeSession.isClick = true;\n    }\n    this._triggerEvent(\"release\");\n  };\n  /**\n   * Do an action based on the given event type.\n   *\n   * @param {(\"release\" | \"push\" | \"move\")} ev - The type of event\n   */\n  _triggerEvent = (ev) => {\n    var _a;\n    if (ev === \"release\") {\n      this._setIndex((_a = this._state) == null ? void 0 : _a.currentIndex);\n    }\n    if (ev === \"move\") {\n      if (this._state.noTranslate)\n        return;\n      const newTranslate = this._state.currentPosition + this._swipeSession.lastEventDeltaX;\n      this._translate(newTranslate);\n      const newIndex = this._getIndexByPosition(newTranslate);\n      if (newIndex !== this._state.currentIndex)\n        this._setIndex(newIndex, false);\n    }\n    if (ev === \"push\") {\n      this._updateDimensions();\n      if (this._swipeSession.type === \"touch\") {\n        this._handleHover();\n      }\n    }\n  };\n  /**\n   * Handle the move event, updating swipe session data and triggering move to do related actions.\n   */\n  _handleMove = (e) => {\n    if (!this._swipeSession.active || this._state.noTranslate)\n      return;\n    e.preventDefault();\n    const { type, startX, lastEvent, deltaX } = this._swipeSession;\n    if (Math.abs(deltaX) < 3 && type == \"touch\") {\n      const clientY = e.touches[0].clientY;\n      const lastClientY = lastEvent.touches[0].clientY;\n      const deltaY = Math.abs(clientY - lastClientY);\n      if (deltaY > 10) {\n        this._handleRelease();\n        return;\n      }\n    }\n    const clientX = type === \"mouse\" ? e.clientX : e.touches[0].clientX;\n    const lastClientX = type === \"mouse\" ? lastEvent.clientX : lastEvent.touches[0].clientX;\n    this._swipeSession.lastEvent = e;\n    this._swipeSession.deltaX = clientX - startX;\n    this._swipeSession.velocity = this._swipeSession.deltaX / (e.timeStamp - this._swipeSession.startTime);\n    this._swipeSession.lastEventDeltaX = clientX - lastClientX;\n    this._swipeSession.lastEventVelocity = this._swipeSession.lastEventDeltaX === 0 ? this._swipeSession.lastEventVelocity : this._swipeSession.lastEventDeltaX / (e.timeStamp - lastEvent.timeStamp);\n    this._swipeSession.direction = Math.sign(this._swipeSession.lastEventDeltaX);\n    this._triggerEvent(\"move\");\n  };\n  /**\n   * Sets the index of the slider and optionally performs a translation.\n   *\n   * @param {number} index - The index to set.\n   * @param {boolean} translate - Optional flag to perform translation. Defaults to true.\n   */\n  _setIndex = (index, translate = true) => {\n    const state = this._state;\n    if (!state.initialized || index === void 0 || index === null)\n      return;\n    const [, activeSlide] = this._slides.getSlideByIndex(index) ?? [];\n    if (!activeSlide) {\n      return;\n    }\n    this._updateDimensions();\n    if (!this._slides.allSlidesLoaded && this._slideLoad) {\n      if (state.noTranslate) {\n        this._slides.forEach((slide) => {\n          this._slideLoad(slide.element).then(() => {\n            slide.loaded = true;\n            this._slides.allSlidesLoaded;\n          });\n        });\n      } else {\n        if (activeSlide) {\n          const numOfAdjacentSlidesVisible = Math.max(0, Math.ceil(state.swiperWidth / activeSlide.width - 1));\n          this._slideLoad(activeSlide.element).then(() => {\n            activeSlide.loaded = true;\n            if (!this._slides.allSlidesLoaded && numOfAdjacentSlidesVisible <= this._slideCount) {\n              for (let i = 1; i <= numOfAdjacentSlidesVisible; i++) {\n                const [, adjRightSlide] = this._slides.getSlideByIndex(index + i) ?? [];\n                const [, adjLeftSlide] = this._slides.getSlideByIndex(index - i) ?? [];\n                if (adjRightSlide && !adjRightSlide.loaded) {\n                  this._slideLoad(adjRightSlide.element).then(() => {\n                    adjRightSlide.loaded = true;\n                  });\n                }\n                if (adjLeftSlide && !adjLeftSlide.loaded) {\n                  this._slideLoad(adjLeftSlide.element).then(() => {\n                    adjLeftSlide.loaded = true;\n                  });\n                }\n              }\n            }\n          }).catch((err) => {\n            console.error(err);\n          });\n        }\n      }\n    }\n    if (translate !== false && !state.noTranslate) {\n      let value = (state.swiperWidth - activeSlide.width) / 2 - activeSlide.position;\n      if (this._limitToEdges) {\n        const limit = state.swiperWidth - state.slidesScrollWidth;\n        const [, firstSlide] = this._slides.getSlideByIndex(0) ?? [];\n        const [, lastSlide] = this._slides.getSlideByIndex(this._slideCount - 1) ?? [];\n        const stickToStart = firstSlide && value > -1 * firstSlide.width / 2 ? true : false;\n        const stickToEnd = lastSlide && value < limit + lastSlide.width / 2 ? true : false;\n        this._clearPositionClassNames();\n        if (stickToEnd && stickToStart) {\n          if (state.currentPosition < value) {\n            value = limit;\n            this._setLastClassNames();\n          } else {\n            value = 0;\n            this._setFirstClassNames;\n          }\n        } else if (stickToStart) {\n          value = 0;\n          this._setFirstClassNames();\n        } else if (stickToEnd) {\n          value = limit;\n          this._setLastClassNames();\n        } else {\n          value = Math.min(0, Math.max(limit, value));\n        }\n      }\n      this._translate(value, typeof translate === \"number\" ? translate : 500);\n    }\n    this._slides.forEach((slide) => slide.element.classList.toggle(\"is-active\", slide.index === (activeSlide == null ? void 0 : activeSlide.index)));\n    if (index === 0) {\n      this._setFirstClassNames();\n    } else if (index === this._slideCount - 1) {\n      this._setLastClassNames();\n    }\n    if (index === state.currentIndex)\n      return;\n    state.currentIndex = index;\n    if (this._indexChangeCallback)\n      this._indexChangeCallback(index);\n    if (this._childrenSwipers) {\n      this._childrenSwipers.forEach((swiper) => {\n        if (swiper) {\n          swiper.index = index;\n        }\n      });\n    }\n  };\n  _clearPositionClassNames() {\n    var _a, _b;\n    (_a = this._swiperElement) == null ? void 0 : _a.classList.remove(\"is-first\");\n    (_b = this._swiperElement) == null ? void 0 : _b.classList.remove(\"is-last\");\n  }\n  _setFirstClassNames() {\n    var _a, _b;\n    (_a = this._swiperElement) == null ? void 0 : _a.classList.remove(\"is-last\");\n    (_b = this._swiperElement) == null ? void 0 : _b.classList.add(\"is-first\");\n  }\n  _setLastClassNames() {\n    var _a, _b;\n    (_a = this._swiperElement) == null ? void 0 : _a.classList.remove(\"is-first\");\n    (_b = this._swiperElement) == null ? void 0 : _b.classList.add(\"is-last\");\n  }\n  /**\n   * Retrieves the active index based on the given position.\n   */\n  _getIndexByPosition = (translate) => {\n    const { swiperWidth, slidesScrollWidth, currentIndex } = this._state;\n    const scrollAvailable = slidesScrollWidth - swiperWidth;\n    const minScrollAvailableToDetectByMiddle = this._slides.first && this._slides.last ? this._slides.first.width / 2 + this._slides.last.width / 2 : 0;\n    if (!this._limitToEdges || scrollAvailable > minScrollAvailableToDetectByMiddle) {\n      const offset = swiperWidth / 2;\n      for (const { position, width, index } of this._slides.values()) {\n        const leftLimit = offset - position - width;\n        const rightLimit = offset - position;\n        if (translate <= rightLimit && translate >= leftLimit) {\n          return index;\n        }\n      }\n      return void 0;\n    } else {\n      const positionRatio = translate / -scrollAvailable;\n      const index = Math.round(positionRatio * this._slideCount);\n      return Math.max(0, Math.min(this._slideCount - 1, index));\n    }\n  };\n  get index() {\n    return this._state.currentIndex;\n  }\n  get container() {\n    return this._swiperElement;\n  }\n  set index(index) {\n    this._setIndex(index);\n  }\n  /**\n   * setter for slide click callback\n   */\n  set slideClick(callback) {\n    this._slideClick = callback;\n  }\n};\n\n//# sourceMappingURL=sg-swiper.mjs.map\n\n//# sourceURL=webpack://sg-blocks/./node_modules/sg-swiper/dist/sg-swiper.mjs?");

/***/ })

}]);