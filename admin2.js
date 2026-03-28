// ===== ADMIN PANEL =====
const adminToggle  = document.getElementById('admin-toggle');
const adminPanel   = document.getElementById('admin-panel');
const adminOverlay = document.getElementById('admin-overlay');
const closeAdmin   = document.getElementById('close-admin');
const loginModal   = document.getElementById('login-modal');
const loginForm    = document.getElementById('login-form');
const loginError   = document.getElementById('login-error');
const logoutBtn    = document.getElementById('admin-logout');

let toggleVisible = false;
function showAdminToggle() {
    toggleVisible = !toggleVisible;
    adminToggle.classList.toggle('visible', toggleVisible);
    if (!toggleVisible) closePanel();
}
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') showAdminToggle();
});
let tapCount = 0, tapTimer = null;
const logoEl = document.querySelector('.logo');
if (logoEl) {
    logoEl.addEventListener('click', () => {
        tapCount++;
        clearTimeout(tapTimer);
        tapTimer = setTimeout(() => { tapCount = 0; }, 2000);
        if (tapCount >= 5) { tapCount = 0; clearTimeout(tapTimer); showAdminToggle(); }
    });
}

const _c = btoa('Muhammad Sayyid Habibie') + '|' + btoa('April1604005');
function isLoggedIn() { return sessionStorage.getItem('adm_auth') === btoa(_c); }
function doLogin(n, p) { return (btoa(n) + '|' + btoa(p)) === _c; }
let data = null;

adminToggle.addEventListener('click', () => {
    if (isLoggedIn()) { openPanel(); }
    else {
        loginModal.classList.remove('hidden');
        adminOverlay.classList.remove('hidden');
        document.getElementById('login-name').focus();
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const n = document.getElementById('login-name').value.trim();
    const p = document.getElementById('login-pass').value;
    if (doLogin(n, p)) {
        sessionStorage.setItem('adm_auth', btoa(_c));
        loginModal.classList.add('hidden');
        loginError.classList.add('hidden');
        loginError.textContent = '';
        openPanel();
    } else {
        loginError.textContent = 'Nama atau password salah.';
        loginError.classList.remove('hidden');
        document.getElementById('login-pass').value = '';
    }
});

logoutBtn.addEventListener('click', () => { sessionStorage.removeItem('adm_auth'); closePanel(); showToast('Berhasil logout.'); });

function openPanel() {
    if (!data) data = loadFromStorage();
    const keys = ['home','footer','about','skills','education','projects','services','testimonials'];
    if (keys.some(k => !data[k])) { localStorage.removeItem('portfolioData'); data = loadFromStorage(); }
    adminPanel.classList.remove('hidden');
    adminOverlay.classList.remove('hidden');
    renderAll();
}
function closePanel() {
    adminPanel.classList.add('hidden');
    loginModal.classList.add('hidden');
    adminOverlay.classList.add('hidden');
}
function closeLoginModal() {
    loginModal.classList.add('hidden');
    adminOverlay.classList.add('hidden');
    loginError.classList.add('hidden');
    loginError.textContent = '';
    document.getElementById('login-name').value = '';
    document.getElementById('login-pass').value = '';
}
closeAdmin.addEventListener('click', closePanel);
document.getElementById('close-login').addEventListener('click', closeLoginModal);
adminOverlay.addEventListener('click', () => {
    if (!adminPanel.classList.contains('hidden')) closePanel(); else closeLoginModal();
});

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    });
});

