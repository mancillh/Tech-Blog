// connects to dashboard.handlebars
// logic takes the title and content written by logged in user, adds it to a new line in blog posts list in dashboard
// and supplies title for display on homepage, routes user to dashboard after submitting new blog
const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value.trim();
  
    if (title && content) {
      const response = await fetch(`/api/blogs`, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create blog');
      }
    }
  };

  // handles click of delete button
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete blog');
      }
    }
  };
  
  // event listener for submission of new entry
  document
    .querySelector('.new-blog-form')
    .addEventListener('submit', newFormHandler);
  
  // event listener for click of delete button
  document
    .querySelector('#delete')
    .addEventListener('click', delButtonHandler);
  

  