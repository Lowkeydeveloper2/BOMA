// ==========================================
// Stravovací mini-plán - Dotazník Script
// ==========================================

// --- Initialize footer year ---
document.getElementById('yearFooter').textContent = new Date().getFullYear();

// --- Global variables ---
let selectedGoal = 'lose';
const preferences = new Set();

// --- Goal selection ---
const goalRow = document.getElementById('goalRow');

goalRow.addEventListener('click', (event) => {
 const clickedButton = event.target.closest('[data-goal]');
 if (!clickedButton) return;

 selectedGoal = clickedButton.dataset.goal;
 
 // Update active state
 goalRow.querySelectorAll('.pill').forEach(pill => {
 pill.classList.toggle('active', pill === clickedButton);
 });
});

// --- Preferences selection ---
const prefsSection = document.getElementById('prefs');

prefsSection.addEventListener('click', (event) => {
 const clickedPill = event.target.closest('[data-pref]');
 if (!clickedPill) return;

 const prefKey = clickedPill.dataset.pref;

 // Toggle preference
 if (preferences.has(prefKey)) {
 preferences.delete(prefKey);
 clickedPill.classList.remove('active');
 } else {
 preferences.add(prefKey);
 clickedPill.classList.add('active');
 }
});

// --- Calorie estimation ---
function estimateBaseCalories(sex, age, activityLevel) {
 let baseCalories = 1800;

 // Adjust for sex
 if (sex === 'male') {
 baseCalories += 200;
 }

 // Adjust for age
 if (!isNaN(age)) {
 if (age < 18) {
 baseCalories -= 100;
 } else if (age > 50) {
 baseCalories -= 100;
 }
 }

 // Activity multiplier
 const activityMultiplier = {
 'low': 1.2,
 'moderate': 1.4,
 'high': 1.6
 };

 const multiplier = activityMultiplier[activityLevel] || 1.2;
 
 return Math.round(baseCalories * multiplier);
}