function renderAll() {
    renderHome(); renderAbout(); renderSkills();
    renderEducation(); renderProjects(); renderServices();
    renderTestimonials(); renderFooter();
}
function renderHome() {
    const h = data.home;
    const f2 = {'home-nickname':'nickname','home-hero-desc':'heroDesc','social-fb':'socialFb','social-wa':'socialWa','social-ig':'socialIg','social-tg':'socialTg'};
    Object.entries(f2).forEach(([id,key]) => { const el=document.getElementById(id); if(!el)return; el.value=h[key]||''; el.oninput=(e)=>{data.home[key]=e.target.value;}; });
}
function renderFooter() {
    const el=document.getElementById('footer-copyright'); if(!el)return;
    el.value=data.footer.copyright||''; el.oninput=(e)=>{data.footer.copyright=e.target.value;};
}
function renderAbout() {
    const a=data.about;
    const f2={'about-subtitle':'subtitle','about-bio1':'bio1','about-bio2':'bio2','stat-years':'statYears','stat-projects':'statProjects','stat-certs':'statCerts'};
    Object.entries(f2).forEach(([id,key]) => { const el=document.getElementById(id); if(!el)return; el.value=a[key]||''; el.oninput=(e)=>{data.about[key]=e.target.value;}; });
}
function renderSkills() {
    document.getElementById('skills-list').innerHTML = data.skills.map((item,i) => `<div class="admin-item"><div class="admin-item-header"><span><i class='bx bx-code'></i> ${item.name||'Skill '+(i+1)}</span><button class="admin-delete" onclick="deleteItem('skills',${i})"><i class='bx bx-trash'></i></button></div><label>Nama Skill</label><input type="text" value="${item.name}" oninput="updateItem('skills',${i},'name',this.value)" placeholder="HTML & CSS"><label>Persentase</label><div style="display:flex;align-items:center;gap:1rem;"><input type="range" min="0" max="100" value="${item.percent}" oninput="updateItem('skills',${i},'percent',this.value);this.nextElementSibling.textContent=this.value+'%'" style="flex:1;accent-color:var(--main-color);"><span style="color:var(--main-color);font-weight:700;min-width:4rem;">${item.percent}%</span></div><label>Kategori</label><select oninput="updateItem('skills',${i},'category',this.value)" style="width:100%;padding:1rem 1.4rem;background:#0e0e0e;border:1px solid rgba(0,255,238,0.25);border-radius:0.8rem;color:white;font-size:1.4rem;"><option value="technical" ${item.category==='technical'?'selected':''}>Technical Skills</option><option value="design" ${item.category==='design'?'selected':''}>Design & Tools</option></select></div>`).join('');
}
function renderEducation() {
    document.getElementById('edu-list').innerHTML = data.education.map((item,i) => `<div class="admin-item"><div class="admin-item-header"><span><i class='bx bx-book'></i> ${item.title||'Education '+(i+1)}</span><button class="admin-delete" onclick="deleteItem('education',${i})"><i class='bx bx-trash'></i></button></div><label>Periode</label><input type="text" value="${item.date}" oninput="updateItem('education',${i},'date',this.value)" placeholder="2020 - 2024"><label>Nama Institusi</label><input type="text" value="${item.title}" oninput="updateItem('education',${i},'title',this.value)" placeholder="Nama Sekolah"><label>Deskripsi</label><textarea oninput="updateItem('education',${i},'desc',this.value)">${item.desc}</textarea></div>`).join('');
}
function renderProjects() {
    document.getElementById('proj-list').innerHTML = data.projects.map((item,i) => `<div class="admin-item"><div class="admin-item-header"><span><i class='bx bx-code-block'></i> ${item.title||'Project '+(i+1)}</span><button class="admin-delete" onclick="deleteItem('projects',${i})"><i class='bx bx-trash'></i></button></div><label>Nama Project</label><input type="text" value="${item.title}" oninput="updateItem('projects',${i},'title',this.value)" placeholder="Nama Project"><label>Deskripsi</label><textarea oninput="updateItem('projects',${i},'desc',this.value)">${item.desc}</textarea><label>Tags (pisahkan koma)</label><input type="text" value="${item.tags}" oninput="updateItem('projects',${i},'tags',this.value)" placeholder="HTML, CSS"><label>Link Demo</label><input type="url" value="${item.demo}" oninput="updateItem('projects',${i},'demo',this.value)" placeholder="https://..."><label>Link Source Code</label><input type="url" value="${item.source}" oninput="updateItem('projects',${i},'source',this.value)" placeholder="https://github.com/..."></div>`).join('');
}
function renderServices() {
    document.getElementById('serv-list').innerHTML = data.services.map((item,i) => `<div class="admin-item"><div class="admin-item-header"><span><i class='bx bx-briefcase'></i> ${item.title||'Service '+(i+1)}</span><button class="admin-delete" onclick="deleteItem('services',${i})"><i class='bx bx-trash'></i></button></div><label>Nama Layanan</label><input type="text" value="${item.title}" oninput="updateItem('services',${i},'title',this.value)" placeholder="Nama Layanan"><label>Deskripsi</label><textarea oninput="updateItem('services',${i},'desc',this.value)">${item.desc}</textarea></div>`).join('');
}
function renderTestimonials() {
    document.getElementById('testi-list').innerHTML = data.testimonials.map((item,i) => `<div class="admin-item"><div class="admin-item-header"><span><i class='bx bx-user'></i> ${item.name||'Testimonial '+(i+1)}</span><button class="admin-delete" onclick="deleteItem('testimonials',${i})"><i class='bx bx-trash'></i></button></div><label>Nama</label><input type="text" value="${item.name}" oninput="updateItem('testimonials',${i},'name',this.value)" placeholder="Nama"><label>Jabatan / Relasi</label><input type="text" value="${item.role}" oninput="updateItem('testimonials',${i},'role',this.value)" placeholder="Dosen, Rekan Tim"><label>Testimoni</label><textarea oninput="updateItem('testimonials',${i},'text',this.value)">${item.text}</textarea></div>`).join('');
}

