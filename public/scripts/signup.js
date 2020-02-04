console.log('SIGNUP is connected...');

const form = document.getElementById('signupForm');

// SUBMIT event listener
form.addEventListener('submit', handleSignupSubmit);

// Handle SUBMIT
function handleSignupSubmit(event) {
  let formIsValid = true;
  event.preventDefault();

  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  const userData = {
    email: email,
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
      userData[input.name] = input.value;
    }
  });

  if (formIsValid) {
    // SUBMIT data to server
    console.log('Submitting USER Data', userData)
    fetch('api/v1/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((dataStream) => dataStream.json())
      .then((dataObj) => {
        console.log(dataObj);
      //   window.location = '/login';
      })
      .catch((err) => console.log(err));
  }
}







