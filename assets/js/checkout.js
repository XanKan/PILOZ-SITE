const ENDPOINT='https://hpxcbemezvynofxiffzs.supabase.co/functions/v1/stripe-public-checkout';
const PLANS=new Set(['essential','pro','business']),BILLING=new Set(['monthly','annual']);
const params=new URLSearchParams(location.search),plan=params.get('plan'),billing=params.get('billing');
const status=document.getElementById('checkout-status'),errorNode=document.getElementById('checkout-error'),retry=document.getElementById('checkout-retry');

async function start(){
 errorNode.hidden=true;retry.hidden=true;
 if(!PLANS.has(plan)||!BILLING.has(billing)){status.textContent='Cette offre est invalide.';errorNode.textContent='Revenez aux tarifs et sélectionnez une offre Piloz.';errorNode.hidden=false;return;}
 status.textContent='Nous préparons votre essai Piloz sur Stripe…';
 try{
  const response=await fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({plan,billing})});
  const type=String(response.headers.get('content-type')||'').toLowerCase(),data=type.includes('application/json')?await response.json():{};
  if(!response.ok||!data.url)throw new Error(data.error||'Le service de paiement ne répond pas.');
  status.textContent='Redirection vers Stripe…';location.assign(data.url);
 }catch(error){status.textContent='Le paiement est momentanément indisponible.';errorNode.textContent=error.message||'Réessayez dans quelques instants.';errorNode.hidden=false;retry.hidden=false;}
}
retry.addEventListener('click',start);start();
