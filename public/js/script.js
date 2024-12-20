document.getElementById('message-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const dob = document.getElementById('dob').value;
    const message = document.getElementById('message').value;
    const file = document.getElementById('file-upload').files[0];
  
    // Verify DOB
    if (dob !== "04052000") {
      alert("Invalid DOB! Access Denied.");
      return;
    }
  
    const formData = new FormData();
    formData.append('dob', dob);
    formData.append('message', message);
    if (file) formData.append('file', file);
  
    const response = await fetch('/send', {
      method: 'POST',
      body: formData,
    });
  
    if (response.ok) {
      document.getElementById('form-section').classList.add('hidden');
      document.getElementById('thank-you-section').classList.remove('hidden');
    } else {
      alert('Something went wrong. Please try again.');
    }
  });
  