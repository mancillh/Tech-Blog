const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const comment = document.querySelector('#comment').value.trim();

    // Special thanks to instructor Darian Mendez who helped with the logic for pathname and blog_id here
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

document
.querySelector('.actual-comment-form')
.addEventListener('submit', commentFormHandler);
