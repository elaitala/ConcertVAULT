console.log('JS is ready to rock...');

const form = document.getElementById('registerForm');

// Form SUBMIT event listener
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  // const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  let userData = {
    name: name,
    //  email: email
    password: password,
  }

  fetch('/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
  .then((dataStream) => dataStream.json())
  .then((response) => console.log(response))
  .catch((err) => console.log(err));
};