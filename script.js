document.addEventListener('DOMContentLoaded', () => {

    

    const allCompaniesList = document.getElementById('all-companies-list');
    const governorateFilter = document.getElementById('governorateFilter');
    const ratingFilter = document.getElementById('ratingFilter');
    const searchBar = document.getElementById('searchBar');
    const topRatedList = document.getElementById('top-rated-list');
    const backToTopBtn = document.getElementById('backToTop');
    const testimonialsList = document.getElementById('testimonials-list');

    let allCompaniesData = [];
    const allGovernorates = [
        "القاهرة", "الجيزة", "الإسكندرية", "القليوبية", "البحيرة", "أسوان", "أسيوط", "بني سويف", "الدقهلية", "دمياط",
        "الفيوم", "الغربية", "الإسماعيلية", "كفر الشيخ", "الأقصر", "مطروح", "المنيا", "المنوفية", "الوادي الجديد",
        "بورسعيد", "قنا", "البحر الأحمر", "الشرقية", "سوهاج", "شمال سيناء", "جنوب سيناء", "السويس"
    ];

    const testimonials = [
        { name: 'أحمد م.', profession: 'صاحب منزل', quote: 'لقد تأثرت بالخدمة. كان الفريق محترفًا، وشقتي لم تبدو أنظف من قبل!', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { name: 'فاطمة س.', profession: 'مديرة مكتب', quote: 'احتياجات شركتي من النظافة صعبة، لكن CLEAN CLEAR وجدت لي الشركة المثالية!', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
        { name: 'محمد ع.', profession: 'طالب', quote: 'التقييمات ساعدتني كثيراً في اختيار شركة مناسبة وبسعر معقول.', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
        { name: 'هند ر.', profession: 'ربة منزل', quote: 'المنصة سهلة الاستخدام جداً ووجدنا شركة نظافة ممتازة لمنزلنا الجديد.', image: 'https://randomuser.me/api/portraits/women/4.jpg' },
        { name: ' خالد الموجي.', profession: 'مهندس', quote: 'لقد تأثرت بالخدمة. كان الفريق محترفًا، وشقتي لم تبدو أنظف من قبل!', image: 'https://randomuser.me/api/portraits/men/5.jpg' },
        { name: ' عابد الجارحي.', profession: ' موظفة', quote: 'احتياجات شركتي من النظافة صعبة، لكن CLEAN CLEAR وجدت لي الشركة المثالية!', image: 'https://randomuser.me/api/portraits/women/6.jpg' },
       
   
      ];

    const renderTestimonials = () => {
        testimonialsList.innerHTML = testimonials.map(t => `
            <div class="testimonial-card">
                <img src="${t.image}" alt="${t.name}">
                <p class="quote">"${t.quote}"</p>
                <h4 class="name">${t.name}</h4>
                <p class="profession">${t.profession}</p>
            </div>
        `).join('');
    };

    const renderCompanies = (container, companies) => {
        container.innerHTML = companies.map(company => `
            <div class="company-card" data-aos="fade-up">
                <img src="${company.img}" alt="${company.name}">
                <div class="card-body">
                    <h5>${company.name}</h5>
                    <div class="rating">
                        ${'⭐'.repeat(Math.floor(company.rating))} ${company.rating}
                    </div>
                    <p>${company.desc}</p>
                    <div class="contact-info">
                        <i class="fa-solid fa-location-dot"></i>
                        <span>${company.gov}</span>
                    </div>
                </div>
            </div>
        `).join('');
    };

    const populateGovernorates = () => {
        allGovernorates.forEach(gov => {
            const option = document.createElement('option');
            option.value = gov;
            option.textContent = gov;
            governorateFilter.appendChild(option);
        });
    };

    const filterAndRenderCompanies = () => {
        const selectedGovernorate = governorateFilter.value;
        const minRating = parseFloat(ratingFilter.value);
        const searchTerm = searchBar.value.toLowerCase();

        let filteredCompanies = allCompaniesData.filter(company => {
            const governorateMatch = selectedGovernorate === 'all' || company.gov === selectedGovernorate;
            const ratingMatch = company.rating >= minRating;
            const searchMatch = company.name.toLowerCase().includes(searchTerm) || company.gov.toLowerCase().includes(searchTerm);
            return governorateMatch && ratingMatch && searchMatch;
        });

        renderCompanies(allCompaniesList, filteredCompanies);
    };

    fetch('companies.json')
        .then(response => response.json())
        .then(data => {
            allCompaniesData = data;
            const topRatedCompanies = [...allCompaniesData].sort((a, b) => b.rating - a.rating).slice(0, 8);
            renderCompanies(topRatedList, topRatedCompanies);
            populateGovernorates();
            filterAndRenderCompanies();
        })
        .catch(error => console.error('Error fetching companies data:', error));

    governorateFilter.addEventListener('change', filterAndRenderCompanies);
    ratingFilter.addEventListener('change', filterAndRenderCompanies);
    searchBar.addEventListener('input', filterAndRenderCompanies);

    // Back to top button functionality
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Typing Effect
    const typingElement = document.querySelector('.typing-effect');
    const text = "ابحث عن أفضل خدمة نظافة لمنزلك";
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        typingElement.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    }
    setTimeout(typeWriter, 500);

    renderTestimonials();
});