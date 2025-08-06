import s_profile_data from "./s_profile_data.js";  
const profiles_scientists=document.querySelector(".profiles-scientists");

 const boardGrid = document.querySelector('.board-grid');

    s_profile_data.forEach(profile => {
      const card = document.createElement('div');
      card.className = "profile-card";
      card.setAttribute("id",profile.s_profile_id);
      card.innerHTML = `
        <img src="${profile.user_image}" alt="${profile.user_name}" class="profile-image" />
        <h3>${profile.user_name}</h3>
        <p>${profile.position}</p>
       
      `;
      card.onclick = () => {
        sessionStorage.setItem("selectedProfile", JSON.stringify(profile));
        window.location.href = `single_profile.html`;
      };
      profiles_scientists.appendChild(card);
    });