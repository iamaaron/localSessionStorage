/**
 * @author Aaron Brewer
 * @description This is a case study for localStorage and sessionStorage
 * functionality. It has only been tested in Google Chrome.
 */
(function() {

  /**
   * @description Initialization of global variables.
   */
  var fullNameDisplay = document.getElementById('fullNameDisplay'),
      emailDisplay = document.getElementById('emailDisplay');

  /**
   * @name getData
   * @description Grabs data from name and email input fields and passes them
   * along to processData. Also resets value properties of the name and email
   * input fields.
   * @public
   */
  function getData(){
    var fullNameInput = document.getElementById('fullName'),
        emailInput = document.getElementById('email');
    processData(fullNameInput.value, emailInput.value);
    fullNameInput.value = '';
    emailInput.value = '';
  }

  /**
   * @name processData
   * @description Adds data from parameters to localStorage and calls populate
   * function.
   * @public
   * @param fullNam(String) - string of fullNameInput per getData.
   * @param email(String) - string of emailInput per getData.
   */
  function processData(fullName, email){
    localStorage.setItem('fullName', fullName);
    localStorage.setItem('email', email);
    populate();
  }

  /**
   * @name populate
   * @description Checks to see if either fullName or email properties are
   * defined in localStorage. If they are, then update innerHTML of
   * fullnameDisplay and emailDisplay.
   * @public
   */
  function populate(){
    if (localStorage.getItem('fullName') || localStorage.getItem('email')) {
      fullNameDisplay.innerHTML = localStorage.getItem('fullName', fullName);
      emailDisplay.innerHTML = localStorage.getItem('email', email);
    }
  }

  /**
   * @name removeKey
   * @description Based upon what is passed to the key variable, that key
   * is removed from localStorage, calls the populate function, and then resets
   * the key value property.
   * @public
   */
  function removeKey(){
    var key = document.getElementById('key').value;
    localStorage.removeItem(key);
    populate();
    key = '';
  }

  /**
   * @name clearData
   * @description Clears localStorage, and innerHTML of the table data.
   * @public
   */
  function clearData () {
    localStorage.clear();
    var fullNameDisplayClear = document.getElementById('fullNameDisplay'),
        emailDisplayClear = document.getElementById('emailDisplay');
    fullNameDisplayClear.innerHTML = '';
    emailDisplayClear.innerHTML = '';
  }

  /**
   * @name clearSessionStorage
   * @description Clears sessionStorage 'isSession' property.
   * @public
   */
  function clearSessionStorage () {
    sessionStorage.removeItem('isSession');
  }

  /**
   * @name start
   * @description Grabs element data in DOM, adds listeners per buttons,
   * and checks to see if localStorage is populated. If it isn't, shows
   * a modal informing the user to create data. Also shows a modal if the
   * sessionStorage property isSession exists.
   * @public
   */
  function start () {
    var getDataButton = document.getElementById('getData'),
    clearDataButton = document.getElementById('clearData'),
    clearSessionDataButton = document.getElementById('clearSessionData'),
    removeKeyButton = document.getElementById('removeKey');
    getDataButton.addEventListener('click', getData, false);
    clearDataButton.addEventListener('click', clearData, false);
    clearSessionDataButton.addEventListener('click', clearSessionStorage, false);
    removeKeyButton.addEventListener('click', removeKey, false);
    if (localStorage.length > 0) {
      populate();
    } else {
      $('#localStorageMessageModal').modal();
    }
    if (sessionStorage.getItem('isSession')) {
      $('#sessionStorageMessageModal').modal();
    } else {
      sessionStorage.setItem('isSession', 'true');
    }
  }

  /**
   * @description Listens to the page to finish loading and then runs the
   * start function.
   */
  window.addEventListener('load', start, false);
})();
