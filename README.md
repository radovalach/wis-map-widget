<h1 align="center">Fancy Map Widget</h1>
<h6 align="center">(...that my wife made me do)</h5>

## Co som pouzil

- [Preact](https://preactjs.com/) - 3kB alternativa Reactu

- [Preact-Habitat](https://github.com/zouhir/preact-habitat) - 0.9kB modul na vkladanie Preact komponent/widgetov do CMS apod.

- [Preact-Transitioning](https://github.com/fakundo/preact-transitioning) - 4.5kB podpora pre CSS animacie

- [Preact Widget Template](https://github.com/rschristian/preact-widget) - boilerplate na ktorom som to postavil

## Build

- `yarn install` - stiahne dependencies

- `yarn start` - spusti development server na porte 3000

- `yarn build` - vytvori produkcny build do `dist/`

- `yarn serve` - spusti server na testovanie produkcneho buildu na porte 3000

(viac info viz odkazy vyssie)

Davam do repozitara aj hotovy build v zlozke `dist` pokial nepotrebujete nic menit...

## Pouzitie

Neviem robit WP pluginy, tak som sa aspon snazil spravit to co najviac painless na vlozenie do WP. Zaroven ale aby sa dal obsah jednoducho spravovat priamo v CMS bez nutnosti opatovneho buildovania javascriptu.

Postupoval by som asi takto:
- zbuildovany JS subor vlozit niekam do vasej custom WP temy
- zbuildovane CSS pridat k vasemu custom CSS, upravit cestu k (2) obrazkom (SVG mapa a pin) ktore tiez niekam tam vlozite
- tam kde potrebujete zobrazit mapu vlozit odkaz na script + predat mu obsah ako props (viz [dokumentacia preact-habitat](https://github.com/zouhir/preact-habitat) a ukazka pouzitia v `src/index.html`)

```html
<div data-widget-host="habitat"> <!-- sem script vlozi mapu -->
    <script type="text/props">
        {
            // podla tohto sa vygeneruju checkboxy s kategoriami. ID kategorie sa potom pouziva pri jednotlivych pobockach v krajinach
            "categories": [
                {
                    "id": "research",
                    "name": "R&D centers"
                },
                // ... other categories
            ],
            // zoznam krajin s pobockami
            "countries": [
                {
                    "name": "Mexiko",
                    "position": { // pozicia pobocky (pinu) na mape v pixeloch
                        "left": 111,
                        "top": 216
                    },
                    "locations": [
                        {
                            "name": "Mexico City",
                            "categories": ["service"]
                        },
                        {
                            "name": "Juarez",
                            "categories": ["service", "manufacturing"]
                        }
                    ]
                },
                // ... other countries
            ]
        }
    </script>
</div>
<script type="module" src="/widget-mount.js"></script>
```
