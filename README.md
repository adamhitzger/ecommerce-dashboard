## Složky
-public - svg icony<br />
-app - hlavní složka neboli app router
    - složky v kulatých závorkách slouží k popisu, nemají vliv na stránkování
    - složky pojemnované jako admin, categories, sizes atd. jsou ve skutečnosti stránky - v každé je soubor page.tsx, dynamická stránka [id] s souborem page.tsx
    -layout.tsx - souhrnný layout
-components - componenty
            - forms - formuláře pro CRUD
            - products - header pro products substránky
            - shared - navbar a tlačítka
            - ui - pre-build komponenty z knihovny Shadcn 
-constanty a typy
.env.local - soubor pro api klíče
middleware.ts - nefunguje
-.json soubory - závislosti
