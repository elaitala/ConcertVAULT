console.log('LOGIN is connected...');

const form = document.getElementById('loginForm');
// let loggedInUser = '';

// SUBMIT event listener
form.addEventListener('submit', handleLoginSubmit);

// Handle SUBMIT
function handleLoginSubmit(event) {
  let formIsValid = true;
  event.preventDefault();

  // const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  const userData = {
    // email: email,
    username: username,
    password: password,
  }

  // Clear ALERT messages
  document.querySelectorAll('.alert').forEach((alert) => alert.remove());

  const formInputs = [...form.elements];
  formInputs.forEach((input) => {
    input.classList.remove('input-error');
    if (input.type !== 'submit' && input.value === '') {
      formIsValid = false;
      // Add RED BORDER to input
      input.classList.add('input-error');
      // Add ERROR message below input
      // input.insertAdjacentHTML('afterend', `
      //   <div class="alert ${input.id}-message">
      //     Please enter your ${input.id}
      //   </div>
      // `);
    } else if (input.type === 'password' && input.value.length < 4) {
        formIsValid = false;
        // Add RED BORDER to input
        input.classList.add('input-error');
        // Add ERROR message below input
        // input.insertAdjacentHTML('afterend', `
        //   <div class="alert ${input.id}-message">
        //     Password needs to be longer than a quartet
        //   </div>
        // `);
    }

    if (formIsValid) {
      userData[input.username] = input.value;
    }
  });

  if (formIsValid) {
    // SUBMIT data to server
    console.log('Comparing LOGIN Data', userData)
    fetch('api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'credentials': 'include',
      },
      body: JSON.stringify(userData),
    })
      .then(console.log('Got this far...1'))
      .then((dataStream) => dataStream.json())
      .then(console.log('Got this far...2'))
      .then((dataObj) => {
        console.log(dataObj);
        // loggedInUser = username;
        window.location = '/profile';
      })
      .catch((err) => console.log(err));
  }
};







