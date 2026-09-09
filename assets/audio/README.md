# Audio

The music `scripts/video-reel.mjs` lays under the share cut of the release
reel. It is committed so the reel rebuilds from a clean checkout with nothing
to download and no account anywhere: `yarn video-reel` is the whole thing.

## arabesque-no-1.mp3

- **Work** — Claude Debussy, *Deux Arabesques*, No. 1 in E major (1891).
  The composition is public domain; Debussy died in 1918.
- **Recording** — Galaxy Bösendorfer 290, 2013. A sampled piano, not a
  microphone in a room, which is why it is 128 kbps and even-tempered.
- **Source** — [IMSLP](https://imslp.org/wiki/2_Arabesques,_CD_74_(Debussy,_Claude)),
  file `IMSLP280756`.
- **Licence** — [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/).

CC BY asks for credit and nothing else: no ShareAlike, so the video it plays
under stays ours to licence as we like, and no NonCommercial. The credit is
drawn onto the end card of the share cut by `--credit`, which defaults to the
line naming all four of the above. A recording is a separate copyright from
the composition it performs, so "Debussy is public domain" is not on its own a
licence to use anyone's performance of him.

Replacing it means replacing the credit with it:

    yarn video-reel --audio path/to/track.flac --credit "Music: …"