function updateItem(section,index,field,value) { data[section][index][field]=value; }
function deleteItem(section,index) {
    if(!confirm('Hapus item ini?')) return;
    data[section].splice(index,1); renderAll();
}
document.getElementById('add-skill').addEventListener('click', ()=>{ data.skills.push({name:'',percent:50,category:'technical'}); renderSkills(); });
document.getElementById('add-edu').addEventListener('click',   ()=>{ data.education.push({date:'',title:'',desc:''}); renderEducation(); });
document.getElementById('add-proj').addEventListener('click',  ()=>{ data.projects.push({title:'',desc:'',tags:'',demo:'',source:''}); renderProjects(); });
document.getElementById('add-serv').addEventListener('click',  ()=>{ data.services.push({title:'',desc:''}); renderServices(); });
document.getElementById('add-testi').addEventListener('click', ()=>{ data.testimonials.push({name:'',role:'',text:''}); renderTestimonials(); });

document.getElementById('save-all').addEventListener('click', () => {
    saveToStorage();
    applyToDOM();
    closePanel();
    syncToGitHub();
});
document.getElementById('reset-data').addEventListener('click', () => {
    if(!confirm('Reset semua data ke default?')) return;
    localStorage.removeItem('portfolioData'); data=loadFromStorage(); renderAll(); showToast('Data direset ke default.');
});