// --- Meals database with recipes ---
const mealsDatabase = {
 vegan_lowcarb: [
 { 
 name: " Tofu miešanica", 
 kcal: 320, 
 img: "https://live.staticflickr.com/3249/2895513435_c06b483287_c.jpg",
 recipe: `<strong>Ingrediencie:</strong> 🧊 200g tofu, 🍅 150g cherry paradajok, 🥬 100g čerstvého špenátu, 🧄 2 strúčiky cesnaku, 🫒 1 PL olivového oleja, 🧂 soľ, 🌶️ čierne korenie, 🌿 bazalka.<br><br>

<strong>Postup:</strong><br>
1. Tofu osušte a nakrájajte na 2cm kocky.<br>

2. Na panvicu rozohrejte olivový olej na strednom ohni.<br>

3. Pridajte tofu a opekajte 5-7 minút, kým nezíska zlatistú farbu zo všetkých strán.<br>

4. Pridajte prelisovaný cesnak a opekajte ďalšiu minútu.<br>

5. Vhoďte prepolené cherry paradajky a špenát.<br>

6. Premiešajte a duste 3-4 minúty, kým špenát nezvädne.<br>

7. Ochutnajte soľou a čiernym korením.<br>

8. Servírujte posypané čerstvou nasekanou bazalkou.`
 },
 { 
 name: "Cícerový šalát", 
 kcal: 350, 
 img: "https://live.staticflickr.com/8537/8703897106_d13737fc79_b.jpg",
 recipe: `<strong>Ingrediencie:</strong> 🫘 1 plechovka cíceru (400g), 🥒 1 uhorka, 🍅 2 paradajky, 🧅 1/2 červenej cibule, 🍋 šťava z 1 citróna, 🫒 3 PL olivového oleja, 🧂 soľ, 🌶️ korenie, 🌿 petržlenová vňať.<br><br>

<strong>Postup:</strong><br>
1. Cícer splachiť studenou vodou a nechať odkvapkať.<br>

2. Uhorku olúpať a nakrájať na malé kocky.<br>

3. Paradajky nakrájať na osminky, odstrániť semená.<br>

4. Červenú cibuľu nakrájať nadrobno.<br>

5. Všetku zeleninu zmiešať s mícerom v miske.<br>

6. Pripraviť dressing: v malej miske vyšľahať olivový olej s citrónovou šťavou.<br>

7. Ochutnať soľou a korením podľa chuti.<br>

8. Dressing vliať na šalát a dôkladne premiešať.<br>

9. Nechať odležať v chladničke aspoň 30 minút.<br>

10. Pred servírovaním posypať nasekanou petržlenovou vňaťou.`
 },
 { 
 name: "Tempeh s brokolicou", 
 kcal: 400, 
 img: "https://live.staticflickr.com/3920/14986785846_47de0478fc_b.jpg",
 recipe: `<strong>Ingrediencie:</strong> 🧈 200g tempeh, 🥦 300g brokolice, 🥢 3 PL sójovej omáčky, 🧄 2 strúčiky cesnaku, 🫚 1 cm kúsok zázvoru, 🫒 1 PL sezamového oleja, 🍯 1 PL medu, 🌰 sezamové semienka.<br><br>

<strong>Postup:</strong><br>
1. Tempeh nakrájajte na tenké plátky (asi 1 cm).<br>

2. V miske zmiešajte sójovú omáčku, nastrúhaný zázvor, prelisovaný cesnak a med.<br>

3. Tempeh vložte do marinády a nechajte 15-20 minút.<br>

4. Brokolicu rozdeľte na ružičky a krátko povaríte v osolenej vode (3-4 minúty).<br>

5. Brokolicu splachiť studenou vodou, aby zostala chrumkavá.<br>

6. Na woku alebo veľkej panvici rozohrejte sezamový olej.<br>

7. Vyberte tempeh z marinády (marinadu uschovajte) a opekajte 3-4 minúty z každej strany.<br>

8. Pridajte brokolicu a zalejte zvyšnou marinádou.<br>

9. Miešajte 2-3 minúty na vysokom ohni.<br>

10. Servírujte posypané sezmovými semienkami, ideálne s ryžou alebo quinoou.`
 },
 { 
 name: "Avokádový toast", 
 kcal: 280, 
 img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ5dXrAUYCbVYTJueXY7dvsgfwhWtn0Z1UFQ&s",
 recipe: `<strong>Ingrediencie:</strong> 🍞 2 plátky celozrnného chleba, 🥑 1 zrelé avokádo, 🍋 šťava z 1/2 citróna, 🍅 5-6 cherry paradajok, 🌰 tekvicové semienka, 🧂 soľ, 🌶️ čierne korenie, 🌶️ chilli vločky (voliteľné).<br><br>

<strong>Postup:</strong><br>
1. Plátky chleba opražte v hriankovači alebo na panvici do zlatista.<br>

2. Avokádo prekrojte, odstráňte kôstku a vydlabajte dužinu do misky.<br>

3. Vidličkou avokádo rozmačkajte na hladkú pastu.<br>

4. Pridajte citrónovú šťavu, soľ a čierne korenie, dôkladne premiešajte.<br>

5. Cherry paradajky nakrájajte na polovice.<br>

6. Opražené plátky chleba rovnomerne natrite avokádovou pastou.<br>

7. Na vrch rozložte polovice cherry paradajok.<br>

8. Posypte tekvicoými semienkami.<br>

9. Podľa chuti pridajte chilli vločky pre pikantnosť.<br>

10. Servírujte ihneď, kým je chlieb ešte teplý a chrumkavý.`
 },
 { 
 name: "Šalát s tofu a semienkami", 
 kcal: 330, 
 img: "https://i2.pickpik.com/photos/277/235/602/salad-leaf-lettuce-olives-cheese-preview.jpg",
 recipe: `<strong>Ingrediencie:</strong> 🧈 150g tofu, 🥗 200g miešaného listového šalátu, 🥜 30g vlašských orechov, 🌰 2 PL tekvicových semienok, 🍷 2 PL balzamikového octu, 🫒 3 PL olivového oleja, 🍯 1 PL medu, 🧂 soľ, 🌶️ korenie.<br><br>

<strong>Postup:</strong><br>
1. Tofu nakrájajte na kocky veľkosti 1,5 cm a osušte papierovou utierkou.<br>

2. Na panvici bez oleja opražte tekvicové semienka, kým nezačnú praskať (1-2 minúty).<br>

3. Orechy nahrubo posekajte.<br>

4. Tofu opekajte na olivovom oleji zo všetkých strán, kým nezískajú zlatú farbu (8-10 minút).<br>

5. Tofu ochutnajte soľou a korením.<br>

6. Listový šalát dôkladne umyte a osušte v odstreďovačke.<br>

7. Pripravte dressing: v malej nádobe zmiešajte balzamikový ocot, olivový olej a med.<br>

8. Šalát rozložte na taniere.<br>

9. Pridajte opražené tofu kocky, orechy a tekvicové semienka.<br>

10. Prelejte dresingom a jemne premiešajte pred servírovaním.`
 },
 { 
 name: "Vegánska omeleta z cícer. múky", 
 kcal: 310, 
 img: "https://img.ccnull.de/1100000/preview/1101474_4153248d9c023b9d5618b8005142c689.jpg",
 recipe: `<strong>Ingrediencie:</strong> 🫘 100g cícerovej múky, 💧 200ml vody, 🫑 1/2 červenej papriky, 🍄 50g šampiniónov, 🥬 hrst špenátu, 🧅 1/4 cibuľky, 🧂 soľ, 🌶️ kurkuma, 🌶️ čierne korenie, 🫒 olivový olej.<br><br>

<strong>Postup:</strong><br>
1. V miske zmiešajte cícerovú múku s vodou, kým nevznikne hladké cesto.<br>

2. Pridajte štipku soli, štipku kurkumy a čierne korenie, premiešajte.<br>

3. Nechajte cesto odpočinúť 10 minút.<br>

4. Zatiaľ nakrájajte papriku, šampinióny a cibuľku nadrobno.<br>

5. Špenát nakrájajte na hrubšie pásiky.<br>

6. Na panvici rozohrejte trochu olivového oleja.<br>

7. Zeleninu opekajte 3-4 minúty, kým nezmäkne.<br>

8. Prelejte cesto na panvicu (ako pri príprave palacienky).<br>

9. Opraženú zeleninu rozložte na polovicu omele.<br>

10. Smažte 3-4 minúty na strednom ohni, kým sa okraje nezačnú oddeľovať.<br>

11. Omeletu preklopte na polovicu a smažte ďalšiu minútu.<br>

12. Servírujte teplú, ideálne s čerstvým šalátom.`
 },
 { 
 name: "Pečené tofu s cuketou", 
 kcal: 370, 
 img: "https://howtomakedinner.com/wp-content/uploads/2019/11/grilled_zucchini_salad-1024x683.jpg",
 recipe: `<strong>Ingrediencie:</strong> 🧈 250g tofu, 🥒 2 stredné cukety, 🫒 3 PL olivového oleja, 🧄 2 strúčiky cesnaku, 🌿 1 PL tymián, 🌿 1 PL rozmarín, 🍋 šťava z 1/2 citróna, 🧂 soľ, 🌶️ korenie.<br><br>

<strong>Postup:</strong><br>
1. Rúru predhrejte na 200°C.<br>

2. Tofu nakrájajte na hrubšie plátky (1,5 cm) a osušte.<br>

3. Cukety nakrájajte na kolieska hrúbky asi 1 cm.<br>

4. V miske zmiešajte olivový olej, prelisovaný cesnak, bylinky, citrónovú šťavu, soľ a korenie.<br>

5. Tofu a cuketu vložte do marinády a jemne premiešajte, aby sa všetko prekrylo.<br>

6. Nechajte marinovať aspoň 15 minút.<br>

7. Plech vyložte papierom na pečenie.<br>

8. Rozložte tofu a cuketu na plech tak, aby sa neprekrývali.<br>

9. Pečte 25-30 minút, po 15 minútach jedlo obráťte.<br>

10. Tofu a cuketa majú mať zlatohnedú farbu a byť chrumkavé.<br>

11. Servírujte teplé s quinoou alebo zeleným šalátom.`
 },
 { 
 name: "Kokosové curry s karfiolom", 
 kcal: 410, 
 img: "https://i0.wp.com/jamdownfoodie.com/wp-content/uploads/2021/05/IMG_5219.jpg?resize=585%2C585&ssl=1",
 recipe: `<strong>Ingrediencie:</strong> 🥦 1 stredný karfiol, 🫘 1 plechovka cíceru, 🥥 400ml kokosového mlieka, 🌶️ 2 PL curry pasty, 🧅 1 cibuľa, 🧄 2 strúčiky cesnaku, 🍅 200g cherry paradajok, 🥥 1 PL kokosového oleja, 🧂 soľ, 🌿 čerstvá koriander.<br><br>

<strong>Postup:</strong><br>
1. Karfiol rozdeľte na menšie ružičky.<br>

2. Cibuľu a cesnak nakrájajte nadrobno.<br>

3. Na väčšom hrnci rozohrejte kokosový olej.<br>

4. Opekajte cibuľu 3-4 minúty do sklovitosti.<br>

5. Pridajte cesnak a curry pastu, opekajte minútu pri miešaní.<br>

6. Vhoďte karfiolové ružičky a premiešajte, aby sa obalili koreninami.<br>

7. Zalejte kokosovým mliekom a pridajte cherry paradajky.<br>

8. Priveďte do varu, potom stiahnite na mierny oheň.<br>

9. Varte 15 minút, kým karfiol nezmäkne.<br>

10. Pridajte scedený cícer a varte ďalších 5 minút.<br>

11. Ochutnajte soľou podľa chuti.<br>

12. Servírujte posypané čerstvým koriandr, ideálne s ryžou basmati.`
 },
 { 
 name: "Smoothie s rastlinným proteínom", 
 kcal: 250, 
 img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvqGhT_OfqL5j8QUe8NetfX-QE_0OQy_qn5A&s",
 recipe: `<strong>Ingrediencie:</strong> 🍌 1 zrelý banán, 🥬 hrst čerstvého špenátu (30g), 🥛 250ml mandľového mlieka, 🧪 1 odmerka rastlinného proteínu (vanilka), 🥜 10 mandlí, 🌿 1 PL chia semienok, 🧊 5-6 kociek ľadu, 🍯 voliteľne med.<br><br>

<strong>Postup:</strong><br>
1. Banán ošúpte a nakrájajte na menšie kúsky.<br>

2. Špenát dôkladne umyte a osušte.<br>

3. Mandle môžete namočiť na 30 minút pre lepšiu stráviteľnosť (voliteľné).<br>

4. Do mixéra vložte banán, špenát a mandľové mlieko.<br>

5. Pridajte proteínový prášok a chia semienka.<br>

6. Pridajte mandle a kocky ľadu.<br>

7. Mixujte na vysokých otáčkach 30-60 sekúnd, kým nevznikne hladká krémová konzistencia.<br>

8. Ochutnajte - ak chcete sladšie, pridajte trochu medu.<br>

9. Mixujte ešte 10 sekúnd, aby sa med rozmiešal.<br>

10. Nalejte do vysokej pohára a servírujte ihneď.<br>

11. Môžete ozdobiť plátkami banána alebo posypať chia semienkami.`
 }
 ],

 vegetarian: [
 { 
 name: "Ovsená kaša s ovocím", 
 kcal: 380, 
 img: "https://i1.pickpik.com/photos/154/326/346/food-drink-breakfast-food-fruit-preview.jpg",
 recipe: `<strong>Ingrediencie:</strong> 🌾 80g ovsených vločiek, 🥛 300ml mlieka, 🍌 1 banán, 🫐 hrst čučoriedok, 🍯 2 PL medu, 🥜 30g orechov, 🪨 štipka škorice.<br><br>

<strong>Postup:</strong><br>
1. V hrnci priveďte mlieko k varu.<br>

2. Pridajte ovsené vločky a znížte teplotu na mierny oheň.<br>

3. Varte 5-7 minút pri občasnom miešaní, kým kaša nezhustne.<br>

4. Pridajte štipku škorice a polovicu medu, premiešajte.<br>

5. Zatiaľ ošúpte a nakrájajte banán na kolieska.<br>

6. Orechy nahrubo posekajte.<br>

7. Hotovú kašu nalejte do misy.<br>

8. Ozdobte plátkami banána a čučoriedkami.<br>

9. Posypte orehamiaprellejte zvyšným medom.<br>

10. Servírujte teplé s posypom škorice.`
 },
 { 
 name: "Šošovicové kari", 
 kcal: 420, 
 img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyGY9FgXjWuMNyBggUJyz2DDiwa0ksm0JENQ&s",
 recipe: `<strong>Ingrediencie:</strong> 🫘 200g červenej šošovice, 🥥 400ml kokosového mlieka, 🧅 1 cibuľa, 🧄 3 strúčiky cesnaku, 🫚 2cm kúsok zázvoru, 🌶️ 2 PL kari pasty, 🍅 400g konzerv. paradajok, 🫒 1 PL oleja, 🧂 soľ, 🌿 čerstvý koriander.<br><br>

<strong>Postup:</strong><br>
1. Šošovicu dôkladne opláchnite pod tečúcou vodou.<br>

2. Cibuľu nakrájajte nadrobno, cesnak a zázvor nastrúhajte.<br>

3. Na väčšom hrnci rozohrejte olej na strednom ohni.<br>

4. Opekajte cibuľu 5 minút do zlatista.<br>

5. Pridajte cesnak, zázvor a kari pastu, opekajte minútu.<br>

6. Pridajte paradajky a ich šťavu, rozmiešajte.<br>

7. Vložte šošovicu a zalejte 500ml vody.<br>

8. Priveďte do varu, potom znížte na mierny oheň.<br>

9. Varte pod pokrievkou 20-25 minút, kým šošovica nezmäkne.<br>

10. Pridajte kokosové mlieko, premiešajte a varte 5 minút.<br>

11. Ochutnajte soľou.<br>

12. Servírujte s ryžou basmati, posypané koriandr.`
 },
 { 
 name: "Pečená zelenina s tofu", 
 kcal: 400, 
 img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGFJsHHfWldfahUAOAh7OPnZ71UGfwZQ_5w&s",
 recipe: `<strong>Ingrediencie:</strong> 🧈 250g tofu, 🥒 1 červená paprika, 🥒 1 žltá paprika, 🥒 1 cuketa, 🍆 1 baklažán, 🫒 4 PL olivového oleja, 🧄 2 strúčiky cesnaku, 🌿 1 PL provensálskych bylín, 🧂 soľ, 🌶️ korenie.<br><br>

<strong>Postup:</strong><br>
1. Rúru predhrejte na 200°C.<br>

2. Tofu nakrájajte na kocky 2x2 cm a osušte.<br>

3. Papriky prekrojte, odstráňte jadierka a nakrájajte na hrubšie pásy.<br>

4. Cuketu a baklažán nakrájajte na kolieska hrúbky 1,5 cm.<br>

5. V miske zmiešajte olivový olej, prelisovaný cesnak, bylinky, soľ a korenie.<br>

6. Zeleninu a tofu vložte do marinády a premiešajte.<br>

7. Nechajte marinovať 10-15 minút.<br>

8. Plech vyložte papierom na pečenie.<br>

9. Rozložte zeleninu a tofu rovnomerne, aby sa neprekrývali.<br>

10. Pečte 30-35 minút, po 15 minútach obráťte.<br>

11. Zelenina má byť mäkká a mierne karamelizovaná.<br>

12. Servírujte teplé s quinoou alebo kuskusom.`
 },
 { 
 name: "Vajcia so špenátom", 
 kcal: 320, 
 img: "https://i1.pickpik.com/photos/370/841/76/spinach-egg-potato-eat-preview.jpg",
 recipe: `<strong>Ingrediencie:</strong> 🥚 4 vajcia, 🥬 200g čerstvého špenátu, 🧄 2 strúčiky cesnaku, 🧈 1 PL masla, 🥛 2 PL smotany, 🧂 soľ, 🌶️ čierne korenie, 🌿 muškátový oriešok.<br><br>

<strong>Postup:</strong><br>
1. Špenát dôkladne umyte a osušte.<br>

2. Cesnak nakrájajte nadrobno.<br>

3. Na panvici rozohrejte maslo na strednom ohni.<br>

4. Pridajte cesnak a opekajte 30 sekúnd.<br>

5. Vhoďte špenát a duste 2-3 minúty, kým nezvädne.<br>

6. Ochutnajte soľou, korením a štipkou muškátového orieška.<br>

7. V miske rozšľahajte vajcia so smotanou.<br>

8. Nalejte vajcia na špenát na panvici.<br>

9. Miešajte drevenou lyžicou na miernom ohni 3-4 minúty.<br>

10. Vajcia majú mať mäkkú, krémovú konzistenciu.<br>

11. Ihneď stiahnite z ohňa - vajcia sa dokončia mimo plotne.<br>

12. Servírujte s opraženým celozrnným chlebom.`
 },
 { 
 name: "Zeleninové lasagne", 
 kcal: 460, 
 img: "https://live.staticflickr.com/23/32878005_de22f9b9cc_b.jpg",
 recipe: `<strong>Ingrediencie:</strong> 🍝 9 plátkov lasagne cestovín, 🥒 1 cuketa, 🍆 1 baklažán, 🥒 1 paprika, 🍅 400g rajčinovej omáčky, 🧀 250g ricotty, 🧀 150g mozzarelly, 🧀 50g parmezánu, 🫒 olivový olej, 🌿 bazalka, 🧂 soľ, 🌶️ korenie.<br><br>

<strong>Postup:</strong><br>
1. Rúru predhrejte na 180°C.<br>

2. Zeleninu nakrájajte na tenké plátky alebo kocky.<br>

3. Na panvici opekajte zeleninu na olivovom oleji 5-7 minút.<br>

4. Ochutnajte soľou a korením.<br>

5. Zapekáciu misu (20x30 cm) vyložte trochou rajčinovej omáčky.<br>

6. Položte prvú vrstvu lasagne cestovín.<br>

7. Rozložte tretinu opečenej zeleniny.<br>

8. Pridajte vrstvu ricotty (roztrieť lyžicou).<br>

9. Prelejte rajčinovou omáčkou.<br>

10. Opakujte vrstvy ešte 2x (cestoviny, zelenina, ricotta, omáčka).<br>

11. Poslednú vrstvu posypte nastrúhanou mozzarellou a parmezánom.<br>

12. Pečte 40-45 minút do zlatista.<br>

13. Nechajte odpočinúť 10 minút pred krájaním.<br>

14. Servírujte ozdobené čerstvou bazalkou.`
 },
 { 
 name: "Tvaroh s ovocím", 
 kcal: 310, 
 img: "https://freerangestock.com/sample/173205/yogurt-bowl-with-fruits-and-granola.jpg",
 recipe: `<strong>Ingrediencie:</strong> 🧀 250g tvarohu, 🍯 2 PL medu, 🍮 1 PL vanilkového extraktu, 🍓 100g jahôd, 🥝 1 kivi, 🫐 hrst čučoriedok, 🥣 3 PL granoly, 🌿 čerstvá mäta.<br><br>

<strong>Postup:</strong><br>
1. Tvaroh vložte do misky a vyšľahajte vidličkou do hladka.<br>

2. Pridajte med a vanilkový extrakt, dôkladne premiešajte.<br>

3. Ak je tvaroh príliš hustý, pridajte 1-2 PL mlieka.<br>

4. Jahody umyte a nakrájajte na štvrťky.<br>

5. Kivi ošúpte a nakrájajte na kocky.<br>

6. Čučoriedky opláchnite.<br>

7. Tvaroh rozdeľte do misiek.<br>

8. Na tvaroh rozložte pripravené ovocie.<br>

9. Posypte granolou pre chrumkavosť.<br>

10. Ozdobte lístkami čerstvej mäty.<br>

11. Podľa chuti môžete pridať extra med.<br>

12. Servírujte ihneď alebo nechajte vychladiť v chladničke.`
 },
 { 
 name: "Grécky šalát", 
 kcal: 340, 
 img: "https://www.cookipedia.co.uk/wiki/images/8/87/Greek_salad_recipe.jpg",
 recipe: `<strong>Ingrediencie:</strong> 🍅 3 paradajky, 🥒 1 uhorka, 🥒 1 zelená paprika, 🧅 1/2 červenej cibule, 🧀 100g feta syra, 🫒 50g čiernych olív, 🫒 3 PL olivového oleja, 🍷 1 PL červeného vínového octu, 🌿 oregano, 🧂 soľ, 🌶️ korenie.<br><br>

<strong>Postup:</strong><br>
1. Paradajky umyte a nakrájajte na kliny.<br>

2. Uhorku nakrájajte na hrubé polmesiace (nemusíte olúpať).<br>

3. Papriku prekrojte, odstráňte semená a nakrájajte na pásy.<br>

4. Červenú cibuľu nakrájajte na tenké plátky alebo polkrúžky.<br>

5. Zeleninu vložte do veľkej misy.<br>

6. Pridajte olivy (s kôstkami alebo bez, podľa chuti).<br>

7. Feta syr nakrájajte na kocky alebo rozlámte rukami.<br>

8. Pridajte fetu do šalátu.<br>

9. V malej nádobe zmiešajte olivový olej, ocot, oregano, soľ a korenie.<br>

10. Dressing vlejte na šalát.<br>

11. Jemne premiešajte, aby sa feta príliš nerozpadla.<br>

12. Servírujte ihneď s čerstvým pečivom alebo pitou.`
 },
 { 
 name: "Zeleninové rizoto", 
 kcal: 390, 
 img: "https://i1.pickpik.com/photos/397/437/136/flowers-yellow-table-lovely-preview.jpg",
 recipe: `<strong>Ingrediencie:</strong> 🍚 200g arborio ryže, 🥒 1 cuketa, 🥒 1 paprika, 🫘 100g hrášku, 🧅 1 cibuľa, 🧄 2 strúčiky cesnaku, 🥣 800ml zelenin ového vývaru, 🍷 100ml bieleho vína, 🧈 50g masla, 🧀 50g parmezánu, 🫒 olivový olej, 🧂 soľ, 🌶️ korenie.<br><br>

<strong>Postup:</strong><br>
1. Vývar zohrejte v hrnci a udržujte teplý.<br>

2. Cibuľu a cesnak nakrájajte nadrobno.<br>

3. Cuketu a papriku nakrájajte na malé kocky.<br>

4. Na väčšej panvici rozohrejte olivový olej.<br>

5. Opekajte cibuľu 3-4 minúty do sklovitosti.<br>

6. Pridajte cesnak, opekajte minútu.<br>

7. Vhoďte ryžu a opekajte 2 minúty, kým nezíska perľový lesk.<br>

8. Zalejte vínom a miešajte, kým sa nevpije.<br>

9. Pridávajte vývar po naberačke, vždy počkajte, kým sa vpije.<br>

10. Po 10 minútach pridajte nakrájanú zeleninu a hrášok.<br>

11. Pokračujte v pridávaní vývaru a miešaní ďalších 8-10 minút.<br>

12. Ryža má byť al dente - mäkká, ale s jemným odporom.<br>

13. Odstavte z ohňa, vmešajte maslo a nastrúhaný parmezán.<br>

14. Prikryte a nechajte odpočinúť 2 minúty.<br>

15. Servírujte ihneď, posypané extra parmezánom.`
 },
 { 
 name: "Cestoviny s pestom", 
 kcal: 450, 
 img: "https://freerangestock.com/sample/163143/fresh-pesto-pasta-with-cherry-tomatoes.jpg",
 recipe: `<strong>Ingrediencie:</strong> 🍝 250g cestovín (penne/fusilli), 🌿 100g bazalkového pesta, 🍅 200g cherry paradajok, 🥜 50g piniových orieškov, 🧀 50g parmezánu, 🫒 2 PL olivového oleja, 🧂 soľ, 🌶️ čierne korenie, 🌿 čerstvá bazalka.<br><br>

<strong>Postup:</strong><br>
1. Veľký hrniec naplňte vodou, osolte a priveďte do varu.<br>

2. Pridajte cestoviny a varte podľa návodu na obale (zvyčajne 10-12 minút).<br>

3. Zatiaľ cherry paradajky prekrojte na polovice.<br>

4. Na panvici bez oleja opražte piniové oriešky 2-3 minúty do zlatista.<br>

5. Na druhej panvici rozohrejte olivový olej.<br>

6. Opekajte paradajky 3-4 minúty, kým nezmäknú.<br>

7. Pred scedením si odlejte 100ml vody z cestovín.<br>

8. Cestoviny precedte a vráťte späť do hrnca.<br>

9. Pridajte pesto a paradajky, dôkladne premiešajte.<br>

10. Ak je zmes príliš hustá, pridajte odloženú vodu z cestovín.<br>

11. Ochutnajte soľou a čiernym korením.<br>

12. Servírujte posypané piniovými orieškami, nastrúhaným parmezánom a čerstvou bazalkou.`
 }
 ],

 lowcarb: [
 { 
 name: "Grécky jogurt s orechmi", 
 kcal: 290, 
 img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg-Kpot8CH8AmRoUFYYfRzGQKIkW8lfZaFyQ&s",
 recipe: `<strong>Ingrediencie:</strong> 🥛 200g gréckeho jogurtu, 🫐 50g čučoriedok, 🥜 30g vlašských orechov, 🥜 2 PL mandľových lupienkach, 🍯 1 čajová lyžička medu, 🪵 štipka škorice.<br><br>

<strong>Postup:</strong><br>
1. Grécky jogurt vložte do misy.<br>

2. Čučoriedky dôkladne umyte a osušte.<br>

3. Vlašské orechy nahrubo posekajte nožom.<br>

4. Na suchej panvici opražte mandľové lupienky 1-2 minúty do zlatista.<br>

5. Na jogurt rozložte polovicu čučoriedok.<br>

6. Posypte drvenými orechmi.<br>

7. Pridajte opražené mandľové lupienky.<br>

8. Prelejte medom.<br>

9. Pridajte zvyšné čučoriedky.<br>

10. Posypte štipkou škorice.<br>

11. Môžete pridať aj chia semienka pre extra výživu.<br>

12. Servírujte ihneď alebo nechajte vychladiť v chladničke.`
 },
 { 
 name: "Kuracie prsia so zeleninou", 
 kcal: 410, 
 img: "https://i1.pickpik.com/photos/1007/557/253/broccoli-chicken-healthy-home-preview.jpg",
 recipe: `<strong>Ingrediencie:</strong> 🍗 2 kuracie prsia (400g), 🥦 200g brokolice, 🫑 150g zelenej fazuľky, 🍅 100g cherry paradajok, 🧄 3 strúčiky cesnaku, 🫒 2 PL olivového oleja, 🧂 soľ, 🌶️ čierne korenie, 🍋 citrón.<br><br>

<strong>Postup:</strong><br>
1. Kuracie prsia naklepte na rovnomernú hrúbku a ochutnajte soľou a korením.<br>

2. Brokolicu rozdeľte na ružičky.<br>

3. Fazuľku očistite od končekov.<br>

4. Cherry paradajky prekrojte na polovice.<br>

5. Cesnak nakrájajte na tenké plátky.<br>

6. Na veľkej panvici rozohrejte olivový olej na stredne vysokých otáčkach.<br>

7. Kuracie prsia opekajte 6-7 minút z každej strany, kým nezlatistnú.<br>

8. Kuracie mäso vyberte a nechajte odpočinúť.<br>

9. Na tú istú panvicu pridajte brokolicu a fazuľku.<br>

10. Opekajte 4-5 minút, občas premiešajte.<br>

11. Pridajte cesnak a paradajky, opekajte 2 minúty.<br>

12. Kuracie prsia nakrájajte na plátky a vráťte na panvicu.<br>

13. Prelejte citrónovou šťavou a premiešajte.<br>

14. Servírujte ihneď, teplé.`
 },
 { 
 name: "Losos so šalátom", 
 kcal: 480, 
 img: "https://images.rawpixel.com/image_social_landscape/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL2ZsMjkxNDIyNTY3MjEtaW1hZ2UuanBn.jpg",
 recipe: `<strong>Ingrediencie:</strong> 🐟 200g lososa, 🥗 150g listového šalátu, 🥑 1 avokádo, 🍅 50g cherry paradajok, 🥒 1/2 uhorky, 🍋 šťava z 1 citróna, 🫒 3 PL olivového oleja, 🧂 soľ, 🌶️ korenie, 🌿 dill.<br><br>

<strong>Postup:</strong><br>
1. Rúru predhrejte na 200°C alebo pripravte panvicu.<br>

2. Losos ochutnajte soľou, korením a prelejte polovicou citrónovej šťavy.<br>

3. Ak pečiete: položte na plech a pečte 12-15 minút.<br>

4. Ak opekáte: na panvici s olejom opekajte 4-5 minút z každej strany.<br>

5. Zatiaľ pripravte šalát: umyte a osušte listový šalát.<br>

6. Avokádo nakrájajte na plátky.<br>

7. Cherry paradajky prekrojte, uhorku nakrájajte na kolieska.<br>

8. V miske zmiešajte olivový olej, zvyšnú citrónovú šťavu, soľ a korenie.<br>

9. Šalát rozložte na tanier.<br>

10. Pridajte avokádo, paradajky a uhorku.<br>

11. Prelejte dresingom.<br>

12. Na vrch položte hotový losos.<br>

13. Ozdobte čerstvým dillom a servírujte.`
 },
 { 
 name: "Tuniakový šalát", 
 kcal: 360, 
 img: "https://cdn.shopify.com/s/files/1/0764/9111/files/AHI_480x480.jpg?v=1573113458",
 recipe: `<strong>Ingrediencie:</strong> 🐟 1 plechovka tuniaka v oleji (200g), 🥗 150g listového šalátu, 🥚 2 varené vajcia, 🫒 50g čiernych olív, 🫒 1 PL kapary, 🧅 1/2 červenej cibule, 🍋 šťava z 1 citróna, 🫒 2 PL olivového oleja, 🧂 soľ, 🌶️ korenie.<br><br>

<strong>Postup:</strong><br>
1. Vajcia uvarte natvrdo (10 minút), ochlaďte a ošúpte.<br>

2. Tuniaka precedte a rozložte vidličkou.<br>

3. Listový šalát dôkladne umyte a roztrhajte na menšie kúsky.<br>

4. Vajcia nakrájajte na štvrtky.<br>

5. Olivy prekrojte na polovice.<br>

6. Červenú cibulu nakrájajte na tenké polkrúžky.<br>

7. V malej miske zmiešajte citrónovú šťavu, olivový olej, soľ a korenie.<br>

8. Šalát vložte do veľkej misy.<br>

9. Pridajte tuniaka, vajcia, olivy, kapary a cibulu.<br>

10. Prelejte dresingom.<br>

11. Jemne premiešajte.<br>

12. Pred servírovaním nechajte odležať 5 minút.<br>

13. Môžete doplniť čerstvým čiernym korením a petržlenovou vňaťou.`
 },
 { 
 name: "Vajcia s avokádom", 
 kcal: 330, 
 img: "https://i1.pickpik.com/photos/711/982/403/food-drink-food-healthy-preview.jpg",
 recipe: `<strong>Ingrediencie:</strong> 🥚 3 vajcia, 🥑 1 zrelé avokádo, 🍋 šťava z 1/2 citróna, 🧂 soľ, 🌶️ čierne korenie, 🌶️ čili vločky, 🌰 tekvicové semienka.<br><br>

<strong>Postup:</strong><br>
1. Rozhodnite sa, ako chcete pripraviť vajcia:<br>
 - Natvrdo: varte 10 minút
 - Namäkko: varte 6 minút
 - Volské oko: smažte na panvici
2. Ak varíte, po uvarení vajcia ochlaďte v studenej vode.<br>

3. Avokádo prekrojte, odstráňte kôstku a vyberte dužinu.<br>

4. Avokádo nakrájajte na plátky alebo rozmačkajte vidličkou.<br>

5. Prelejte avokádo citrónovou šťavou, aby nezhnedlo.<br>

6. Ochutnajte soľou a čiernym korením.<br>

7. Varené vajcia ošúpte a prekrojte.<br>

8. Na tanier rozložte plátky avokáda.<br>

9. Pridajte vajcia.<br>

10. Posypte čili vločkami podľa chuti.<br>

11. Ozdobte tekvicovými semienkami.<br>

12. Servírujte s čerstvým šalátom alebo ako samostatné jedlo.`
 },
 { 
 name: "Morčacie kúsky s cuketou", 
 kcal: 420, 
 img: "https://cdn.outrank.so/bc0e5a34-34df-4dd4-ac14-a782d6c2078a/f214aec6-e979-42fe-ae53-a1c501be45ce.jpg",
 recipe: `<strong>Ingrediencie:</strong> 🍗 400g morčacieho mäsa, 🥒 2 cukety, 🥒 1 červená paprika, 🧅 1 cibuľa, 🧄 2 strúčiky cesnaku, 🫒 2 PL olivového oleja, 🌿 1 PL provensálskych bylín, 🧂 soľ, 🌶️ korenie.<br><br>

<strong>Postup:</strong><br>
1. Morčacie mäso nakrájajte na kocky veľkosti 2-3 cm.<br>

2. Mäso ochutnajte soľou a korením.<br>

3. Cukety nakrájajte na hrubšie kolieska.<br>

4. Papriku nakrájajte na pásy.<br>

5. Cibuľu nakrájajte nadrobno.<br>

6. Cesnak prelisujte alebo nadrobno nakrájajte.<br>

7. Na veľkej panvici rozohrejte olivový olej na vysokom ohni.<br>

8. Pridajte morčacie mäso a opekajte 5-6 minút, kým nezíska farbu.<br>

9. Mäso premiešavajte, aby sa opiekalo rovnomerne.<br>

10. Pridajte cibuľu a cesnak, opekajte 2 minúty.<br>

11. Vložte cuketu a papriku.<br>

12. Posypte provensálskym korením.<br>

13. Opekajte ďalších 5-7 minút, zelenina má zostať chrumkavá.<br>

14. Ochutnajte soľou a servírujte teplé.`
 },
 { 
 name: "Tvaroh s mandľami", 
 kcal: 280, 
 img: "https://images.rawpixel.com/image_social_landscape/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcHg2MDkzMjUtaW1hZ2Uta3d2eGxtMWUuanBn.jpg",
 recipe: `<strong>Ingrediencie:</strong> 🧀 250g tvarohu, 🥜 40g mletých mandlí, 🥜 20g mandľových lupienkov, 1 PL vanilkového extraktu, 🪵 1 čajová lyžička škorice, 🍯 5-10 kvapiek tekutej stévie (alebo 1 PL medu).<br><br>

<strong>Postup:</strong><br>
1. Tvaroh vložte do misky.<br>

2. Pridajte mleté mandle a dôkladne premiešajte.<br>

3. Vmieajte vanilkový extrakt.<br>

4. Posypte škoricou a znova premiešajte.<br>

5. Pridajte stéviu kvapku po kvapke, ochutnávajte.<br>

6. Ak používate med, pridajte naraz a premiešajte.<br>

7. Miešajte, kým nevznikne hladká konzistencia.<br>

8. Na suchej panvici opražte mandľové lupienky 1-2 minúty.<br>

9. Tvaroh nalejte do misiek.<br>

10. Posypte opraženými mandľovými lupienkami.<br>

11. Môžete pridať čerstvé čučoriedky pre extra chuť.<br>

12. Servírujte vychladené z chladničky alebo pri izbovej teplote.`
 },
 { 
 name: "Šalát s vajcom a syrom", 
 kcal: 350, 
 img: "https://i1.pickpik.com/photos/29/361/180/food-salad-olives-olive-oil-preview.jpg",
 recipe: `<strong>Ingrediencie:</strong> 🥗 150g listového šalátu, 🥚 3 varené vajcia, 🧀 100g feta syra, 🫒 50g čiernych olív, 🧅 1/2 červenej cibule, 🍷 2 PL balzamikového octu, 🫒 3 PL olivového oleja, 🧂 soľ, 🌶️ korenie, 🌿 oregano.<br><br>

<strong>Postup:</strong><br>
1. Vajcia uvarte natvrdo (10 minút), ochlaďte a ošúpte.<br>

2. Listový šalát dôkladne umyte a odstráňte vlhkosť v odstreďovačke.<br>

3. Feta syr nakrájajte na kocky alebo rozlámte rukami.<br>

4. Olivy môžete nechať celé alebo prekrojiť na polovice.<br>

5. Červenú cibulu nakrájajte na tenké krúžky.<br>

6. Vajcia nakrájajte na štvrtky.<br>

7. Šalát rozložte na taniere alebo do veľkej misy.<br>

8. Pridajte kocky feta syra.<br>

9. Rozložte vajcia a olivy.<br>

10. Pridajte cibuľové krúžky.<br>

11. V malej nádobe zmiešajte balzamikový ocot, olivový olej, oregano, soľ a korenie.<br>

12. Dressing prelejte na šalát tesne pred servírovaním.<br>

13. Jemne premiešajte a servírujte s čerstvým pečivom.`
 },
 { 
 name: "Pečený losos s brokolicou", 
 kcal: 450, 
 img: "https://wholesome360.com/wp-content/uploads/2024/01/Salmon-and-petite-potatoes-02_1673639050.webp",
 recipe: `<strong>Ingrediencie:</strong> 🐟 250g lososa, 🥦 300g brokolice, 🧄 3 strúčiky cesnaku, 🍋 šťava z 1 citróna, 🫒 3 PL olivového oleja, 🧂 soľ, 🌶️ čierne korenie, 🌿 čerstvý dill.<br><br>

<strong>Postup:</strong><br>
1. Rúru predhrejte na 200°C.<br>

2. Brokolicu rozdeľte na ružičky, stonky nakrájajte nadrobno.<br>

3. Cesnak nakrájajte na tenké plátky.<br>

4. Losos ochutnajte soľou a korením.<br>

5. Plech vyložte papierom na pečenie.<br>

6. Brokolicu rozložte na plech.<br>

7. Pridajte plátky cesnaku medzi brokolicu.<br>

8. Brokolicu polejte 2 PL olivového oleja.<br>

9. Na brokolicu položte lososový filét.<br>

10. Losos polejte zvyšným olivovým olejom a citrónovou šťavou.<br>

11. Pečte 18-20 minút, kým losos nie je prepečený a brokolica chrumkavá.<br>

12. Losos má byť ľahko pružný pri dotyku.<br>

13. Servírujte ozdobené čerstvým dillom a plátkami citróna.<br>

14. Môžete pridať extra citrónovú šťavu pri servírovaní.`
 }
 ],

 standard: [
 { 
 name: "Vajcia s pečivom", 
 kcal: 350, 
 img: "https://i1.pickpik.com/photos/213/179/720/fried-eggs-breakfast-toast-food-preview.jpg",
 recipe: `<strong>Ingrediencie:</strong> 🥚 3 vajcia, 🍞 2 plátky celozrnného chleba, 🍅 1 rajčina, 🥒 1/2 uhorky, 🧈 maslo, 🧂 soľ, 🌶️ korenie, 🌿 čerstvá pažítka.<br><br>

<strong>Postup:</strong><br>
1. Rozhodnite sa, ako pripravíte vajcia (miešané/volské oko/na tvrdo).<br>

2. Ak robíte miešané: rozšľahajte vajcia v miske so soľou a korením.<br>

3. Chlieb opražte v hriankovači alebo na panvici do zlatista.<br>

4. Na panvici rozohrejte kúsok masla.<br>

5. Pre miešané vajcia: nalejte zmes na panvicu a miešajte 3-4 minúty.<br>

6. Pre volské oko: rozbite vajcia priamo na panvicu a smažte podľa chuti.<br>

7. Pre vajcia natvrdo: varte 10 minút vo vriacej vode.<br>

8. Rajčinu a uhorku nakrájajte na plátky.<br>

9. Opražený chlieb natrite tenkopečinou (voliteľne).<br>

10. Na plátky chleba rozložte zeleninu.<br>

11. Pridajte hotové vajcia.<br>

12. Posypte nasekanou pažítkou.<br>

13. Ochutnajte soľou a čiernym korením.<br>

14. Servírujte teplé s čerstvým ovocím.`
 },
 { 
 name: "Morčacie mäso s ryžou", 
 kcal: 460, 
 img: "https://live.staticflickr.com/4061/4666209452_dd16b0c84f_b.jpg",
 recipe: `<strong>Ingrediencie:</strong> 🍗 400g morčacieho mäsa, 🍚 200g ryže, 🧅 1 cibuľa, 🫑 1 paprika, 🧄 2 strúčiky cesnaku, 🥣 400ml zeleninového vývaru, 🫒 2 PL oleja, 🧂 soľ, 🌶️ korenie, 🌶️ sladká paprika.<br><br>

<strong>Postup:</strong><br>
1. Ryžu dôkladne opláchnite studenou vodou.<br>

2. Morčacie mäso nakrájajte na kúsky.<br>

3. Cibuľu a papriku nakrájajte nadrobno.<br>

4. Cesnak prelisujte.<br>

5. Na veľkej panvici rozohrejte olej.<br>

6. Opekajte cibuľu 3-4 minúty do sklovitosti.<br>

7. Pridajte morčacie mäso a opekajte 5-6 minút.<br>

8. Vložte papriku a cesnak, opekajte 2 minúty.<br>

9. Pridajte ryžu a premiešajte, aby sa opiekla 1-2 minúty.<br>

10. Posypte sladkou paprikou, soľou a korením.<br>

11. Zalejte horúcim vývarom.<br>

12. Priveďte do varu, potom znížte na mierny oheň.<br>

13. Prikryte pokrievkou a varte 18-20 minút.<br>

14. Vypnite oheň a nechajte odpočinúť 5 minút pod pokrievkou.<br>

15. Pred servírovaním premiešajte vidličkou.`
 },
 { 
 name: "Tvaroh s ovocím", 
 kcal: 310, 
 img: "https://freerangestock.com/sample/173205/yogurt-bowl-with-fruits-and-granola.jpg",
 recipe: `<strong>Ingrediencie:</strong> 🧀 250g tvarohu, 🍯 2 PL medu, 🍓 100g jahôd, 🍌 1 banán, 🫐 hrst čučoriedok, 🥣 3 PL granoly, 🥥 2 PL kokosových vločiek, 🌿 čerstvá mäta.<br><br>

<strong>Postup:</strong><br>
1. Tvaroh vložte do misky a premiešajte vidličkou.<br>

2. Pridajte med a vyšľahajte do hladkej konzistencie.<br>

3. Ak je tvaroh príliš hustý, pridajte 1-2 PL mlieka alebo jogurtu.<br>

4. Jahody umyte a nakrájajte na štvrtky.<br>

5. Banán ošúpte a nakrájajte na kolieska.<br>

6. Čučoriedky opláchnite.<br>

7. Tvaroh rozdeľte do misiek.<br>

8. Na tvaroh rozložte jahody a banán.<br>

9. Pridajte čučoriedky.<br>

10. Posypte granolou pre chrumkavosť.<br>

11. Ozdobte kokosovými vločkami.<br>

12. Pridajte lístky čerstvej mäty.<br>

13. Podľa chuti prelejte extra medom.<br>

14. Servírujte ihneď alebo vychlaďte v chladničke.`
 },
 { 
 name: "Ovsená kaša s medom", 
 kcal: 370, 
 img: "https://cdn.stocksnap.io/img-thumbs/960w/oatmeal-honey_NBCKVD5IDL.jpg",
 recipe: `<strong>Ingrediencie:</strong> 🌾 80g ovsených vločiek, 🥛 300ml mlieka, 🍯 2 PL medu, 🍎 1 jablko, 🪨 1 čajová lyžička škorice, 🧂 štipka soli, 🥜 20g orechov.<br><br>

<strong>Postup:</strong><br>
1. V hrnci priveďte mlieko k varu.<br>

2. Pridajte štipku soli.<br>

3. Vsypte ovsené vločky a znížte teplotu.<br>

4. Varte 5-7 minút pri občasnom miešaní.<br>

5. Zatiaľ jablko olúpte a nakrájajte na kocky.<br>

6. Orechy posekajte nahrubo.<br>

7. Keď kaša zhustne, odstavte z ohňa.<br>

8. Vmíšajte polovicu medu a škoricu.<br>

9. Nalejte do misky.<br>

10. Na vrch rozložte kocky jablka.<br>

11. Posypte orehmamia.<br>

12. Prelejte zvyšným medom.<br>

13. Pridajte extra škoricou podľa chuti.<br>

14. Servírujte teplú.`
 },
 { 
 name: "Cestoviny s mäsom", 
 kcal: 520, 
 img: "https://live.staticflickr.com/4067/4335462959_1d6be040b3_b.jpg",
 recipe: `<strong>Ingrediencie:</strong> 🍝 250g cestovín (penne), 🥩 300g mletého mäsa, 🍅 400g rajčinovej omáčky, 🧅 1 cibuľa, 🧄 3 strúčiky cesnaku, 🫒 2 PL olivového oleja, 🌿 čerstvá bazalka, 🧀 50g parmezánu, 🧂 soľ, 🌶️ korenie, 🌿 oregano.<br><br>

<strong>Postup:</strong><br>
1. Veľký hrniec naplňte vodou, osolte a priveďte do varu.<br>

2. Pridajte cestoviny a varte podľa návodu (10-12 minút).<br>

3. Cibuľu a cesnak nakrájajte nadrobno.<br>

4. Na veľkej panvici rozohrejte olivový olej.<br>

5. Opekajte cibuľu 3-4 minúty.<br>

6. Pridajte mleté mäso a rozdrváte lyžicou.<br>

7. Opekajte 5-7 minút, kým mäso nezíska farbu.<br>

8. Pridajte cesnak, opekajte minútu.<br>

9. Zalejte rajčinovou omáčkou.<br>

10. Pridajte oregano, soľ a korenie.<br>

11. Nechajte povariť 10 minút na miernom ohni.<br>

12. Cestoviny precedte a vráťte do hrnca.<br>

13. Pridajte mäsovú omáčku a premiešajte.<br>

14. Nasekajte čerstvú bazalku a vmíšajte.<br>

15. Servírujte posypané nastrúhaným parmezánom.`
 },
 { 
 name: "Pečené kura so zemiakmi", 
 kcal: 500, 
 img: "https://live.staticflickr.com/6079/6029836707_e840ac3488_c.jpg",
 recipe: `<strong>Ingrediencie:</strong> 🍗 4 kuracie stehná, 🥔 600g zemiakov, 🫒 4 PL olivového oleja, 🧄 3 strúčiky cesnaku, 🌿 2 vetvičky rozmarínu, 🍋 1 citrón, 🧂 soľ, 🌶️ čierne korenie, 🌶️ sladká paprika.<br><br>

<strong>Postup:</strong><br>
1. Rúru predhrejte na 190°C.<br>

2. Zemiaky olúpte a nakrájajte na hrubšie kliny.<br>

3. Kuracie stehná osušte papierovou utierkou.<br>

4. Cesnak nakrájajte na plátky.<br>

5. Rozmarín oddeľte od vetvičiek.<br>

6. V miske zmiešajte olivový olej, soľ, korenie a sladkú papriku.<br>

7. Kuracie stehná a zemiaky vložte do veľkej misy.<br>

8. Pridajte cesnak, rozmarín a polovicu citróna nakrájanú na plátky.<br>

9. Polejte pripravenou zmesou oleja a korenia.<br>

10. Dôkladne premiešajte, aby sa všetko obalilo.<br>

11. Nechajte marinovať 15 minút.<br>

12. Rozložte na veľký plech, kura kožou nahor.<br>

13. Pečte 45-50 minút, kým kura nie je zlatisté a chrumkavé.<br>

14. Prelejte šťavou z druhej polovice citróna.<br>

15. Servírujte teplé, ozdobené čerstvým rozmarínom.`
 },
 { 
 name: "Rybí filé s ryžou", 
 kcal: 440, 
 img: "https://sanshreefoods.com/wp-content/uploads/2025/09/oven-baked-spiced-basa-on-harissa-risotto.jpg",
 recipe: `<strong>Ingrediencie:</strong> 🐟 2 rybí filéty (treska/pstruh), 🍚 200g ryže, 🫝 200g zelenej fazuľky, 🍋 šťava z 1 citróna, 🫒 2 PL olivového oleja, 🧄 2 strúčiky cesnaku, 🧂 soľ, 🌶️ korenie, 🌿 čerstvý dill.<br><br>

<strong>Postup:</strong><br>
1. Ryžu opláchnite a varte podľa návodu na obale (zvyčajne 18 minút).<br>

2. Rybí filé ochutnajte soľou a korením.<br>

3. Prelejte polovicou citrónovej šťavy.<br>

4. Nechajte marinovať 10 minút.<br>

5. Fazuľku očistite od končekov.<br>

6. Fazuľku uvarte v osolenej vode 5-6 minút.<br>

7. Precedte a vráťte do hrnca s kúskom masla.<br>

8. Na panvici rozohrejte olivový olej.<br>

9. Pridajte prelisovaný cesnak, opekajte 30 sekúnd.<br>

10. Položte rybí filé na panvicu (kožou dole, ak má kožu).<br>

11. Opekajte 4-5 minút z každej strany, kým nie je ryba prepečená.<br>

12. Ryba má byť biela a ľahko sa rozpadať vidličkou.<br>

13. Hotovú ryžu servírujte ako podklad.<br>

14. Pridajte fazuľku a rybí filé.<br>

15. Prelejte zvyšnou citrónovou šťavou a ozdobte dillom.`
 },
 { 
 name: "Tuniakové cestoviny", 
 kcal: 480, 
 img: "https://www.cookipedia.co.uk/wiki/images/5/59/Ensalada_de_macarrones_y_atun_recipe.jpg",
 recipe: `<strong>Ingrediencie:</strong> 🍝 250g cestovín (fusilli), 🐟 1 plechovka tuniaka (200g), 🍅 200g cherry paradajok, 🫒 50g čiernych olív, 🫒 2 PL kapary, 🫒 3 PL olivového oleja, 🧄 2 strúčiky cesnaku, 🌿 čerstvá bazalka, 🧂 soľ, 🌶️ korenie.<br><br>

<strong>Postup:</strong><br>
1. Veľký hrniec naplňte osolenou vodou a priveďte do varu.<br>

2. Varte cestoviny podľa návodu (10-12 minút).<br>

3. Cherry paradajky prekrojte na polovice.<br>

4. Olivy prekrojte, ak sú veľké.<br>

5. Cesnak nakrájajte nadrobno.<br>

6. Tuniaka precedte z oleja/vody.<br>

7. Na panvici rozohrejte olivový olej.<br>

8. Opekajte cesnak 30 sekúnd.<br>

9. Pridajte cherry paradajky a opekajte 3-4 minúty.<br>

10. Pridajte olivy a kapary, premiešajte.<br>

11. Pred scedením si odlejte 100ml vody z cestovín.<br>

12. Cestoviny precedte a pridajte na panvicu.<br>

13. Vmíšajte tuniaka a rozdeľte ho vidličkou.<br>

14. Ak je zmes príliš suchá, pridajte odloženú vodu.<br>

15. Ochutnajte soľou a korením.<br>

16. Nasekajte čerstvú bazalku a vmíšajte.<br>

17. Servírujte teplé alebo studené ako šalát.`
 },
 { 
 name: "Hovädzí guláš", 
 kcal: 530, 
 img: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Goulash_hungarian.jpg",
 recipe: `<strong>Ingrediencie:</strong> 🥩 600g hovädzieho mäsa, 🧅 2 cibuľe, 🧄 3 strúčiky cesnaku, 🫑 2 papriky, 🍅 400g paradajok (konzerv.), 🌶️ 2 PL sladkej papriky, 🌶️ 1 PL rasce, 🥣 500ml hovädzieho vývaru, 🫒 2 PL oleja, 🧂 soľ, 🌶️ korenie, 🍃 bobkový list.<br><br>

<strong>Postup:</strong><br>
1. Hovädzie mäso nakrájajte na kocky 3-4 cm.<br>

2. Mäso ochutnajte soľou a korením.<br>

3. Cibuľe nakrájajte nadrobno.<br>

4. Papriku nakrájajte na kocky.<br>

5. Cesnak prelisujte.<br>

6. Vo veľkom hrnci rozohrejte olej.<br>

7. Mäso opekajte porciovane do zlatista (po 5 minút každá porcia).<br>

8. Opečené mäso odložte nabok.<br>

9. Do hrnca pridajte cibuľu, opekajte 5 minút.<br>

10. Pridajte cesnak a papriku, opekajte 3 minúty.<br>

11. Vsypte sladkú papriku a rascu, premiešajte.<br>

12. Vráťte mäso do hrnca.<br>

13. Pridajte paradajky, vývar a bobkový list.<br>

14. Priveďte do varu, potom znížte na veľmi mierny oheň.<br>

15. Prikryte a duste 1,5-2 hodiny, kým mäso nezmäkne.<br>

16. Občas premiešajte a doplňte vodu, ak je potrebné.<br>

17. Na konci odstráňte bobkový list.<br>

18. Servírujte s knedľou, chlebom alebo cestovinami.`
 }
 ]
};

