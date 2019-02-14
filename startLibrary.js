var _ = (function(){

	/*check the type of the selector
	If it is not a string and it has a length property, we have a NodeList */
	var libraryConstructor = function(selector){
		if(!selector){
			return;
		}
		if (typeof(selector) === 'string') {
			if(selector === 'document'){
				this.els = [document];
			} else if (selector === 'window') {
			this.els = [window];
			} else{
				this.els = document.querySelectorAll(selector);
			}
			
		} else if (selector.length) {
			this.els = selector;
		} else {
			this.els = [selector];
		}
	}

	/*Method, which loops through all the elements
	Firstly, it checks if there is a callback function passed*/
	libraryConstructor.prototype.each = function(callback){
		if(!callback || typeof(callback) != 'function'){
			return;
		}
		var resultsCollection = [];
		for(var i = 0; i < this.els.length; i++){
			//results.push(callback.call(this, this[i], i));
			callback(this.els[i], i);
		}
		return this;
	}

	/*Method for adding new element to the chosen one */
	libraryConstructor.prototype.addNewElement = function(element, text, idName, className){
		if(!element || typeof(element) !== 'string'){
			return;
		}

		this.each(function(el){
			var newEl = document.createElement(element);
			var textNode = text ? text : '';
			var newElText = document.createTextNode(textNode);

			if(idName){
				newEl.setAttribute('id', idName);
			}

			if(className){
				newEl.setAttribute('class', className);
			}

			newEl.appendChild(newElText);
			el.appendChild(newEl);

		})
		return this;
	}

	/*Method for removing the chosen element from the DOM */
	libraryConstructor.prototype.removeElement = function(){
		this.each(function(el){
			el.remove();
		})

		return this;
	}

	/*Method for changing the style of an element*/
	libraryConstructor.prototype.changeStyle = function(property, value){
		if(!property || !value){
			return;
		}
		this.each(function(el){
			el.style[property] = value;
		})
		return this;
	}

	/*Method for adding classes to an element*/
	libraryConstructor.prototype.addClass = function(className){
		this.each(function(el){
			if(typeof(className) === 'string'){
				el.classList.add(className)
			}else if(Array.isArray(className)){
				for(var i=0; i < className.length; i++){
					el.classList.add(className[i]);
				}
			}
			
		})
	}

	/*Method for changing attributes of an element*/
	libraryConstructor.prototype.changeAttr = function(attr, value){
		if(typeof(attr) !== 'string'){
			console.log('Please fill in attribute name as a string!');
			return;
		}

		if(attr == 'innerText' || attr == 'innerHTML'){
			var methodToUse = attr == 'innerText' ? 'getSetText' : 'getSetHTML';
			console.log('For getting/setting the' +  attr + ', please use the ' + methodToUse + '()!');
			return;
		}

		this.each(function(el){
			el.setAttribute(attr, value);
		})

		return this;
	}

	
	var getSetTextHtml = function(el, attr, text){
		var returnedValue;
		if(!text){
			returnedValue = el[attr];
			return returnedValue;
		}
			el[attr] = text;
		return this;
	}

	/*Get/Set method for the innerText property of an element*/
	libraryConstructor.prototype.getSetText = function(text){
		this.each(function(el){
			getSetTextHtml(el, 'innerText', text);
		})
		return this;
	}

	/*Get/Set method for the innerHTML property of an element*/
	libraryConstructor.prototype.getSetHTML = function(text){
		this.each(function(el){
			getSetTextHtml(el, 'innerHTML', text);
		})
		return this;
	}

	/*Method for getting the parent element of the chosen element*/
	libraryConstructor.prototype.getParentEl = function(){
		var parentEl;
		this.each(function(el){
				parentEl = el.parentNode;
			})

		return parentEl;
	}

	/*Method for getting the previous element sibling of the chosen element*/
	libraryConstructor.prototype.getPreviousSibling = function(){
		var siblingEl;
		this.each(function(el){
			siblingEl = el.previousSibling;
		})
		return siblingEl;
	}

	/*Method for getting the next element sibling of the chosen element*/
	libraryConstructor.prototype.getNextSibling = function(){
		var siblingEl;
		this.each(function(el){
			siblingEl = el.nextSibling;
		})
		return siblingEl;
	}

	/*Method for getting the children elements of the chosen element*/
	libraryConstructor.prototype.getChildren = function(){
		var children = [];
		this.each(function(el){
			children = el.children;
		})
		return children;
	}

	/*Method for registering and handling events*/
	libraryConstructor.prototype.addEvent = function(evt, callback){
		this.each(function(el){
			el.addEventListener(evt, callback)
		})

		return this;
	}

	libraryConstructor.prototype.click = function(callback){
		this.each(function(el){
			el.addEvent('click', callback);
		})
	}

	libraryConstructor.prototype.blur = function(callback){
		this.each(function(el){
			el.addEvent('blur', callback);
		})
	}

	//Initialize a new constructor
	 
	var initialize = function (selector) {
		return new libraryConstructor(selector);
	};

	/**
	 * Return the constructor instantiation
	 */
	return initialize;

})();