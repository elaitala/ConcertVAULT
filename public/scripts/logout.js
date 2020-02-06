console.log('LOGOUT is connected...');

const form = document.getElementById('navBarNav');


// SUBMIT event listener
form.addEventListener('logout', handleLogoutSubmit);

// Handle SUBMIT
function handleLogoutSubmit(event) {
  console.log('LOGGING out...');
  localStorage.clear();
  window.location = '/index'

  
}
