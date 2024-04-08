## Složky
-public - svg icony<br />
-app - hlavní složka neboli app router<br />
    - složky v kulatých závorkách slouží k popisu, nemají vliv na stránkování<br />
    - složky pojemnované jako admin, categories, sizes atd. jsou ve skutečnosti stránky - v každé je soubor page.tsx, dynamická stránka [id] s souborem page.tsx<br />
    -layout.tsx - souhrnný layout<br />
-components - componenty<br />
            - forms - formuláře pro CRUD<br />
            - products - header pro products substránky<br />
            - shared - navbar a tlačítka<br />
            - ui - pre-build komponenty z knihovny Shadcn <br />
-constanty a typy<br />
.env.local - soubor pro api klíče<br />
middleware.ts - nefunguje<br />
-.json soubory - závislosti<br />
