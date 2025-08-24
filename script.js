function filterPosts(category) {
    const posts = document.querySelectorAll('.posts .post');
    posts.forEach(post => {
        if (category === 'all' || post.classList.contains(category)) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}