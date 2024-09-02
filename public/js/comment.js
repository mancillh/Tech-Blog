const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const comment = document.querySelector('#comment').value.trim();
  
    if (first_name && last_name && username && email && password) {
      const response = await fetch('/api/users/comment', {
        method: 'POST',
        body: JSON.stringify({ comment }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/blog/:id');
      } else {
        alert(response.statusText);
      }
    }
  };

document
.querySelector('.signup-form')
.addEventListener('submit', signupFormHandler);