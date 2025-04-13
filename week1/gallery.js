document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.getElementById('gallery');
    const lightboxImage = document.getElementById('lightboxImage');

    fetch('https://api.slingacademy.com/v1/sample-data/photos?offset=5&limit=30')
        .then(response => response.json())
        .then(data => {
            const photos = data.photos;
            photos.forEach((photo, index) => {
                const p = document.createElement('div');
                p.className = 'col-6 col-md-4 col-lg-3';
                const img = document.createElement('img');
                img.src = photo.url;
                img.alt = photo.title;
                img.className = 'img-fluid rounded gallery-img';
                img.style.cursor = 'pointer';

                img.addEventListener('click', () => {
                    lightboxImage.src = img.src;
                    const modal = new bootstrap.Modal(document.getElementById('lightboxModal'));
                    modal.show();
                });
                
                const caption = document.createElement('p');
                caption.textContent = `Image ${index + 1}`;
                caption.className = 'text-center mt-2';

                p.appendChild(img);
                p.appendChild(caption);
                gallery.appendChild(p);
            });
        })
        .catch(error => {
            gallery.innerHTML = '<p class="text-danger">Failed to load images.</p>';
        });
});
