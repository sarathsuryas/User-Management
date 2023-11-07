
function removeUser(id) {
  const userId = id;

  alert('Called removeUser with userId: ' + userId);

  fetch(`/admin/removeuser?id=${userId}`, {
      method: 'DELETE'
  })
  .then(response => {
      if (response.ok) {
 
       window.location.reload();
      } else {
          console.error('Error:', response.status, response.statusText);
      }
  })
  .catch(error => {
      console.error('Fetch error:', error);
  });
}