function applyToDOM() {
    const h=data.home, a=data.about, f=data.footer;
    const nickEl=document.querySelector('.home-content h1 span'); if(nickEl&&h.nickname) nickEl.textContent=h.nickname;
    const heroEl=document.querySelector('.home-content > p'); if(heroEl&&h.heroDesc) heroEl.textContent=h.heroDesc;
    const waNum=(h.socialWa||'').replace(/\D/g,'');
    document.querySelectorAll('.social-icon a, .footer .social a').forEach(el => {
        const icon=el.querySelector('i'); if(!icon) return;
        if(icon.classList.contains('bxl-facebook-circle')&&h.socialFb) el.href=h.socialFb;
        if(icon.classList.contains('bxl-whatsapp')&&waNum) el.href='https://wa.me/'+waNum;
        if(icon.classList.contains('bxl-instagram')&&h.socialIg) el.href=h.socialIg;
        if(icon.classList.contains('bxl-telegram')&&h.socialTg) el.href=h.socialTg;
    });
    window._waNumber=waNum||'6281382897508';
    const cpEl=document.querySelector('.footer .copyright'); if(cpEl&&f.copyright) cpEl.textContent=f.copyright;
    const subEl=document.querySelector('.about-content h3'); if(subEl&&a.subtitle) subEl.textContent=a.subtitle;
    const bios=document.querySelectorAll('.about-content > p');
    if(bios[0]&&a.bio1) bios[0].textContent=a.bio1;
    if(bios[1]&&a.bio2) bios[1].textContent=a.bio2;
    const stats=document.querySelectorAll('.stat-item h3');
    if(stats[0]&&a.statYears) stats[0].textContent=a.statYears;
    if(stats[1]&&a.statProjects) stats[1].textContent=a.statProjects;
    if(stats[2]&&a.statCerts) stats[2].textContent=a.statCerts;
    const cols=document.querySelectorAll('.skills-col');
    const bS=(arr)=>arr.map(s=>'<div class="skill-item"><div class="skill-label"><span>'+s.name+'</span><span>'+s.percent+'%</span></div><div class="skill-bar"><div class="skill-fill" data-width="'+s.percent+'" style="width:'+s.percent+'%"></div></div></div>').join('');
    [0,1].forEach(ci=>{ if(!cols[ci])return; const h3=cols[ci].querySelector('h3'); const cat=ci===0?'technical':'design'; cols[ci].innerHTML=''; if(h3)cols[ci].appendChild(h3); cols[ci].insertAdjacentHTML('beforeend',bS(data.skills.filter(s=>s.category===cat))); });
    document.querySelector('.timeline-items').innerHTML=data.education.map(item=>'<div class="timeline-item reveal visible"><div class="timeline-dot"></div><div class="timeline-date">'+item.date+'</div><div class="timeline-content"><h3>'+item.title+'</h3><p>'+item.desc+'</p></div></div>').join('');
    document.querySelector('.projects-container').innerHTML=data.projects.map(item=>{ const tags=item.tags.split(',').map(t=>'<span>'+t.trim()+'</span>').join(''); return '<div class="project-card reveal visible"><div class="project-img"><img src="assets/image.png" alt="'+item.title+'"><div class="project-overlay"><a href="'+(item.demo||'#')+'" target="_blank" rel="noopener" class="btn">Live Demo</a><a href="'+(item.source||'#')+'" target="_blank" rel="noopener" class="btn btn-outline">Source Code</a></div></div><div class="project-info"><h3>'+item.title+'</h3><p>'+item.desc+'</p><div class="project-tags">'+tags+'</div></div></div>'; }).join('');
    const icons=['bxs-paint','bx-code-alt','bx-server','bx-bug','bx-wrench','bx-mobile-alt'];
    document.querySelector('.services-container').innerHTML=data.services.map((item,i)=>'<div class="services-box reveal visible"><div class="services-info"><i class="bx '+icons[i%icons.length]+'"></i><h4>'+item.title+'</h4><p>'+item.desc+'</p></div></div>').join('');
    const imgs=['assets/img1.jpg','assets/img2.jpg','assets/img3.jpg'];
    document.querySelector('.wrapper').innerHTML=data.testimonials.map((item,i)=>'<div class="testimonial-item reveal visible"><img src="'+imgs[i%imgs.length]+'" alt="'+item.name+'"><h2>'+item.name+'</h2><p class="testimonial-role">'+item.role+'</p><div class="rating"><i class="bx bxs-star"></i><i class="bx bxs-star"></i><i class="bx bxs-star"></i><i class="bx bxs-star"></i><i class="bx bxs-star"></i></div><p>'+item.text+'</p></div>').join('');
}

function saveToStorage() { localStorage.setItem('portfolioData', JSON.stringify(data)); }

// ── GitHub Sync ───────────────────────────────────────────
const GH_USER   = 'sayyid-habibie';
const GH_REPO   = 'portofolio';
const GH_TOKEN  = ['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'].join('');
const GH_BRANCH = 'main';

