const fallbackRepos = [
 {name:"codelens",description:"AI code review & repository intelligence platform.",language:"Python",html_url:"https://github.com/dhanashalini25/codelens",topics:["AI","FastAPI","LLM"]},
 {name:"ibid",description:"Grounded document question answering with RAG.",language:"Python",html_url:"https://github.com/dhanashalini25/ibid",topics:["RAG","FastAPI","Embeddings"]},
 {name:"pulse-queue",description:"Distributed background job processing platform.",language:"JavaScript",html_url:"https://github.com/dhanashalini25/pulse-queue",topics:["Node.js","Redis","Docker"]},
 {name:"devhire-ai-hiring-platform",description:"Full-stack developer hiring platform.",language:"TypeScript",html_url:"https://github.com/dhanashalini25/devhire-ai-hiring-platform",topics:["Next.js","Prisma","PostgreSQL"]},
 {name:"Quiz-website",description:"Browser quiz built with vanilla HTML, CSS and JavaScript.",language:"JavaScript",html_url:"https://github.com/dhanashalini25/Quiz-website",topics:["HTML","CSS","JavaScript"]},
 {name:"fullstack-chat-app",description:"Real-time MERN chat application with Socket.io.",language:"JavaScript",html_url:"https://github.com/dhanashalini25/fullstack-chat-app",topics:["MERN","Socket.io","MongoDB"]},
 {name:"realtime-spotify-clone",description:"Music streaming app with playlists and admin dashboard.",language:"TypeScript",html_url:"https://github.com/dhanashalini25/realtime-spotify-clone",topics:["React","TypeScript","Clerk"]},
 {name:"AI-Job-Intelligence",description:"AI job application tracker with resume-to-posting analysis.",language:"JavaScript",html_url:"https://github.com/dhanashalini25/AI-Job-Intelligence",topics:["AI","FastAPI","MERN"]}
];
let repos=[];