// --- Build meal list based on preferences ---
function buildMealList(userPreferences) {
 const hasPref = (key) => userPreferences.has(key);

 // Vegan + Low carb
 if (hasPref('vegan') || (hasPref('vegetarian') && hasPref('lowcarb'))) {
 return mealsDatabase.vegan_lowcarb;
 }

 // Vegetarian
 if (hasPref('vegetarian')) {
 return mealsDatabase.vegetarian;
 }

 // Low carb
 if (hasPref('lowcarb')) {
 return mealsDatabase.lowcarb;
 }

 // Standard
 return mealsDatabase.standard;
}

// --- Render meal cards ---
function renderMealCards(mealList) {
 const container = document.getElementById('mealCards');
 
 const cardsHTML = mealList.map((meal, index) => `
 <article class="card meal-card" data-meal-index="${index}">
 <img class="thumb" src="${meal.img}" alt="${meal.name}" loading="lazy" />
 <h4>${meal.name}</h4>
 <p class="meta">≈ ${meal.kcal} kcal</p>
 </article>
 `).join('');

 container.innerHTML = cardsHTML;
 
 // Store current meal list for modal access
 container.dataset.currentMealList = JSON.stringify(mealList);
 
 // Add click event listeners to meal cards
 attachMealCardListeners();
}

