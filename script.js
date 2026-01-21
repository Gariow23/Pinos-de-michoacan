const map=L.map('map').setView([19.566,-101.706],7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
 attribution:'© OpenStreetMap'
}).addTo(map);

let markers=[];
const select=document.getElementById('speciesSelect');

speciesData.forEach(s=>{
 let o=document.createElement('option');
 o.value=s.id;
 o.textContent=s.scientific_name;
 select.appendChild(o);
});

select.addEventListener('change',()=>{
 markers.forEach(m=>map.removeLayer(m));
 markers=[];

 const s=speciesData.find(x=>x.id==select.value);
 if(!s)return;

 s.locations.forEach(l=>{
  const popup=`
   <strong><em>${s.scientific_name}</em></strong><br>
   Marcador: ${s.marker}<br>
   Localidad: ${l.locality}<br>
   Altitud: ${l.altitude} m<br><br>
   <img src="${s.image}" width="180">
  `;
  markers.push(
   L.marker([l.lat,l.lon]).addTo(map).bindPopup(popup)
  );
 });
});