async function syncToGitHub() {
    showToast('Menyinkronkan ke GitHub...');
    try {
        const payload = JSON.stringify(data, null, 2);
        const encoded = btoa(unescape(encodeURIComponent(payload)));
        const filePath = 'portfolio-data.json';
        const apiUrl = 'https://api.github.com/repos/' + GH_USER + '/' + GH_REPO + '/contents/' + filePath;
        const headers = {
            'Authorization': 'Bearer ' + GH_TOKEN,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
        };

        // Get current SHA if file exists
        let sha = null;
        const getRes = await fetch(apiUrl, {
            headers: { 'Authorization': 'Bearer ' + GH_TOKEN, 'Accept': 'application/vnd.github.v3+json' }
        });
        if (getRes.ok) {
            const existing = await getRes.json();
            sha = existing.sha;
        }

        // Push updated file
        const body = { message: 'Update portfolio data', content: encoded, branch: GH_BRANCH };
        if (sha) body.sha = sha;

        const putRes = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + GH_TOKEN,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (putRes.ok) {
            showToast('Tersimpan & tersinkron ke GitHub!');
        } else {
            const err = await putRes.json();
            console.error('GitHub sync error:', err);
            showToast('Tersimpan lokal. Sinkron GitHub gagal.');
        }
    } catch(e) {
        console.error(e);
        showToast('Tersimpan lokal. Periksa koneksi internet.');
    }
}
function loadFromStorage() {
    try {
        const saved=localStorage.getItem('portfolioData');
        if(saved){ const p=JSON.parse(saved); if(['home','footer','about','skills','education','projects','services','testimonials'].every(k=>p[k])) return p; }
    } catch(e){ localStorage.removeItem('portfolioData'); }
    return {
        home:{nickname:'Abib',heroDesc:'Mahasiswa S1 Informatika di Stikom El Rahma yang passionate di bidang Frontend Development, UI/UX Design, dan Software Testing.',socialFb:'https://www.facebook.com/sayyid.gans.9?mibextid=ZbWKwL',socialWa:'6281382897508',socialIg:'https://www.instagram.com/moch_syyd_habbie?igsh=bzBhNWoxMThyejZk',socialTg:'https://t.me/ILAHABI'},
        footer:{copyright:'\u00a9 2025 Muhammad Sayyid Habibie | All Rights Reserved'},
        about:{subtitle:'Frontend Developer & UI Designer',bio1:'Saya adalah Muhammad Sayyid Habibie, biasa dipanggil Abib. Lahir tahun 2005 dan saat ini sedang menempuh studi S1 Informatika di Stikom El Rahma.',bio2:'Saya memiliki ketertarikan besar dalam membangun antarmuka web yang menarik dan fungsional.',statYears:'2+',statProjects:'4+',statCerts:'3+'},
        skills:[{name:'HTML & CSS',percent:90,category:'technical'},{name:'JavaScript',percent:75,category:'technical'},{name:'React',percent:60,category:'technical'},{name:'Node.js',percent:50,category:'technical'},{name:'Python',percent:55,category:'technical'},{name:'UI / UX Design',percent:80,category:'design'},{name:'Figma',percent:75,category:'design'},{name:'Software Testing',percent:70,category:'design'},{name:'Git & GitHub',percent:65,category:'design'},{name:'MySQL',percent:55,category:'design'}],
        education:[{date:'2010 \u2013 2016',title:'SDN Jampang 02',desc:'Menyelesaikan pendidikan dasar dengan aktif mengikuti kegiatan belajar dan ekstrakurikuler.'},{date:'2016 \u2013 2019',title:"MTS Daarul Musyaffa'",desc:"Menempuh pendidikan menengah pertama berbasis pesantren di Warunggunung, Lebak, Banten."},{date:'2019 \u2013 2022',title:'SMK Bhakti Mandiri',desc:'Menyelesaikan pendidikan menengah kejuruan jurusan Teknik Komputer dan Jaringan (TKJ).'},{date:'2022 \u2013 Sekarang',title:'Stikom El Rahma \u2013 S1 Informatika',desc:'Sedang menempuh studi S1 Informatika dengan fokus pada Frontend Development, UI/UX Design, dan Software Testing.'}],
        projects:[{title:'Personal Portfolio Website',desc:'Website portofolio pribadi menggunakan HTML, CSS, dan JavaScript murni.',tags:'HTML, CSS, JavaScript',demo:'#',source:'#'},{title:'E-Commerce UI Design',desc:'Desain antarmuka aplikasi e-commerce modern dan user-friendly.',tags:'UI Design, Figma, Prototyping',demo:'#',source:'#'},{title:'Task Management App',desc:'Aplikasi manajemen tugas berbasis web dengan fitur CRUD.',tags:'HTML, CSS, JavaScript, LocalStorage',demo:'#',source:'#'},{title:'Web Testing Documentation',desc:'Dokumentasi pengujian aplikasi web dengan standar QA terstruktur.',tags:'Manual Testing, Test Case, Bug Report',demo:'#',source:'#'}],
        services:[{title:'UI / UX Design',desc:'Merancang tampilan antarmuka yang bersih, intuitif, dan estetis.'},{title:'Frontend Development',desc:'Membangun halaman web responsif menggunakan HTML, CSS, JavaScript, dan React.'},{title:'Backend Development',desc:'Mengembangkan server, REST API, dan database menggunakan Node.js, Python, SQL, dan MongoDB.'},{title:'Software Testing',desc:'Pengujian fungsional, regresi, dan eksplorasi untuk memastikan kualitas aplikasi.'}],
        testimonials:[{name:'Yusuf Abdilhaq',role:'Dosen Pemrograman Web',text:'"Sayyid adalah mahasiswa yang tekun. Perkembangan kemampuan teknisnya sangat terlihat dari semester ke semester."'},{name:'Rizky Pratama',role:'Rekan Tim Proyek',text:'"Bekerja sama dengan Abib sangat menyenangkan. Ia bertanggung jawab dan selalu memberikan solusi kreatif."'},{name:'Siti Nurhaliza',role:'Teman Sekelas',text:'"Abib orangnya sabar dan suka membantu teman yang kesulitan memahami coding."'}]
    };
}
function showToast(msg) {
    const t=document.createElement('div'); t.className='admin-toast';
    t.innerHTML='<i class="bx bx-check-circle"></i> '+msg;
    document.body.appendChild(t);
    setTimeout(()=>t.classList.add('show'),10);
    setTimeout(()=>{ t.classList.remove('show'); setTimeout(()=>t.remove(),400); },3000);
}
window.addEventListener('DOMContentLoaded', () => {
    // Load data teks dari GitHub
    const apiUrl = 'https://api.github.com/repos/' + GH_USER + '/' + GH_REPO + '/contents/portfolio-data.json';
    fetch(apiUrl, { headers: { 'Authorization': 'Bearer ' + GH_TOKEN, 'Accept': 'application/vnd.github.v3+json' } })
        .then(res => res.ok ? res.json() : null)
        .then(file => {
            if (file && file.content) {
                try {
                    const decoded = decodeURIComponent(escape(atob(file.content.replace(/\n/g,''))));
                    data = JSON.parse(decoded);
                    localStorage.setItem('portfolioData', JSON.stringify(data));
                    applyToDOM();
                } catch(e) { loadLocal(); }
            } else { loadLocal(); }
        })
        .catch(() => loadLocal());

    // Load foto dari GitHub
    const photoUrl = 'https://api.github.com/repos/' + GH_USER + '/' + GH_REPO + '/contents/portfolio-photos.json';
    fetch(photoUrl, { headers: { 'Authorization': 'Bearer ' + GH_TOKEN, 'Accept': 'application/vnd.github.v3+json' } })
        .then(res => res.ok ? res.json() : null)
        .then(file => {
            if (file && file.content) {
                try {
                    const photos = JSON.parse(decodeURIComponent(escape(atob(file.content.replace(/\n/g,'')))));
                    const map = {
                        'photoProfile': '.home-img img, .about-img img',
                        'photoTesti1':  '.testimonial-item:nth-child(1) img',
                        'photoTesti2':  '.testimonial-item:nth-child(2) img',
                        'photoTesti3':  '.testimonial-item:nth-child(3) img',
                    };
                    Object.entries(photos).forEach(([key, url]) => {
                        localStorage.setItem(key, url);
                        if (key === 'cvUrl') {
                            localStorage.setItem('portfolioCVData', url);
                            updateCVLinks(url);
                            return;
                        }
                        if (key === 'cvName') {
                            localStorage.setItem('portfolioCVName', url);
                            return;
                        }
                        if (map[key]) document.querySelectorAll(map[key]).forEach(el => el.src = url);
                        const preview = document.getElementById('preview-' + key.replace('photo','').toLowerCase());
                        if (preview) preview.src = url;
                    });
                } catch(e) { loadLocalPhotos(); }
            } else { loadLocalPhotos(); }
        })
        .catch(() => loadLocalPhotos());
});