// --- Modal functionality ---
function showRecipeModal(meal) {
 // Create modal overlay
 const modal = document.createElement('div');
 modal.className = 'recipe-modal';
 modal.innerHTML = `
 <div class="modal-content">
 <button class="modal-close" aria-label="Zavrieť">&times;</button>
 <img class="modal-img" src="${meal.img}" alt="${meal.name}" />
 <h3>${meal.name}</h3>
 <p class="modal-kcal">≈ ${meal.kcal} kcal</p>
 <div class="modal-recipe">
 <h4>Recept:</h4>
 <p class="recipe-text"></p>
 </div>
 </div>
 `;
 
 document.body.appendChild(modal);
 
 // Animate modal in
 setTimeout(() => modal.classList.add('show'), 10);
 
 // Start typing animation
 const recipeText = modal.querySelector('.recipe-text');
 typeText(recipeText, meal.recipe);
 
 // Close modal on backdrop click
 modal.addEventListener('click', (e) => {
 if (e.target === modal) {
 closeModal(modal);
 }
 });
 
 // Close modal on close button click
 modal.querySelector('.modal-close').addEventListener('click', () => {
 closeModal(modal);
 });
 
 // Close modal on Escape key
 const escapeHandler = (e) => {
 if (e.key === 'Escape') {
 closeModal(modal);
 document.removeEventListener('keydown', escapeHandler);
 }
 };
 document.addEventListener('keydown', escapeHandler);
}

