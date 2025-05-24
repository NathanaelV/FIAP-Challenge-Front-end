js

document.addEventListener('DOMContentLoaded', function() {
    
    const body = document.body;
    let fontSize = 16;
    const fontStep = 2;
    const minFontSize = 12;
    const maxFontSize = 22;

    
    document.getElementById('font-increase')?.addEventListener('click', () => {
        if (fontSize < maxFontSize) {
            fontSize += fontStep;
            body.style.fontSize = `${fontSize}px`;
        }
    });

    document.getElementById('font-decrease')?.addEventListener('click', () => {
        if (fontSize > minFontSize) {
            fontSize -= fontStep;
            body.style.fontSize = `${fontSize}px`;
        }
    });

    
    document.getElementById('high-contrast')?.addEventListener('click', () => {
        body.classList.toggle('high-contrast');
        localStorage.setItem('highContrast', body.classList.contains('high-contrast'));
    });

    
    if (localStorage.getItem('highContrast') === 'true') {
        body.classList.add('high-contrast');
    }

    
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    menuToggle?.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', mainNav.classList.contains('active'));
    });

    
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav?.classList.remove('active');
            menuToggle?.setAttribute('aria-expanded', 'false');
        });
    });

    
    const agendamentoForm = document.getElementById('agendamento-form');
    
    if (agendamentoForm) {
        const validateField = (input, errorElement, validationFn, errorMessage) => {
            const isValid = validationFn(input.value);
            errorElement.style.display = isValid ? 'none' : 'block';
            errorElement.textContent = errorMessage;
            return isValid;
        };

        const validations = {
            nome: value => value.trim() !== '',
            telefone: value => /^[0-9]{10,11}$/.test(value),
            especialista: value => value !== '',
            horario: value => value !== ''
        };

        const errorMessages = {
            nome: 'Por favor, insira seu nome completo',
            telefone: 'Por favor, insira um telefone válido (DDD + número)',
            especialista: 'Por favor, selecione um especialista',
            horario: 'Por favor, selecione um horário'
        };

        agendamentoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            // Validar todos os campos
            isValid &= validateField(
                document.getElementById('ag-nome'),
                document.getElementById('ag-nome-error'),
                validations.nome,
                errorMessages.nome
            );

            isValid &= validateField(
                document.getElementById('ag-telefone'),
                document.getElementById('ag-telefone-error'),
                validations.telefone,
                errorMessages.telefone
            );

            isValid &= validateField(
                document.getElementById('ag-especialista'),
                document.getElementById('ag-especialista-error'),
                validations.especialista,
                errorMessages.especialista
            );

            isValid &= validateField(
                document.getElementById('ag-horario'),
                document.getElementById('ag-horario-error'),
                validations.horario,
                errorMessages.horario
            );

            if (isValid) {
                alert('Agendamento confirmado com sucesso!');
                this.reset();
            }
        });
    }

    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('.main-header')?.offsetHeight || 100;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                
                history.pushState(null, null, targetId);
            }
        });
    });

    
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isOpening = !faqItem.classList.contains('active');
            
            
            if (isOpening) {
                document.querySelectorAll('.faq-item').forEach(item => {
                    if (item !== faqItem) item.classList.remove('active');
                });
            }
            
            faqItem.classList.toggle('active');
        });
    });

   
    const specialtyContents = {
        cardio: {
            title: 'Cardiologia',
            description: 'A cardiologia cuida da saúde do seu coração com exames modernos e atendimento humanizado.',
            items: ['ECG e Ecocardiograma', 'Check-ups cardíacos', 'Monitoramento remoto']
        },
        neuro: {
            title: 'Neurologia',
            description: 'Diagnóstico e tratamento de doenças neurológicas com suporte tecnológico.',
            items: ['Tratamento de AVC', 'Doença de Parkinson', 'Distúrbios do sono']
        },
        orto: {
            title: 'Ortopedia',
            description: 'Cuide de ossos, articulações e músculos com especialistas experientes.',
            items: ['Reabilitação pós-fratura', 'Cirurgias ortopédicas', 'Tratamento de dores crônicas']
        },
        pneumo: {
            title: 'Pneumologia',
            description: 'Tratamento de doenças respiratórias com tecnologia e precisão.',
            items: ['Asma e Bronquite', 'Doenças pulmonares crônicas', 'Exames de função pulmonar']
        }
    };

    document.querySelectorAll('.card-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const id = this.getAttribute('href').replace('#', '');
            const content = specialtyContents[id];
            const section = document.getElementById('tecnologia');

            if (content && section) {
                section.innerHTML = `
                    <div class="container">
                        <h2>${content.title}</h2>
                        <p>${content.description}</p>
                        <ul>
                            ${content.items.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                        <a href="#especialidades" class="btn btn-secondary" style="margin-top: 20px;">
                            <i class="fas fa-arrow-left"></i> Voltar
                        </a>
                    </div>
                `;
                
               
                const headerHeight = document.querySelector('.main-header')?.offsetHeight || 100;
                window.scrollTo({
                    top: section.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
});