function loadLocalPhotos() {
    [
        ['photoProfile', '.home-img img, .about-img img'],
        ['photoTesti1',  '.testimonial-item:nth-child(1) img'],
        ['photoTesti2',  '.testimonial-item:nth-child(2) img'],
        ['photoTesti3',  '.testimonial-item:nth-child(3) img'],
    ].forEach(([key, sel]) => {
        const saved = localStorage.getItem(key);
        if (saved) document.querySelectorAll(sel).forEach(el => el.src = saved);
    });
}

function loadLocal() {
    try { const s=localStorage.getItem('portfolioData'); if(s){ data=JSON.parse(s); applyToDOM(); } } catch(e){ localStorage.removeItem('portfolioData'); }
}

// CV Upload
const cvFileInput=document.getElementById('cv-file-input');
const cvDropZone=document.getElementById('cv-drop-zone');
const cvStatus=document.getElementById('cv-status');
const cvFilename=document.getElementById('cv-filename');
const cvFilesize=document.getElementById('cv-filesize');
const cvPreviewBtn=document.getElementById('cv-preview-btn');
const cvRemoveBtn=document.getElementById('cv-remove-btn');
(function initCV(){ const s=localStorage.getItem('portfolioCVName'),d=localStorage.getItem('portfolioCVData'); if(s&&d){ showCVStatus(s,d); updateCVLinks(d); } })();
const ALLOWED_TYPES=['application/pdf','image/png','image/jpeg'];
function isAllowedFile(f){ return ALLOWED_TYPES.includes(f.type); }
cvFileInput.addEventListener('change',(e)=>{ handleCVFile(e.target.files[0]); });
cvDropZone.addEventListener('dragover',(e)=>{ e.preventDefault(); cvDropZone.classList.add('drag-over'); });
cvDropZone.addEventListener('dragleave',()=>cvDropZone.classList.remove('drag-over'));
cvDropZone.addEventListener('drop',(e)=>{ e.preventDefault(); cvDropZone.classList.remove('drag-over'); const f=e.dataTransfer.files[0]; if(f&&isAllowedFile(f)) handleCVFile(f); else showToast('Format tidak didukung. Gunakan PDF, PNG, atau JPG.'); });
function handleCVFile(file){
    if(!file) return;
    if(!isAllowedFile(file)){ showToast('Format tidak didukung.'); return; }
    if(file.size>5*1024*1024){ showToast('Ukuran file maksimal 5MB.'); return; }
    const reader=new FileReader();
    reader.onload=(e)=>{
        const d=e.target.result,sz=(file.size/1024/1024).toFixed(2);
        // Upload ke Cloudinary supaya bisa diakses semua device
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_PRESET);
        formData.append('resource_type', 'auto');
        showToast('Mengupload CV...');
        fetch('https://api.cloudinary.com/v1_1/' + CLOUDINARY_CLOUD + '/upload', { method:'POST', body:formData })
            .then(r=>r.json())
            .then(result=>{
                const url = result.secure_url || d;
                localStorage.setItem('portfolioCVData', url);
                localStorage.setItem('portfolioCVName', file.name);
                localStorage.setItem('portfolioCVSize', sz+' MB');
                localStorage.setItem('portfolioCVType', file.type);
                showCVStatus(file.name, url, sz+' MB', file.type);
                updateCVLinks(url);
                // Simpan URL CV ke portfolio-photos.json di GitHub
                syncPhotoToGitHub('cvUrl', url);
                syncPhotoToGitHub('cvName', file.name);
            })
            .catch(()=>{
                // Fallback ke base64 lokal
                localStorage.setItem('portfolioCVData',d); localStorage.setItem('portfolioCVName',file.name);
                localStorage.setItem('portfolioCVSize',sz+' MB'); localStorage.setItem('portfolioCVType',file.type);
                showCVStatus(file.name,d,sz+' MB',file.type); updateCVLinks(d);
                showToast('CV tersimpan lokal saja.');
            });
    };
    reader.readAsDataURL(file);
}
function showCVStatus(name,dataUrl,size,type){
    const st=type||localStorage.getItem('portfolioCVType')||'application/pdf';
    const icon=document.querySelector('.cv-status-info i');
    if(icon){ icon.className=st.startsWith('image/')?'bx bxs-image':'bx bxs-file-pdf'; icon.style.color=st.startsWith('image/')?'#00b8aa':'#ff4d4d'; }
    cvDropZone.classList.add('hidden'); cvStatus.classList.remove('hidden');
    cvFilename.textContent=name; cvFilesize.textContent=size||localStorage.getItem('portfolioCVSize')||'';
    cvPreviewBtn.href=dataUrl;
}
function updateCVLinks(dataUrl){ document.querySelectorAll('a[download]').forEach(a=>{ a.href=dataUrl; a.download=localStorage.getItem('portfolioCVName')||'cv.pdf'; }); }
cvRemoveBtn.addEventListener('click',()=>{
    if(!confirm('Hapus CV?')) return;
    ['portfolioCVData','portfolioCVName','portfolioCVSize','portfolioCVType'].forEach(k=>localStorage.removeItem(k));
    cvStatus.classList.add('hidden'); cvDropZone.classList.remove('hidden'); cvFileInput.value='';
    document.querySelectorAll('a[download]').forEach(a=>{ a.href='cv.pdf'; a.download='cv.pdf'; });
    showToast('CV berhasil dihapus.');
});

