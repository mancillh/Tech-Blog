const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const comment = document.querySelector('#comment').value.trim();
    const pathname = window.location.pathname.split('/');
    const blog_id = pathname[pathname.length-1];

    if (comment && blog_id) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ comment, blog_id }),
        headers: { 
          'Content-Type': 'application/json' 
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to create comment');
      }
    }
  };

  // const delButtonHandler = async (event) => {
  //   if (event.target.hasAttribute('data-id')) {
  //     const id = event.target.getAttribute('data-id');
  
  //     const response = await fetch(`/api/comments/${id}`, {
  //       method: 'DELETE',
  //     });
  
  //     if (response.ok) {
  //       document.location.replace('/dashboard');
  //     } else {
  //       alert('Failed to delete comment');
  //     }
  //   }
  // };

document
.querySelector('.actual-comment-form')
.addEventListener('submit', commentFormHandler);

// document
// .querySelector('.posted-comment')
// .addEventListener('click', delButtonHandler);