// --- Typing animation effect ---
function typeText(element, html) {
 // Create a temporary element to parse HTML
 const temp = document.createElement('div');
 temp.innerHTML = html;
 
 let currentIndex = 0;
 const speed = 5; // milliseconds per character
 
 function typeNextChar() {
 if (currentIndex < html.length) {
 element.innerHTML = html.substring(0, currentIndex + 1);
 currentIndex++;
 setTimeout(typeNextChar, speed);
 }
 }
 
 typeNextChar();
}

function closeModal(modal) {
 modal.classList.remove('show');
 setTimeout(() => modal.remove(), 300);
}

function attachMealCardListeners() {
 const container = document.getElementById('mealCards');
 const mealList = JSON.parse(container.dataset.currentMealList || '[]');
 
 container.querySelectorAll('.meal-card').forEach((card) => {
 card.style.cursor = 'pointer';
 card.addEventListener('click', () => {
 const mealIndex = parseInt(card.dataset.mealIndex);
 const meal = mealList[mealIndex];
 if (meal) {
 showRecipeModal(meal);
 }
 });
 });
}

// --- Form submission ---
const quizForm = document.getElementById('quizForm');

quizForm.addEventListener('submit', (event) => {
 event.preventDefault();

 // Get form values
 const age = parseFloat(document.getElementById('age').value);
 const sex = document.getElementById('sex').value;
 const activityLevel = document.getElementById('activity').value;

 // Calculate calorie needs
 const totalCalories = estimateBaseCalories(sex, age, activityLevel);

 // Macronutrient ratios based on goal
 let proteinRatio = 0.25;
 let carbsRatio = 0.45;
 let fatsRatio = 0.30;

 if (selectedGoal === 'lose') {
 proteinRatio = 0.30;
 carbsRatio = 0.40;
 fatsRatio = 0.30;
 } else if (selectedGoal === 'gain') {
 proteinRatio = 0.25;
 carbsRatio = 0.50;
 fatsRatio = 0.25;
 }

 // Calculate macros (1g protein = 4 kcal, 1g carbs = 4 kcal, 1g fat = 9 kcal)
 const proteinGrams = Math.round(totalCalories * proteinRatio / 4);
 const carbsGrams = Math.round(totalCalories * carbsRatio / 4);
 const fatsGrams = Math.round(totalCalories * fatsRatio / 9);

 // Display results
 document.getElementById('outKcal').textContent = `${totalCalories} kcal`;
 document.getElementById('outProtein').textContent = `${proteinGrams} g`;
 document.getElementById('outCarbs').textContent = `${carbsGrams} g`;
 document.getElementById('outFats').textContent = `${fatsGrams} g`;

 // Build and render meal suggestions
 const suggestedMeals = buildMealList(preferences);
 renderMealCards(suggestedMeals);

 // Show results section
 document.getElementById('result').classList.remove('hidden');
});