// ===== PHOTO UPLOAD (Cloudinary + GitHub sync) =====
const CLOUDINARY_CLOUD = 'dzwmublsm';
const CLOUDINARY_PRESET = 'my_folder';

function setupPhotoUpload(inputId, previewId, storageKey, applySelector) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    if (!input || !preview) return;

    // Load saved URL
    const saved = localStorage.getItem(storageKey);
    if (saved) {
        preview.src = saved;
        document.querySelectorAll(applySelector).forEach(el => el.src = saved);
    }

    input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file || !file.type.startsWith('image/')) { showToast('Pilih file gambar yang valid.'); return; }
        if (file.size > 10 * 1024 * 1024) { showToast('Ukuran foto maksimal 10MB.'); return; }

        showToast('Mengupload foto...');

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_PRESET);

        fetch('https://api.cloudinary.com/v1_1/' + CLOUDINARY_CLOUD + '/image/upload', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(result => {
            if (result.secure_url) {
                const url = result.secure_url;
                // Simpan ke localStorage
                localStorage.setItem(storageKey, url);
                // Update tampilan
                preview.src = url;
                document.querySelectorAll(applySelector).forEach(el => el.src = url);
                // Simpan URL ke GitHub
                syncPhotoToGitHub(storageKey, url);
            } else {
                showToast('Upload gagal. Coba lagi.');
                console.error(result);
            }
        })
        .catch(() => showToast('Upload gagal. Periksa koneksi internet.'));
    });
}

