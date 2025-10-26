const shareButton = document.getElementById('shareButton');

shareButton.addEventListener('click', async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: document.title,
        text: 'Check out this website!',
        url: window.location.href
      });
      console.log('Page shared successfully');
    } catch (error) {
      console.error('Error while sharing:', error);
    }
  } else {
    // Komunikat lub alternatywa dla przeglądarek, które nie wspierają Web Share API
    alert('Your browser does not support the sharing feature.');
  }
});