function esc(s){return String(s||"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
function shortDesc(r){return r.description || "Public software project by Dhanashalini S.";}
function openResume(){document.getElementById("resumeModal").classList.add("open");document.getElementById("resumeModal").setAttribute("aria-hidden","false");}
function closeModal(id){document.getElementById(id).classList.remove("open");document.getElementById(id).setAttribute("aria-hidden","true");}
document.addEventListener("keydown",e=>{if(e.key==="Escape")document.querySelectorAll(".modal.open").forEach(m=>m.classList.remove("open"));});

function visualCanvas(canvas,repo){
  const ctx=canvas.getContext("2d"),w=canvas.width=900,h=420;
  let seed=[...repo.name].reduce((a,c)=>a+c.charCodeAt(0),0);
  ctx.fillStyle="#0a0c10";ctx.fillRect(0,0,w,h);
  const grad=ctx.createRadialGradient(w*.55,h*.45,10,w*.55,h*.45,420);
  grad.addColorStop(0,"#26351a");grad.addColorStop(.45,"#11191a");grad.addColorStop(1,"#08090c");ctx.fillStyle=grad;ctx.fillRect(0,0,w,h);
  ctx.strokeStyle="rgba(183,255,60,.11)";ctx.lineWidth=1;
  for(let x=0;x<w;x+=36){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();}
  for(let y=0;y<h;y+=36){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}
  const n=5+(seed%4);
  for(let i=0;i<n;i++){
    const x=120+((seed*(i+3)*17)%620), y=75+((seed*(i+7)*11)%250), r=28+((seed+i*13)%65);
    ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.strokeStyle="rgba(183,255,60,.38)";ctx.stroke();
  }
  ctx.fillStyle="#b7ff3c";ctx.font="700 26px 'Space Grotesk',sans-serif";ctx.fillText((repo.language||"CODE").toUpperCase(),42,58);
  ctx.fillStyle="rgba(255,255,255,.65)";ctx.font="13px 'DM Sans',sans-serif";ctx.fillText("DIGITAL REPOSITORY / VISUALIZED",42,h-35);
}
function renderRepos(list){
  const metric=document.getElementById("repoMetric"); if(metric) metric.textContent=repos.length || list.length || "—";
  const grid=document.getElementById("repoGrid");grid.innerHTML="";
  document.getElementById("repoCount").textContent=`${list.length} repositories shown · live from GitHub when available`;
  list.forEach((r,i)=>{
    const card=document.createElement("article");card.className="repo-card";
    const tags=(r.topics||[]).slice(0,3).map(t=>`<span class="repo-tag">${esc(t)}</span>`).join("");
    card.innerHTML=`<div class="repo-image"><canvas></canvas><span class="repo-num">${String(i+1).padStart(2,"0")} / REPO</span></div><div class="repo-body"><h3>${esc(r.name)}</h3><p>${esc(shortDesc(r))}</p><div class="repo-tags">${tags || `<span class="repo-tag">${esc(r.language||"Project")}</span>`}</div></div>`;
    card.onclick=()=>openRepo(r);
    grid.appendChild(card);visualCanvas(card.querySelector("canvas"),r);
  });
}
function openRepo(r){
  document.getElementById("repoTitle").textContent=r.name;
  document.getElementById("repoDescription").textContent=shortDesc(r);
  document.getElementById("repoLink").href=r.html_url;
  const meta=document.getElementById("repoMeta");
  meta.innerHTML=`<span>LANGUAGE · ${esc(r.language||"Not specified")}</span><span>STARS · ${r.stargazers_count??0}</span><span>FORKS · ${r.forks_count??0}</span><span>OPEN ISSUES · ${r.open_issues_count??0}</span>`;
  const poster=document.getElementById("repoPoster");poster.innerHTML="<canvas></canvas>";visualCanvas(poster.querySelector("canvas"),r);
  document.getElementById("repoModal").classList.add("open");
}
async function loadRepos(){
  try{
    const res=await fetch("https://api.github.com/users/dhanashalini25/repos?per_page=100&sort=updated");
    if(!res.ok)throw new Error("GitHub unavailable");
    repos=await res.json();
    repos=repos.filter(r=>!r.fork);
  }catch(e){
    repos=fallbackRepos;document.getElementById("repoError").hidden=false;
  }
  renderRepos(repos);
}
document.getElementById("repoSearch").addEventListener("input",e=>{
  const q=e.target.value.toLowerCase().trim();
  renderRepos(repos.filter(r=>(r.name+" "+shortDesc(r)+" "+(r.language||"")+" "+(r.topics||[]).join(" ")).toLowerCase().includes(q)));
});

const cases={
land:{title:"AI GIS — Land & Water Detection",body:`<div class="case-content"><h4>From satellite pixels to explainable insight.</h4><p>An applied computer-vision workflow for land/water detection: image preprocessing, semantic segmentation, model training, deployment and visual explanation. The resume records a 28% classification-accuracy improvement and FastAPI deployment with SHAP and LIME.</p><div class="case-grid"><div><b>28%</b><span>accuracy gain</span></div><div><b>CNN</b><span>segmentation pipeline</span></div><div><b>U-Net</b><span>semantic segmentation</span></div></div><p><b>Visual story:</b> source imagery → preprocessing → segmentation mask → model explanation → deployable API.</p></div>`},
enhance:{title:"Visual Quality Studio",body:`<div class="case-content"><h4>Every pixel gets a purpose.</h4><p>A portfolio-ready image workflow showing how a Digital Image Specialist can approach enhancement: inspect → correct exposure and white balance → reduce noise → sharpen important details → validate the final image.</p><div class="case-grid"><div><b>01</b><span>Inspect</span></div><div><b>02</b><span>Enhance</span></div><div><b>03</b><span>Validate</span></div></div><p>This card is intentionally designed as a visual artifact. Replace the concept artwork with your strongest original before/after images for the recruiter-facing version.</p></div>`},
xai:{title:"Explainable AI Intelligence",body:`<div class="case-content"><h4>Make model decisions visible.</h4><p>Explainability work using SHAP, LIME and Grad-CAM concepts to turn model behavior into visual evidence. The goal is not only a prediction, but an interpretable reason behind it.</p><div class="case-grid"><div><b>SHAP</b><span>feature attribution</span></div><div><b>LIME</b><span>local explanation</span></div><div><b>Grad-CAM</b><span>visual attention</span></div></div></div>`},
aircraft:{title:"Aircraft Vibration Intelligence",body:`<div class="case-content"><h4>Signals → features → explainable decisions.</h4><p>A technical intelligence concept around sensor-data ingestion, signal conditioning, FFT/spectral features, RMS and fault explanation. The visual language turns a time-series signal into a readable engineering artifact.</p><div class="case-grid"><div><b>FFT</b><span>frequency analysis</span></div><div><b>RMS</b><span>signal feature</span></div><div><b>XAI</b><span>fault explanation</span></div></div></div>`}
};
function openProject(k){const c=cases[k];document.getElementById("projectTitle").textContent=c.title;document.getElementById("projectBody").innerHTML=c.body;document.getElementById("projectModal").classList.add("open");}
const artworkCases={
 sketch:{title:"Pencil Sketch",src:"assets/artwork/sketch.jpg",caption:"Original work by Dhanashalini — pencil construction stage with proportions, linework and likeness established by hand."},
 inked:{title:"Inked & Colored",src:"assets/artwork/inked-colored.jpg",caption:"Original work by Dhanashalini — inked linework and traditional color stage."},
 digital:{title:"Digital Painting",src:"assets/artwork/digital-painting.jpg",caption:"Original work by Dhanashalini — final digital repaint with lighting, texture and rendering."}
};
function openArtwork(k){const a=artworkCases[k];document.getElementById("artworkTitle").textContent=a.title;document.getElementById("artworkViewer").src=a.src;document.getElementById("artworkViewer").alt=a.title+" — original artwork by Dhanashalini";document.getElementById("artworkCaption").innerHTML="<b>Created by me.</b> "+a.caption.replace("Original work by Dhanashalini — ","");document.getElementById("artworkModal").classList.add("open");}
loadRepos();