async function syncPhotoToGitHub(key, url) {
    // Baca file photos.json dari GitHub, update key, push balik
    const apiUrl = 'https://api.github.com/repos/' + GH_USER + '/' + GH_REPO + '/contents/portfolio-photos.json';
    const headers = { 'Authorization': 'Bearer ' + GH_TOKEN, 'Accept': 'application/vnd.github.v3+json' };

    let photos = {}, sha = null;
    try {
        const res = await fetch(apiUrl, { headers });
        if (res.ok) {
            const file = await res.json();
            sha = file.sha;
            photos = JSON.parse(decodeURIComponent(escape(atob(file.content.replace(/\n/g,'')))));
        }
    } catch(e) {}

    photos[key] = url;
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(photos, null, 2))));
    const body = { message: 'Update photo: ' + key, content: encoded, branch: GH_BRANCH };
    if (sha) body.sha = sha;

    try {
        const putRes = await fetch(apiUrl, {
            method: 'PUT',
            headers: { ...headers, 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        if (putRes.ok) {
            showToast('Foto berhasil disimpan!');
        } else {
            const err = await putRes.json();
            console.error('GitHub photo sync error:', putRes.status, err.message);
            showToast('Foto terupload tapi gagal sinkron (' + putRes.status + ': ' + err.message + ')');
        }
    } catch(e) {
        console.error('GitHub photo sync exception:', e);
        showToast('Foto terupload tapi gagal sinkron ke GitHub.');
    }
}

setupPhotoUpload('upload-profile', 'preview-profile', 'photoProfile', '.home-img img, .about-img img');
setupPhotoUpload('upload-testi1',  'preview-testi1',  'photoTesti1',  '.testimonial-item:nth-child(1) img');
setupPhotoUpload('upload-testi2',  'preview-testi2',  'photoTesti2',  '.testimonial-item:nth-child(2) img');
setupPhotoUpload('upload-testi3',  'preview-testi3',  'photoTesti3',  '.testimonial-item:nth-child(3) img');

