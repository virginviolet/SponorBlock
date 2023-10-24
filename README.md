'<p align="center">
  <a href="https://sponsor.ajay.app"><img src="public/icons/LogoSponsorBlocker256px.png" alt="Logo"></img></a>

  <br/>
  <sub>Logo by <a href="https://github.com/munadikieh">@munadikieh</a></sub>
</p>

<h1 align="center">SponorBlock</h1>

<p align="center">
  <b>Download:</b>
  <a href="https://chrome.google.com/webstore/detail/mnjggcdmjocbbbhaepdhchncahnbgone">Chrome/Chromium</a> |
  <a href="https://addons.mozilla.org/addon/sponsorblock/?src=external-github">Firefox</a> |
  <a href="https://github.com/virginviolet/SponorBlock/wiki/Android">Android</a> |
  <a href="https://github.com/virginviolet/SponorBlock/wiki/Edge">Edge</a> |
  <a href="https://github.com/virginviolet/SponorBlock/wiki/Safari">Safari for MacOS and iOS</a> |
  <a href="https://sponsor.ajay.app">Website</a> |
  <a href="https://sponsor.ajay.app/stats">Stats</a>
</p>

<p align="center">
  <b>3rd-Party Ports:</b>
  <a href="https://github.com/virginviolet/SponorBlock/wiki/3rd-Party-Ports#mpv-media-player">MPV</a> |
  <a href="https://github.com/virginviolet/SponorBlock/wiki/3rd-Party-Ports#kodi">Kodi</a> |
  <a href="https://github.com/virginviolet/SponorBlock/wiki/3rd-Party-Ports#Chromecast">Chromecast</a> |
  <a href="https://github.com/virginviolet/SponorBlock/wiki/3rd-Party-Ports#ios">iOS</a>
</p>

<p align="center">
    <a href="https://addons.mozilla.org/addon/sponsorblock/?src=external-github"><img src="https://img.shields.io/amo/users/sponsorblock?label=Firefox%20Users" alt="Badge"></img></a>
    <a href="https://chrome.google.com/webstore/detail/mnjggcdmjocbbbhaepdhchncahnbgone"><img src="https://img.shields.io/chrome-web-store/users/mnjggcdmjocbbbhaepdhchncahnbgone?label=Chrome%20Users" alt="Badge"></img></a>
    <a href="https://sponsor.ajay.app/stats"><img src="https://img.shields.io/badge/dynamic/json?label=Submissions&query=totalSubmissions&suffix=%20segments&url=http%3A%2F%2Fsponsor.ajay.app%2Fapi%2FgetTotalStats&color=darkred" alt="Badge"></img></a>
    <a href="https://sponsor.ajay.app/stats"><img src="https://img.shields.io/badge/dynamic/json?label=Active%20Users&query=apiUsers&url=http%3A%2F%2Fsponsor.ajay.app%2Fapi%2FgetTotalStats&color=darkblue" alt="Badge"></img></a>
    <a href="https://sponsor.ajay.app/stats"><img src="https://img.shields.io/badge/dynamic/json?label=Time%20Saved%20From%20Skips&query=daysSaved&url=http%3A%2F%2Fsponsor.ajay.app%2Fapi%2FgetDaysSavedFormatted&color=darkgreen&suffix=%20days" alt="Badge"></img></a>
</p>



SponorBlock is an open-source crowdsourced browser extension to skip sposor segments in YouTube videos. Users submit when a sponor happens from the extension, and the extension automatically skips sponors it knows about. It also supports skipping other categories, such as intros, outros and reminders to subscribe.

It also supports Invidious.

**Translate:** [![Crowdin](https://badges.crowdin.net/sponsorblock/localized.svg)](https://crowdin.com/project/sponsorblock)

# Important Links

See the [Wiki](https://github.com/virginviolet/SponorBlock/wiki) for important links.

# Server

The backend server code is available here: [https://github.com/ajayyy/SponorBlockServer](https://github.com/ajayyy/SponsorBlockServer)

To make sure that this project doesn't die, the database is publicly downloadable at [https://sponor.ajay.app/database](https://sponsor.ajay.app/database) ([License](https://github.com/virginviolet/SponorBlock/wiki/Database-and-API-License)). If you are planning on using the database in another project, please read the [API Docs](https://wiki.sponsor.ajay.app/index.php/API_Docs) page for more information.

~~The dataset and API are now being used in some [ports](https://github.com/virginviolet/SponorBlock/wiki/3rd-Party-Ports) as well as a [neural network](https://github.com/andrewzlee/NeuralBlock).~~

# API

You can read the API docs [here](https://wiki.sponsor.ajay.app/w/API_Docs).

# Building
See [CONTRIBUTING.md](CONTRIBUTING.md)

# Credit

The awesome [Invidious API](https://docs.invidious.io/) was previously used, and the server is now using [NewLeaf](https://git.sr.ht/~cadence/NewLeaf) as a to get video info from YouTube.

Originally forked from [YTSponsorSkip](https://github.com/NDevTK/YTSponsorSkip), but very little code remains.

Icons made by:
* <a href="https://www.flaticon.com/authors/gregor-cresnar" title="Gregor Cresnar">Gregor Cresnar</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> and are licensed by <a href="https://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
* <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> and are licensed by <a href="https://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
* <a href="https://iconmonstr.com/about/#creator">Alexander Kahlkopf</a> from <a href="https://iconmonstr.com/">iconmonstr.com</a> and are licensed by <a href="https://iconmonstr.com/license/">iconmonstr License</a>


### License

This project is licensed under GNU LGPL v3 or any later version
