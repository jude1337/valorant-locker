
async function loadData(){
  // 1) Try embedded JSON
  const tag = document.getElementById('locker-data');
  if(tag && tag.textContent.trim().length){
    try{
      return JSON.parse(tag.textContent);
    }catch(e){ console.warn('Embedded JSON parse failed', e); }
  }
  // 2) Fallback to data.json fetch
  try{
    const res = await fetch('./data.json', {cache:'no-store'});
    if(!res.ok) throw new Error('HTTP '+res.status);
    return await res.json();
  }catch(e){
    console.error('Failed to load data.json:', e);
    // 3) Last resort: minimal skeleton to keep UI alive
    return { player:{ riot_id:'Val jds#1337', title:'β', player_card_name:'100 Thieves VCT25 Player Card', rank_peak:'Silver 1', account:{level:31,vp:1612,radianite:20,kc:2669}, flex:[]}, skins:{} };
  }
}

async function init(){
  const data = await loadData();

  // Overview
  document.getElementById('riotId').textContent = data.player.riot_id;
  document.getElementById('title').textContent = data.player.title;
  document.getElementById('rank').textContent = data.player.rank_peak;
  document.getElementById('lvl').textContent = data.player.account.level;
  document.getElementById('vp').textContent = data.player.account.vp;
  document.getElementById('rad').textContent = data.player.account.radianite;
  document.getElementById('kc').textContent = data.player.account.kc;
  document.getElementById('playerCardName').textContent = data.player.player_card_name;

  // Skins
  const grid = document.getElementById('skinsGrid');
  const entries = Object.entries(data.skins || {});
  if(entries.length === 0){
    const empty = document.createElement('p');
    empty.textContent = 'No skins found. (If you uploaded the site, make sure data.json is present.)';
    empty.style.color = '#9aa3ab';
    grid.parentElement.appendChild(empty);
  }else{
    entries.forEach(([weapon, list]) => {
      const card = document.createElement('article');
      card.className = 'skin-card';
      card.innerHTML = `
        <div class="head">
          <h3>${weapon}</h3>
          <span class="tag">${list.length} item${list.length!==1?'s':''}</span>
        </div>
        <ul class="skin-list">
          ${list.map(i=>'<li>'+i+'</li>').join('')}
        </ul>
      `;
      grid.appendChild(card);
    });
  }

  // Flex
  const flex = document.getElementById('flexList');
  (data.player.flex || []).forEach(f => {
    const li = document.createElement('li');
    li.textContent = f;
    flex.appendChild(li);
  });
  if((data.player.flex || []).length === 0){
    const note = document.createElement('p');
    note.textContent = 'No flex items found.';
    note.style.color = '#9aa3ab';
    document.getElementById('flex').appendChild(note);
  }
}
init();
