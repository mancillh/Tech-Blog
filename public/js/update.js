// connects to update.handlebars
// handles updating existing blog posts (user accesses update capability from dashboard)
const updateFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blog-title').value.trim();
  const content = document.querySelector('#blog-content').value.trim();
  const id = document.querySelector('#blog-id').value;

  if (title && content) {
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update blog');
    }
  }
};

// event listener for submission of update form
document
  .querySelector('.update-form')
  .addEventListener('submit', updateFormHandler);