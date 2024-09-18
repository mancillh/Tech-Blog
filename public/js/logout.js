// connects to main.handlebars so user has ability to logout from any page
// logout form
const logout = async (event) => {
  event.preventDefault();

    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/login');
    } else {
      alert(response.statusText);
    }
  };
  
  // event listener for submission of log out form
  document.querySelector('#logout').addEventListener('click', logout);
  