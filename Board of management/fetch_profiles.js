import profile_data from "../js/profiledata.js";

const boardGrid = document.querySelector('.board-grid');

if (boardGrid && Array.isArray(profile_data)) {
    profile_data.forEach(profile => {
        const profileCard = document.createElement('div');
        profileCard.setAttribute('id', `profile-${profile.profile_id}`);
        profileCard.classList.add('board-member');

        profileCard.innerHTML = `
            <img src="${profile.user_image}" alt="${profile.user_name}" class="profile-image">
            <h3 class="profile-name">${profile.user_name}</h3>
            <p class="profile-position">${profile.position}</p>
        `;

        boardGrid.appendChild(profileCard);

        // Redirect with profile ID in the URL
        profileCard.addEventListener('click', () => {
            window.location.href = `./profile.html?id=${profile.profile_id}`;
        });
    });
} else {
    console.error("boardGrid not found or profile_data is invalid.");
}
