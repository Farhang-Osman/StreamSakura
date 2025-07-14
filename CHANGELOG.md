# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [0.0.8](https://github.com/Farhang-Osman/StreamSakura/compare/v0.0.7...v0.0.8) (2025-07-14)


### Features

* code the frontend of profile page when not logged in ([544741d](https://github.com/Farhang-Osman/StreamSakura/commit/544741db73768c8b61eb620bf3fccb4a822520c2))
* implement functions to handle authentication and get access token ([20d80f3](https://github.com/Farhang-Osman/StreamSakura/commit/20d80f301b96d883076eca9d24d2bc5c81397234))
* implement login function ([3ce617a](https://github.com/Farhang-Osman/StreamSakura/commit/3ce617a4b0573be4edf2092b8fd4af5d2d0eb6d8))
* **nav:** add onClick func to search icon ([e7e313e](https://github.com/Farhang-Osman/StreamSakura/commit/e7e313ea04d6196e4e50a2f5f77063291c912eac))
* **navigation:** add TopNavBar & SideNavBar ([e6fa62a](https://github.com/Farhang-Osman/StreamSakura/commit/e6fa62abcd1f71026fde77dd71900fdb5806804e))
* **navigation:** implement routing the query to search page on enter key ([750fc90](https://github.com/Farhang-Osman/StreamSakura/commit/750fc90175c6b1f7b06c5cd94c459b3b6335b07a))
* **profile:** add logout function and style the logout button ([823c99c](https://github.com/Farhang-Osman/StreamSakura/commit/823c99c69a9ef804f229ad3dd1092247f2809b3e))
* **profile:** implement logged in user data flow ([9203ab0](https://github.com/Farhang-Osman/StreamSakura/commit/9203ab0949b61dd672d44c927f012879ff1ac0d5))
* rewrite url with a correct url without refreshing the page ([f19bf86](https://github.com/Farhang-Osman/StreamSakura/commit/f19bf863e06ff4922e8cd3a7f7b8794f3e04d1a4))
* **search:** add front end of filters ([3df7ff9](https://github.com/Farhang-Osman/StreamSakura/commit/3df7ff90a6c7c714133e0a682d5cfb132312bdc8))
* **search:** add frontend of genres ([506ff06](https://github.com/Farhang-Osman/StreamSakura/commit/506ff0601239d067db8c3b3a34eeacf532ff94d9))
* **search:** add function to update state of filters ([e4f9c68](https://github.com/Farhang-Osman/StreamSakura/commit/e4f9c68442baa3ca85b77d75b0e226a1123e7c15))
* **search:** add loading state to when loading ([519fe45](https://github.com/Farhang-Osman/StreamSakura/commit/519fe4560fa0bf0bc9944c215cf3bd62a8fafa5f))
* **search:** duplicate & adjust CardItem component to display search results ([d62f353](https://github.com/Farhang-Osman/StreamSakura/commit/d62f35316c01272b8a357b3809a08d0300743589))
* **search:** fully implement the backend logic ([1ea5335](https://github.com/Farhang-Osman/StreamSakura/commit/1ea533583f7b7e9cd86e5ffc69fd5bbe4c768ad0))
* **search:** implement searching functionalities from url ([397ba91](https://github.com/Farhang-Osman/StreamSakura/commit/397ba91ee0b0b85e988cde1585ab4f6f356035fe))
* **search:** implement the backend logic of genres, update filter interface ([dd494cf](https://github.com/Farhang-Osman/StreamSakura/commit/dd494cf5c2f983eedaee407f7aab8b4f16dae04b))
* **search:** test and implement apply function to genres ([21e7377](https://github.com/Farhang-Osman/StreamSakura/commit/21e7377bcc3ad1f8bf4ad57eaf7b9adf554c5b36))
* **search:** update state of start & end date based on selected value ([59fc820](https://github.com/Farhang-Osman/StreamSakura/commit/59fc820e302deb7d3ea5f88f1d53eeca5096c52c))
* **watch:** add image, title etc... info about the current anime ([d89a327](https://github.com/Farhang-Osman/StreamSakura/commit/d89a3272e30603f31e51a070cb0a47ab16a30a45))
* **watch:** add loading UI to watch container ([c810c61](https://github.com/Farhang-Osman/StreamSakura/commit/c810c61e9b415c63f3e8cac7c81dd7435d610919))
* **watch:** add many things and update the tvInfo interface ([3e4394b](https://github.com/Farhang-Osman/StreamSakura/commit/3e4394b4503016ab71bc5f224921f00b756e41cb))
* **watch:** add onClick attr to sub and dub buttons ([a8a7318](https://github.com/Farhang-Osman/StreamSakura/commit/a8a7318fa3c1afa290392d0688d2669bf22f5266))
* **watch:** add onClick to handle episode selection ([834366a](https://github.com/Farhang-Osman/StreamSakura/commit/834366a16eedd1bd8cdaa94b2471347009cef699))
* **watch:** add RELATED & RECOMMENDED sidebars ([61459ba](https://github.com/Farhang-Osman/StreamSakura/commit/61459ba079f0b9345251d8daee651b635a998d52))
* **watch:** add seasons section ([08d4f39](https://github.com/Farhang-Osman/StreamSakura/commit/08d4f393ab81f7ee5697742f99330d11163a05eb))
* **watch:** add streaming capability and few more features ([b2d29ef](https://github.com/Farhang-Osman/StreamSakura/commit/b2d29effdb54b3160416023ffcbdc5bf843abe1a))
* **watch:** add UI to when No episodes found ([b2877f0](https://github.com/Farhang-Osman/StreamSakura/commit/b2877f0a1aad87ab09139a18651ccb09deeee41e))
* **watch:** fetch animeInfo & add the interface for animeInfo data ([8cbb9d1](https://github.com/Farhang-Osman/StreamSakura/commit/8cbb9d19ef49865aa303b6d7aa2b62e0e47ddf11))
* **watch:** make description to expand or not to based on user's click ([b9150b5](https://github.com/Farhang-Osman/StreamSakura/commit/b9150b5cd0f71ab1cff0ba82d884957e3b247dd0))
* **watch:** make some adjustments & score, rating, anime status etc... ([edba495](https://github.com/Farhang-Osman/StreamSakura/commit/edba495fa950c002b5baea3931d9684dffbe9275))
* **watch:** on click the element of selected episode moves into center ([4845873](https://github.com/Farhang-Osman/StreamSakura/commit/4845873d42b5546f9787f7bf654bd4db184206ef))


### Bug Fixes

* 404 NOT_FOUND, now other pages can be found not just home page ([89cd57c](https://github.com/Farhang-Osman/StreamSakura/commit/89cd57cba95d453d4a3d0bde4663d54517bf3bd4))
* **api:** fix server error 500 on /api/exchange-token endpoint ([194341a](https://github.com/Farhang-Osman/StreamSakura/commit/194341a809ed125daf2e3d3f4af4a79548ea0009))
* **build:** fix an error that only when you run build not dev occurs ([ed8b0d2](https://github.com/Farhang-Osman/StreamSakura/commit/ed8b0d26278b2f30d68c626e1a45e2aab78f965f))
* **search:** after selecting and deselecting same genre wrong format would return ([145d39c](https://github.com/Farhang-Osman/StreamSakura/commit/145d39cd22b8850b8558628d753a2ff34d481020))
* Type 'string' is not assignable to type 'MouseEventHandler<HTMLDivElement>' ([2425c1f](https://github.com/Farhang-Osman/StreamSakura/commit/2425c1f7fa432a4e39439f44562ff9c540cb4ce0))
* **watch:** add target='_blank' to open on a new tab ([4ffaa65](https://github.com/Farhang-Osman/StreamSakura/commit/4ffaa65ae58b8889355892420ebb9a276aee782e))
* **watch:** fix non mathcing episode numbers being set in selectedEpisode ([dd0dd36](https://github.com/Farhang-Osman/StreamSakura/commit/dd0dd36937cc60178e19d9d5d4282d18dc45635b))

## [0.0.7](https://github.com/Farhang-Osman/StreamSakura/compare/v0.0.4...v0.0.7) (2025-05-12)


### Features

* add custom breakpoints ([8df7d2e](https://github.com/Farhang-Osman/StreamSakura/commit/8df7d2e46c0181c28ef18ef37d65bef3c2b601fc))
* add Episode interface ([23fed90](https://github.com/Farhang-Osman/StreamSakura/commit/23fed90e60c771735cae53b36b1435b767fe6939))
* add HomeSideBar component and fetch relevant data ([9441308](https://github.com/Farhang-Osman/StreamSakura/commit/944130808cd3d5c65915b38714c63f5e4ec4f4e0))
* add more styling to HomeCarousel ([65b526f](https://github.com/Farhang-Osman/StreamSakura/commit/65b526f1322631960bb791d413d258fd8901be31))
* add more styling to HomeCarousel ([c439797](https://github.com/Farhang-Osman/StreamSakura/commit/c4397979f7796d48ced9464e662820989be39e77))
* add necessary html to HomeCarousel compnonent ([b36e1be](https://github.com/Farhang-Osman/StreamSakura/commit/b36e1be58899aaf6ac4e9a4873dbc9b6ee4015b5))
* add styling to tabs ([9903345](https://github.com/Farhang-Osman/StreamSakura/commit/9903345c6287d3d9901d1b5543b469dc1787c956))
* add working Cards ([1449ee8](https://github.com/Farhang-Osman/StreamSakura/commit/1449ee86066d39eb6df02530a94aa6e5388b2aef))
* **cards:** add details to cards and hover effects to cards title ([cd4e385](https://github.com/Farhang-Osman/StreamSakura/commit/cd4e385fe18e740fd62fd82f6ce7d9d08957f6cf))
* **cards:** remove some icons and totalEpisodes, add conditional rendering to icons ([4f9d99e](https://github.com/Farhang-Osman/StreamSakura/commit/4f9d99ea8a2818663783ba7b4e41cc36eca4b407))
* **home:** add a sidebar to feature upcoming, fetch data to upcoming HomeSideBar ([5a1d1f9](https://github.com/Farhang-Osman/StreamSakura/commit/5a1d1f9cd9d95ee3caa19115c2ff532f6e68018c))
* **home:** add two new gradient to HomeCarousel and update its theme ([3080267](https://github.com/Farhang-Osman/StreamSakura/commit/3080267e20c10cfda4a8cd3ad1e083ce8882c0c8))
* **home:** implement full responsive behavior for all components ([070dd2d](https://github.com/Farhang-Osman/StreamSakura/commit/070dd2dc377c4a05a79b9ada8529320ed67cd5db))
* **HomeSideBar:** add title and icon parameter ([e16ce93](https://github.com/Farhang-Osman/StreamSakura/commit/e16ce93af511e40ecf3fbb9d9f6a39edb66ec2de))
* **sidebar:** add image as background cover in case cover value doesn't exist ([c7169ce](https://github.com/Farhang-Osman/StreamSakura/commit/c7169cea699771f62de1c8df8156b9885affd813))
* **sidebar:** adjust the height of sidebar to fit and not exceed ([1534697](https://github.com/Farhang-Osman/StreamSakura/commit/153469784e962fb7c8cd79d57a662f1764203e8d))
* **sideBar:** design the layout and improve some visual look ([45737c5](https://github.com/Farhang-Osman/StreamSakura/commit/45737c5a07ab132f6c60f3bdd051d779d10d5004))
* **theme:** refresh design, change some spacing ([8d15003](https://github.com/Farhang-Osman/StreamSakura/commit/8d150038362650afa8d848acfe67003b9e28cb91))


### Bug Fixes

* just adding register() made everything work ([ea3a80c](https://github.com/Farhang-Osman/StreamSakura/commit/ea3a80c795b0a25d713a9c2a757e56b259327653))
* popular and topRated tabs not showing anything ([e694520](https://github.com/Farhang-Osman/StreamSakura/commit/e69452026e3c1bdf100a7bac631cffafdbbce5b0))
* **UI:** fix carousal from being too wide and add grab cursor ([05ee389](https://github.com/Farhang-Osman/StreamSakura/commit/05ee389632a062f8de6c8e63343b7906075c5c6b))

## 0.0.6 (2025-03-20)

## 0.0.5 (2025-03-20)

## [0.0.4](https://github.com/Farhang-Osman/StreamSakura/compare/v0.0.3...v0.0.4) (2025-03-20)

## [0.0.3](https://github.com/Farhang-Osman/StreamSakura/compare/v0.0.2...v0.0.3) (2025-03-20)

## [0.0.1](https://github.com/Farhang-Osman/StreamSakura/compare/v0.0.2...v0.0.1) (2025-03-20)

## [0.0.2](https://github.com/Farhang-Osman/StreamSakura/compare/v0.0.1...v0.0.2) (2025-03-20)

## 0.0.1 (2025-03-01)
