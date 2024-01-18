document.addEventListener('DOMContentLoaded', function () {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const mainContent = document.querySelector('main');
            data.sections.forEach(section => {
                const sectionElement = document.createElement('section');
                sectionElement.className = 'collapsible';
                sectionElement.id = section.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''); // Convert title to id

                const header = document.createElement('div');
                header.className = 'collapsible-header';
                header.innerHTML = `<h2>${section.title}</h2>`;

                sectionElement.appendChild(header);

                if (section.content && typeof section.content === 'string') {
                    const content = document.createElement('div');
                    content.className = 'collapsible-content';
                    content.innerHTML = `<p>${section.content}</p>`;
                    sectionElement.appendChild(content);
                } else if (section.content && Array.isArray(section.content)) {
                    const contentList = document.createElement('ul');
                    contentList.className = 'collapsible-content';
                    section.content.forEach(item => {
                        const listItem = document.createElement('li');
                        listItem.textContent = item;
                        contentList.appendChild(listItem);
                    });
                    sectionElement.appendChild(contentList);
                }

                if (section.subSections) {
                    const subSectionsContainer = document.createElement('div');
                    subSectionsContainer.className = 'collapsible-content';

                    section.subSections.forEach(subSection => {
                        const subSectionElement = document.createElement('div');
                        subSectionElement.className = 'sub-section';

                        const subHeader = document.createElement('h3');
                        subHeader.textContent = `${subSection.subTitle}\n ${subSection.role ? '- ' + subSection.role : ''} ${subSection.dateRange ? '- ' + subSection.dateRange : ''} `;
                        subSectionElement.appendChild(subHeader);

                        if (subSection.points) {
                            const pointsList = document.createElement('ul');
                            subSection.points.forEach(point => {
                                const listItem = document.createElement('li');
                                listItem.textContent = point;
                                pointsList.appendChild(listItem);
                            });
                            subSectionElement.appendChild(pointsList);
                        }

                        if (subSection.projects) {
                            const projectList = document.createElement('ul');
                            subSection.projects.forEach(project => {
                                const projectItem = document.createElement('li');
                                const projectLink = document.createElement('a');
                                projectLink.href = project.url;
                                projectLink.textContent = project.name;
                                projectLink.target = "_blank";
                                projectItem.appendChild(projectLink);
                                projectList.appendChild(projectItem);
                            });
                            subSectionElement.appendChild(projectList);
                        }

                        // Inside the section.subSections.forEach loop
                        if (subSection.name) {
                            const nameElement = document.createElement('p');
                            nameElement.textContent = `${subSection.name} ${subSection.fluency ? '- ' + subSection.fluency : ''}`;
                            subSectionElement.appendChild(nameElement);
                        }

                        subSectionsContainer.appendChild(subSectionElement);
                    });

                    sectionElement.appendChild(subSectionsContainer);
                }

                mainContent.appendChild(sectionElement);
            });

            const navbarLinks = document.querySelectorAll('.navbar-links a');
            navbarLinks.forEach(link => {
                link.addEventListener('click', function (event) {
                    // Prevent default anchor behavior
                    event.preventDefault();
        
                    // Get the section to scroll to
                    const sectionId = this.getAttribute('href');
                    const section = document.querySelector(sectionId);
        
                    // Scroll to the section
                    section.scrollIntoView({ behavior: 'smooth' });
        
                    // Expand the section
                    if (section.classList.contains('collapsible')) {
                        section.classList.add('active');
                    }
                });
            });

            addCollapsibleBehavior();
        })
        .catch(error => console.error('Error loading JSON data:', error));

    const navbar = document.querySelector('.navbar');
    const footer = document.querySelector('footer');

    window.addEventListener('scroll', function () {
        // Adjust the transparency based on the scroll position
        const scrollPosition = window.scrollY;
        const navbarOpacity = scrollPosition < 100 ? 1 : 0.5; // Full opacity at top, 50% after scrolling down
        const footerOpacity = (document.body.scrollHeight - window.innerHeight - scrollPosition) < 100 ? 1 : 0.5; // Full opacity at bottom, 50% before reaching bottom
        
        navbar.style.backgroundColor = `rgba(51, 51, 51, ${navbarOpacity})`; // Adjust color as needed
        footer.style.backgroundColor = `rgba(51, 51, 51, ${footerOpacity})`; // Adjust color as needed
    });

    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarLinks = document.querySelector('.navbar-links');

    navbarToggler.addEventListener('click', function() {
        navbarLinks.classList.toggle('expanded');
    });
});

function addCollapsibleBehavior() {
    const collapsibles = document.querySelectorAll('.collapsible');
    collapsibles.forEach(collapsible => {
        const header = collapsible.querySelector('.collapsible-header');
        
        header.addEventListener('click', function () {
            // Toggle 'active' class on click
            collapsible.classList.toggle('active');
        });
    });
}
