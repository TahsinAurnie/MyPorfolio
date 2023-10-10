const sections = document.querySelectorAll('.section');
const sectBtns = document.querySelectorAll('.controlls');
const sectBtn = document.querySelectorAll('.control');
const allSections = document.querySelector('.main-content');

function pageTransitions(){
    //button click active class
    for(let i=0; i<sectBtn.length; i++){
        sectBtn[i].addEventListener('click', function(){
            let currentBtn = document.querySelectorAll('.active-btn');
            currentBtn[0].className = currentBtn[0].className.replace('active-btn','');
            this.className += ' active-btn';
        })
    }
    //sections active class
    allSections.addEventListener('click', (e)=>{
        const id = e.target.dataset.id;
        if(id){
            //remove selected from the other buttons
            sectBtns.forEach((btn)=>{
                btn.classList.remove('active')
            })
            e.target.classList.add('active')

            //hide other sections
            sections.forEach((sect)=>{
                sect.classList.remove('active')
            })
            const element = document.getElementById(id);
            element.classList.add('active');
        }
    })
    //toggle theme
    const themeBtn = document.querySelector('.theme-btn');
    themeBtn.addEventListener('click', ()=>{
        let element = document.body;
        element.classList.toggle('light-mode')
    })
}  
pageTransitions();


//...........................................................................................................
// animate counting
//...........................................................................................................

function startCounting(entries, observer) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const countTo = parseInt(target.querySelector('.large-text').getAttribute('data-count'), 10);
            const duration = 6300; // Animation duration in milliseconds
            
            let currentCount = 0;
            const countElement = target.querySelector('.large-text');

            function updateCount() {
                const step = Math.ceil(countTo / (duration / 1000));
                currentCount += step;

                if (currentCount >= countTo) {
                    currentCount = countTo;
                    clearInterval(countInterval);
                }

                countElement.textContent = `${currentCount}+`;
            }
            // Check if this is the last element and set initial content to "1+"
            if (index == entries.length - 1) {
                countElement.textContent = `1+`;
            }
            const countInterval = setInterval(updateCount, 5000 / Math.abs(countTo));
        }
    });
}
// Create an Intersection Observer
const observer = new IntersectionObserver(startCounting, {
    threshold: 0.5, // Trigger when at least 50% of the element is in the viewport
});

// Observe each counter element
const counters = document.querySelectorAll('.counter');
counters.forEach((counter) => {
    observer.observe(counter);
});



//...........................................................................................................
// animate progress bars
//...........................................................................................................

const progBars = document.querySelectorAll('.prog-text');

const options = {
  threshold: .5, // Adjust this threshold as needed
};

const observer2 = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            resetProgressBars(); // Reset progress bars to their initial state
            setTimeout(() => {
                animateProgressBars(); // Start the animation after a delay
            }, 450); // Adjust the delay as needed
        }
    });
}, options);

observer2.observe(document.querySelector('.prog-con'));

function resetProgressBars() {
  progBars.forEach((progText) => {
    const initialPercentage = 0; // Set the initial percentage
    const progressBar = progText.parentElement.querySelector('.prog span');
    progText.textContent = initialPercentage + '%';
    progressBar.style.width = initialPercentage + '%';
  });
}

function animateProgressBars() {
  progBars.forEach((progText) => {
    const targetPercentage = parseInt(progText.getAttribute('data-per'));
    const progressBar = progText.parentElement.querySelector('.prog span');
    let currentPercentage = 0;

    const increment = targetPercentage / 0; // Adjust the speed of animation

    const updateProgressBar = () => {
      if (currentPercentage < targetPercentage) {
        currentPercentage += increment;
        progText.textContent = Math.round(currentPercentage) + '%';
        progressBar.style.width = Math.round(currentPercentage) + '%';
        requestAnimationFrame(updateProgressBar);
      } else {
        progText.textContent = targetPercentage + '%';
        progressBar.style.width = targetPercentage + '%';
      }
    };

    updateProgressBar();
  });
}
