const seeds = require('./seeds.json');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({error:'Use GET'});
  const id = req.query.id;
  if (typeof id !== 'string' || !Object.hasOwn(seeds, id)) return res.status(400).json({error:'Choose a featured discovery'});
  const seed = seeds[id];
  try {
    const response = await fetch('https://api.firecrawl.dev/v2/search', {
      method:'POST',
      headers:{'Content-Type':'application/json', ...(process.env.FIRECRAWL_API_KEY ? {Authorization:'Bearer '+process.env.FIRECRAWL_API_KEY} : {})},
      body:JSON.stringify({query:'"'+seed.title+'" '+seed.creator.split(' · ')[0]+' inspiration influences interview book music',limit:3,sources:['web']}),
      signal:AbortSignal.timeout(14000)
    });
    if (!response.ok) throw Error('Provider unavailable');
    const result = await response.json();
    if (!result.success) throw Error('Provider unavailable');
    const items = (result.data?.web || []).filter(x=>{
      try {const u=new URL(x.url);return u.protocol==='https:'&&!u.username&&!u.password;} catch {return false;}
    }).slice(0,3).map(x=>({title:String(x.title||'Read source').slice(0,160),url:x.url}));
    res.setHeader('Cache-Control','public, max-age=300, s-maxage=86400, stale-while-revalidate=604800');
    return res.status(200).json({items,provider:'Firecrawl',checkedAt:new Date().toISOString()});
  } catch (error) {
    console.error('inspiration_provider_unavailable');
    res.setHeader('Cache-Control','public, max-age=30, s-maxage=300');
    return res.status(503).json({error:'Live sources temporarily unavailable'});
  }
};
