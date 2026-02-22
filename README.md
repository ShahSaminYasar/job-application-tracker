# B13 A04

## Q&A (Challenge Part)

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

1. **getElementById** is used to select a single element through the unique id of that element. If no element is found for the passed 'id', null is returned.
2. **getElementsByClassName** is used to select all the elements containing a particular class ("btn")/set of classes ("btn active"). It returns an HTMLCollection and the DOM data is live.
3. **querySelector** takes a CSS selector as a query and returns the first element that matches the query. If no element match is found, null is returned.
4. **querySelectorAll** returns a NodeList of all elements that match the given CSS selectors, the returned list is static.

---

### 2. How do you create and insert a new element into the DOM?

**Step 1: Create the element**

```javascript
const demoElement = document.createElement("p");
```

**Step 2: Furnish the element with classes, id, and inner data**

```javascript
demoElement.classList.add("text-sm", "text-blue-600");
demoElement.textContent = "Hello World!";
```

**Step 3: Insert (append) the element into the DOM**

```javascript
document.body.appendChild(demoElement);
```

---

### 3. What is Event Bubbling? And how does it work?

Event Bubbling is a JavaScript process where an event triggered on a DOM element propagates upward through its ancestors in the DOM tree until it reaches the root i.e. the document or window. While moving upwards it triggers the event handlers on each parent element.
When an event occurs, 3 phases are completed.
First happens the `Event Capturing` phase where the event starts from the very root and continues to propagate through all the DOM elements one by one until the target element is found.
During phase 2, the event reaches the target element and executes its event handler.
Afterwards, phase 3 happens which is `Event Bubbling` - the event propagates upward through the ancestor elements one by one toward the root and triggers their handlers too. This is a default behavior in JS and can be stopped using `e.stopPropagation()` where `e` is the event.

---

### 4. What is Event Delegation in JavaScript? Why is it useful?

Event Delegation is a technique in JavaScript where instead of attaching event listeners to multiple child elements individually, a single event listener is attached to the common parent element that contains the child elements. The events for each child are then handled by utilizing `Event Bubbling` process in which the event propagates from the child to the parent - which allows the parent to receive the event during the bubbling phase and handle it.

Mechanisms include:

- Event Bubbling
- event.target ➡ the actual clicked element
- event.currentTarget ➡ the element the listener is attached to.

Benefits of Event Delegation:

- Instead of adding many event listeners, we add only one.
- If new child elements are added later, they will still work automatically without the need of adding any new event listener.
- Clean and more maintainable code because of less repetition and fewer event listeners.

---

### 5. What is the difference between preventDefault() and stopPropagation() methods?

`preventDefault()` and `stopPropagation()` are both methods of the Event object in Javascript.

`preventDefault()` prevents the browser's default behavior for an event, for example - a form submitting and refreshing the page, link tag `<a>` navigating to another page etc. When preventDefault() is called at the beginning of the event listener, these default behaviors of the browser don't happen, and the click works just fine!

On the other hand, when an event occurs on an element, it propagates upward through the element's parents one by one until it reaches the root which is the document or window. While moving from parent to parent, it triggers their respective event handlers too - this is the default behavior of the browser. While it is useful in some cases like 'Event Delegation', most of the time we don't want to trigger the parents' event handlers unnecessarily. In such cases, `stopPropagation()` is used which stops the event from bubbling further up the DOM.

`preventDefault()` does not stop propagation, and `stopPropagation()` does not stop default behavior - they are independent.
