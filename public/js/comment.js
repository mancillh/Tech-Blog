const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const comment = document.querySelector('#comment').value.trim();
  
    if (comment) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ comment }),
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